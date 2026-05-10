"use client";

import React from "react";
import { api } from "@/lib/api";
import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";
import { GuideCategoryNav } from "@/components/guide/guide-category-nav";
import { GuideDocViewer } from "@/components/guide/guide-doc-viewer";
import { GuideToc } from "@/components/guide/guide-toc";

/* ─── Types ─── */

export type GuideItem = {
  path: string;
  title: string;
  mcp_tool: string | null;
};

export type GuideCategory = {
  id: string;
  label: string;
  items: GuideItem[];
};

type CategoryResponse = {
  categories: GuideCategory[];
};

/* ─── Helpers ─── */

function flattenItems(cats: GuideCategory[]): GuideItem[] {
  const result: GuideItem[] = [];
  for (const cat of cats) {
    for (const item of cat.items) {
      result.push(item);
    }
  }
  return result;
}

/* ─── Page ─── */

export default function GuidePage() {
  const [categories, setCategories] = React.useState<GuideCategory[]>([]);
  const [activePath, setActivePath] = React.useState<string | null>(null);
  const [markdown, setMarkdown] = React.useState<string>("");
  const [docTitle, setDocTitle] = React.useState<string>("");
  const [loading, setLoading] = React.useState(false);
  const [notFound, setNotFound] = React.useState(false);
  const [tocItems, setTocItems] = React.useState<{ id: string; text: string; level: number }[]>([]);

  // Load categories
  React.useEffect(() => {
    api<CategoryResponse>("/api/guide/categories")
      .then((data) => {
        setCategories(data.categories ?? []);
        // Auto-select first doc
        const first = flattenItems(data.categories ?? [])[0];
        if (first) selectDoc(first);
      })
      .catch(() => setCategories([]));
  }, []);

  async function selectDoc(item: GuideItem) {
    setActivePath(item.path);
    setLoading(true);
    setNotFound(false);
    setMarkdown("");
    setDocTitle(item.title);
    setTocItems([]);

    try {
      const url = `/api/guide/doc/${encodeURIComponent(item.path)}${
        item.mcp_tool ? `?mcp_tool=${item.mcp_tool}` : ""
      }`;
      const md: string = await api(url);
      setMarkdown(md);
      setTocItems(extractToc(md));
    } catch {
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  }

  function extractToc(md: string): { id: string; text: string; level: number }[] {
    const items: { id: string; text: string; level: number }[] = [];
    for (const line of md.split("\n")) {
      const h2 = line.match(/^## (.+)/);
      const h3 = line.match(/^### (.+)/);
      if (h2) {
        const text = h2[1].trim();
        items.push({ id: slugify(text), text, level: 2 });
      } else if (h3) {
        const text = h3[1].trim();
        items.push({ id: slugify(text), text, level: 3 });
      }
    }
    return items;
  }

  function slugify(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  }

  return (
    <>
      <PageHeader
        title="Help Center"
        description="User guides and documentation for your organization."
      />

      <div className="flex-1 flex gap-0 -mx-6 md:-mx-8 lg:-mx-10 -mb-6 md:-mb-8 lg:-mb-10 min-h-0 border-t border-border overflow-hidden">
        {/* Left: Category Nav */}
        <GuideCategoryNav
          categories={categories}
          activePath={activePath}
          onSelect={selectDoc}
        />

        {/* Center: Doc Viewer */}
        <div className="flex-1 overflow-y-auto min-w-0">
          <GuideDocViewer
            markdown={markdown}
            title={docTitle}
            loading={loading}
            notFound={notFound}
          />
        </div>

        {/* Right: TOC */}
        {tocItems.length > 0 && (
          <div className="hidden lg:block h-full">
            <GuideToc items={tocItems} />
          </div>
        )}
      </div>
    </>
  );
}