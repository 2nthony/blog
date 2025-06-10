import { getPost } from "@/app/lib/data";
import { blogkit } from "@/blogkit";
import { format } from "date-fns";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const { attributes } = await getPost({
    params: { slug: ["posts", params.slug] },
  });

  return {
    title: `${attributes.title} - ${blogkit.config.siteConfig.title}`,
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { html, attributes } = await getPost({
    params: { slug: ["posts", params.slug] },
  });

  return (
    <main>
      <div className="text-lg my-8 font-semibold">
        <a href="/" className="no-underline">
          {blogkit.config.siteConfig.title}
        </a>
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
