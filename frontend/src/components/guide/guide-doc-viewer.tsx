"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { EmptyState } from "@/components/shared/empty-state";

type Props = {
  markdown: string;
  title: string;
  loading: boolean;
  notFound: boolean;
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function GuideDocViewer({ markdown, title, loading, notFound }: Props) {
  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-8 py-8">
        <div className="h-4 w-24 rounded bg-muted animate-pulse mb-6" />
        <div className="space-y-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-4 rounded bg-muted animate-pulse"
              style={{ width: `${90 - i * 5}%`, opacity: 1 - i * 0.06 }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="px-8 py-12">
        <EmptyState
          icon="find_in_page"
          title="Document not found"
          description="This guide document could not be loaded."
        />
      </div>
    );
  }

  if (!markdown) {
    return (
      <div className="px-8 py-12">
        <EmptyState
          icon="menu_book"
          title="Select a guide"
          description="Choose a guide from the list on the left."
        />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6">
        <span className="material-symbols-outlined text-[16px]">menu_book</span>
        <span className="material-symbols-outlined text-muted-foreground/50" style={{ fontSize: 14 }}>
          chevron_right
        </span>
        <span className="font-medium text-foreground truncate max-w-[200px]">{title}</span>
      </nav>

      {/* Markdown content with prose styling */}
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            h2: ({ children }) => {
              const text = String(children);
              return <h2 id={slugify(text)} className="scroll-mt-20">{children}</h2>;
            },
            h3: ({ children }) => {
              const text = String(children);
              return <h3 id={slugify(text)} className="scroll-mt-20">{children}</h3>;
            },
          }}
        >
          {markdown}
        </ReactMarkdown>
      </div>
    </div>
  );
}