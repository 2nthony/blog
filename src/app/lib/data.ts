import { blogkit } from "@/blogkit";
import { cache } from "react";

export const getPosts = cache(async () => {
  const { props } = await blogkit.getHomePageStaticProps();
  const { posts } = props;

  return posts
})

export const getPost = cache(async (ctx: any) => {
  const { props } = await blogkit.getPostPageStaticProps(ctx)
  const { post: { html, attributes } } = props

  return {
    html,
    attributes
  }
})
