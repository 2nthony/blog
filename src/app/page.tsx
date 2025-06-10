import { Post } from "blogkit";
import { format } from "date-fns";
import { getPosts } from "./lib/data";
import { blogkit } from "@/blogkit";
import Link from "next/link";

export const revalidate = 60;

const links = [
  // {
  //   name: "Resume",
  //   url: "https://2nthony.notion.site/1bc46522121b4975b07f019107358460",
  // },
  {
    name: "GitHub",
    url: "https://github.com/2nthony",
  },
  {
    name: "Twitter",
    url: "https://twitter.com/_2nthony",
  },
  {
    name: "RSS",
    url: "/api/rss",
  },
];

export default async function Home() {
  const posts = await getPosts();

  return (
    <main>
      <h1 className="text-4xl font-extrabold">
        {blogkit.config.siteConfig.title}
      </h1>

      <ul className="flex gap-x-2 list-none p-0">
        {links.map((link) => (
          <li key={link.url} className="p-0">
            <Link href={link.url} target="_blank">
              {link.name}
            </Link>
          </li>
        ))}
      </ul>

      <div>
        <p>我是一名普通的程序员，擅长 web 前端开发，现生活在广州。</p>
        <p>
          我的目标是真正的成为一名自由职业者，拥有一些小产品，并进入
          FIRE(Financial Independence Retire Early) 人生。
        </p>
      </div>

      <hr />

      <div>
        <ul className="pl-0">
          {posts.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </ul>
      </div>
    </main>
  );
}

function PostItem({ post }: { post: Post }) {
  return (
    <li className="post-item my-6 list-none pl-0">
      <h3 className="text-2xl font-bold mb-2">
        <Link
          href={`/${post.attributes.slug}`}
          className="hover:underline no-underline cursor-pointer"
        >
          {post.attributes.title}
        </Link>
      </h3>

      {post.attributes.description && (
        <p className="text-foreground/70 mb-2">{post.attributes.description}</p>
      )}
      <time className="text-foreground/70 text-sm">
        {format(post.attributes.date, "yyyy-MM-dd")}
      </time>
    </li>
  );
}
