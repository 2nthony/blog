import { Blogkit as _Blogkit, parseMarkdown } from "blogkit";
import { request } from "blogkit-notion";

// @ts-ignore
class Blogkit extends _Blogkit {
  get getPostList() {
    return request.getPostList
  }
  get getPost() {
    return request.getPost
  }
  get getFeeds() {
    return request.getFeeds
  }
  getPostPageStaticProps = async (ctx: any) => {
    const { markdown, attributes } = await this.getPost(
      ctx.params.slug.join('/'),
    )
    // @ts-ignore
    const parsed = parseMarkdown(markdown?.parent || '')

    return {
      props: {
        post: {
          html: parsed,
          attributes,
        },
        siteConfig: this.config.siteConfig,
        themeConfig: this.config.themeConfig ?? {},
      },
      revalidate: 60,
    }
  }
}

export const blogkit = new Blogkit({
  siteConfig: {
    title: '2nthony',
    author: "2nthony",
    url: "https://2nthony.com",
  },
  theme: {
    Home: {},
    Post: {},
  },
  request
})
