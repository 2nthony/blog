import { getPost } from "@/app/lib/data";
import { blogkit } from "@/blogkit";
import { format } from "date-fns";
import Link from "next/link";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { attributes } = await getPost({
    params: { slug: ["posts", slug] },
  });

  return {
    title: `${attributes.title} - ${blogkit.config.siteConfig.title}`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { html, attributes } = await getPost({
    params: { slug: ["posts", slug] },
  });

  return (
    <main>
      <div className="text-lg my-8 font-semibold">
        <Link href="/" className="no-underline">
          {blogkit.config.siteConfig.title}
        </Link>
      </div>

      <h1 className="text-4xl font-extrabold mb-4">{attributes.title}</h1>

      <div>
        <time className="text-foreground/70">
          {format(attributes.date, "yyyy-MM-dd")}
        </time>
      </div>

      <article
        className="post-body"
        dangerouslySetInnerHTML={{ __html: html || "" }}
      />
    </main>
  );
}
