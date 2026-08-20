import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevBlog - Web Development Insights",
  description: "A clean and professional web development blog built with Next.js.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 font-sans">
        <Nav />
        <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-12">
          {children}
        </main>
        <footer className="border-t border-zinc-100 bg-white py-6 text-center text-sm text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
          <div className="max-w-5xl mx-auto px-6">
            &copy; {new Date().getFullYear()} DevBlog. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}

