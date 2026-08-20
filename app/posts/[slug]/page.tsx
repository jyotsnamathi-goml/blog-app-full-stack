import fs from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogPost } from "@/types/blog";

export const dynamic = "force-dynamic";

function getPostBySlug(slug: string): BlogPost | undefined {
  const filePath = path.join(process.cwd(), "data", "posts.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  const posts: BlogPost[] = JSON.parse(fileContents);
  return posts.find((p) => p.slug === slug);
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-2xl mx-auto space-y-8 py-8">
      <div>
        <Link
          href="/"
          className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1 mb-6"
        >
          &larr; Back to Home
        </Link>
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          {post.title}
        </h1>
        <p className="text-sm text-zinc-400 dark:text-zinc-500 mt-2">
          {post.date} &bull; Written by {post.author}
        </p>
      </div>

      <div className="prose prose-zinc dark:prose-invert max-w-none text-zinc-700 dark:text-zinc-300 leading-relaxed space-y-4">
        {post.content.split("\n").map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
