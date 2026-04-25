import { Client } from "@notionhq/client";
import { get } from "lodash-es";
import { retriever } from "./retriever";
import { NotionToMarkdown } from "./notion-to-md";
import { parseMentionPageToInSitePage } from "./parse-mention-page-to-inside-page";
// import { env } from "cloudflare:workers";

export interface PostListItem {
  id: string;
  attributes: {
    title: string;
    date?: string;
    description?: string;
    slug: string;
  };
}

const notion = new Client({
  auth: import.meta.env.NOTION_TOKEN,
  notionVersion: import.meta.env.NOTION_VERSION,
});
const n2m = new NotionToMarkdown({ notionClient: notion });

async function getDataBase() {
  const dbResponse = await notion.databases.retrieve({
    database_id: import.meta.env.NOTION_DATABASE_ID,
  });
  const data_source_id = get(dbResponse, "data_sources[0].id") || "";

  if (!data_source_id) {
    return [];
  }

  const response = await notion.dataSources.query({
    data_source_id,
    filter: {
      and: [
        {
          property: "published",
          checkbox: {
            equals: true,
          },
        },
        {
          property: "title",
          title: {
            is_not_empty: true,
          },
        },
        {
          property: "slug",
          rich_text: {
            is_not_empty: true,
          },
        },
      ],
    },
    sorts: [
      {
        property: "date",
        direction: "descending",
      },
    ],
  });

  return response?.results;
}

export async function getPostList(): Promise<PostListItem[]> {
  const data = await getDataBase();
  const posts = data.map((p) => {
    const id = p.id;
    const properties = (p as any).properties;
    const title = retriever(properties.title);
    const date = retriever(properties.date);
    const slug = retriever(properties.slug);
    /* optional */
    const description = retriever(properties.description) || null;

    return {
      id,
      attributes: {
        title,
        date,
        description,
        slug,
      },
    };
  });

  return posts;
}

export async function getPost(slug: string) {
  const posts = await getPostList();
  const post = posts.find((p) => p.attributes.slug === slug);

  if (!post) {
    throw new Error(`no post found: ${slug}`);
  }

  const id = post.id;

  const blocks = await n2m.pageToMarkdown(id);
  const parsedBlocks = blocks.map((block) => {
    block = parseMentionPageToInSitePage({ posts, block });
    return block;
  });
  // Note: Starting from v2.7.0, `toMarkdownString` no longer automatically saves child pages. Now it provides an object containing the markdown content of child pages.
  // not sure why `parent`
  const markdown = n2m.toMarkdownString(parsedBlocks).parent || "";

  return {
    id,
    markdown,
    attributes: post.attributes,
  };
}
