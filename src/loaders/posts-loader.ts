import type { LiveLoader } from "astro/loaders";
import { getPost, getPostList, type PostListItem } from "../lib/notion";
import { parseMarkdown } from "../lib/marked";

interface EntryFilter {
  id: string;
}

export function postsLoader(): LiveLoader<PostListItem, EntryFilter> {
  return {
    name: "posts-loader",
    loadCollection: async () => {
      try {
        const posts = await getPostList();

        return {
          entries: posts.map((post) => {
            return {
              id: post.attributes.slug,
              data: post,
              cacheHint: {
                tags: ["posts", post.attributes.slug],
              },
            };
          }),
        };
      } catch (error) {
        return {
          error: new Error("failed to load posts", { cause: error }),
        };
      }
    },
    loadEntry: async ({ filter }) => {
      try {
        const post = await getPost(filter.id);

        return {
          id: post.attributes.slug,
          data: post,
          rendered: {
            html: parseMarkdown(post.markdown),
          },
          cacheHint: {
            lastModified: new Date(post.updatedAt),
          },
        };
      } catch (error) {
        return {
          error: new Error("failed to load post", { cause: error }),
        };
      }
    },
  };
}
