import { blogkit } from "@/blogkit";
import { parseMarkdown } from "blogkit";
import { Feed } from "feed";

export async function GET() {
  if (blogkit.getFeeds) {
    const { title, author, url } = blogkit.config.siteConfig
    const feeds = await blogkit.getFeeds()

    const feed = new Feed({
      title,
      copyright: title,
      id: title,
      author: {
        name: author,
      },
    })

    if (url) {
      feeds.forEach((item) => {
        feed.addItem({
          title: item.title,
          link: `${url}/${item.slug}`,
          // @ts-expect-error ignore
          content: parseMarkdown(item.markdown?.parent || ''),
          date: item.date,
          description: item.description,
        })
      })
    }

    return new Response(feed.atom1(), {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': `s-maxage=1 stale-while-revalidate=${10 * 60}`
      },
    })
  }
}
