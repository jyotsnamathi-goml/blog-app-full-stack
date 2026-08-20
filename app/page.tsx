import fs from "fs";
import path from "path";
import Link from "next/link";
import { BlogPost } from "@/types/blog";

function getPosts(): BlogPost[] {
  const filePath = path.join(process.cwd(), "data", "posts.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  return JSON.parse(fileContents);
}

export default function Home() {
  const posts = getPosts();

  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
          Welcome to DevBlog
        </h1>
        <p className="text-xl text-zinc-500 dark:text-zinc-400">
          Articles on modern web development, programming, and Next.js.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        {posts.map((post) => (
          <article
            key={post.id}
            className="flex flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-1 flex-col justify-between p-6">
              <div className="flex-1">
                <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500">
                  {post.date} &bull; By {post.author}
                </p>
                <Link href={`/posts/${post.slug}`} className="mt-2 block">
                  <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {post.title}
                  </h2>
                </Link>
                <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
                  {post.excerpt}
                </p>
              </div>
              <div className="mt-6">
                <Link
                  href={`/posts/${post.slug}`}
                  className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Read More &rarr;
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
