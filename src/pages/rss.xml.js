import rss from "@astrojs/rss";
import { getPost, getPostList } from "../lib/notion";
import { parseMarkdown } from "../lib/marked";
import { siteConfig } from "../../site.config.mjs";

export async function GET(context) {
  const posts = await getPostList();
  const getPosts = posts.map((p) => getPost(p.attributes.slug));
  const results = await Promise.allSettled(getPosts);

  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: context.site,
    items: results.map((result) => {
      const post = result.value;

      return {
        title: post.attributes.title,
        description: post.attributes.description || "",
        pubDate: post.attributes.date,
        link: post.attributes.slug,
        content: parseMarkdown(post.markdown),
      };
    }),
  });
}
