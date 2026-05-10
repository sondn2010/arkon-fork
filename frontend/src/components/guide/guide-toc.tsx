"use client";

import React from "react";
import { cn } from "@/lib/utils";

type TocItem = {
  id: string;
  text: string;
  level: number;
};

type Props = {
  items: TocItem[];
};

export function GuideToc({ items }: Props) {
  const [activeId, setActiveId] = React.useState<string>("");
  const observerRef = React.useRef<IntersectionObserver | null>(null);

  React.useEffect(() => {
    if (items.length === 0) return;

    // Disconnect previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Track visible headings
    const headingEls = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the topmost visible heading
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-80px 0px -70% 0px",
        threshold: 0,
      }
    );

    headingEls.forEach((el) => observerRef.current!.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [items]);

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <div className="w-[200px] shrink-0 border-l border-border overflow-y-auto sticky top-0 h-full p-4">
      <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60 mb-3">
        On this page
      </div>
      <nav className="space-y-[1px]">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className={cn(
              "block w-full text-left text-[12px] py-[3px] px-2 rounded transition-colors duration-100 truncate",
              item.level === 3 && "pl-5",
              activeId === item.id
                ? "text-foreground font-medium"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {item.text}
          </button>
        ))}
      </nav>
    </div>
  );
}