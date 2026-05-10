"use client";

import React from "react";
import { cn } from "@/lib/utils";
import type { GuideCategory, GuideItem } from "@/app/(portal)/guide/page";

type Props = {
  categories: GuideCategory[];
  activePath: string | null;
  onSelect: (item: GuideItem) => void;
};

export function GuideCategoryNav({ categories, activePath, onSelect }: Props) {
  const [open, setOpen] = React.useState(true);

  if (categories.length === 0) {
    return (
      <div className="w-[200px] shrink-0 border-r border-border p-4">
        <div className="text-sm text-muted-foreground/50">No guides available</div>
      </div>
    );
  }

  return (
    <div className="w-[200px] shrink-0 border-r border-border overflow-y-auto">
      {/* Section header */}
      <div className="px-2 py-[3px] text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60 flex items-center justify-between">
        <span>Guides</span>
        <button
          onClick={() => setOpen((v) => !v)}
          className="hover:text-foreground transition-colors"
        >
          <span
            className="material-symbols-outlined text-[14px] transition-transform duration-150"
            style={{
              transform: open ? "rotate(0deg)" : "rotate(-90deg)",
              fontVariationSettings: "'FILL' 0, 'wght' 500, 'GRAD' 0, 'opsz' 14",
            }}
          >
            expand_more
          </span>
        </button>
      </div>

      {/* Categories */}
      <div
        className="overflow-hidden transition-all duration-200 ease-out"
        style={{ maxHeight: open ? "9999px" : "0px", opacity: open ? 1 : 0 }}
      >
        <div className="mt-[2px] space-y-[1px] pb-4">
          {categories.map((cat) => (
            <div key={cat.id}>
              {/* Category label */}
              <div className="px-3 py-[3px] text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/50 mt-2">
                {cat.label}
              </div>
              {/* Items */}
              {cat.items.map((item) => (
                <button
                  key={`${item.path}-${item.mcp_tool ?? ""}`}
                  onClick={() => onSelect(item)}
                  className={cn(
                    "w-full flex items-center gap-2 rounded-md px-2 py-[5px] text-[13px] transition-colors duration-100 text-left",
                    activePath === item.path
                      ? "bg-primary/[0.08] font-semibold text-foreground"
                      : "text-muted-foreground hover:bg-primary/[0.05] hover:text-foreground"
                  )}
                >
                  <span
                    className="material-symbols-outlined text-[14px] shrink-0"
                    style={{
                      fontVariationSettings: "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 14",
                    }}
                  >
                    article
                  </span>
                  <span className="truncate">{item.title}</span>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
