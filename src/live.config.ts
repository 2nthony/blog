import { defineLiveCollection } from "astro:content";
import { postsLoader } from "./loaders/posts-loader";

const posts = defineLiveCollection({
  // @ts-ignore
  loader: postsLoader(),
});

export const collections = {
  posts,
};
