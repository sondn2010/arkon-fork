import { WikiPageType } from "@/types/wiki";

const TYPE_CONFIG: Record<
  WikiPageType,
  { icon: string; label: string; color: string; bg: string }
> = {
  entity: { icon: "person", label: "Entity", color: "#00adef", bg: "rgba(0,173,239,0.1)" },
  concept: { icon: "lightbulb", label: "Concept", color: "#525c6c", bg: "rgba(82,92,108,0.1)" },
  topic: { icon: "topic", label: "Topic", color: "#059669", bg: "rgba(5,150,105,0.1)" },
  source: { icon: "description", label: "Source", color: "#7c3aed", bg: "rgba(124,58,237,0.1)" },
  index: { icon: "list_alt", label: "Index", color: "#525c6c", bg: "rgba(82,92,108,0.1)" },
  log: { icon: "history", label: "Log", color: "#525c6c", bg: "rgba(82,92,108,0.1)" },
};

export function WikiTypeBadge({ type }: { type: string }) {
  const cfg = TYPE_CONFIG[type as WikiPageType] ?? TYPE_CONFIG.concept;
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
      style={{ color: cfg.color, backgroundColor: cfg.bg, border: `1px solid ${cfg.color}40` }}
    >
      <span className="material-symbols-outlined" style={{ fontSize: 12 }}>
        {cfg.icon}
      </span>
      {cfg.label}
    </span>
  );
}

export function wikiTypeIcon(type: string): string {
  return TYPE_CONFIG[type as WikiPageType]?.icon ?? "article";
}

export function wikiTypeColor(type: string): string {
  return TYPE_CONFIG[type as WikiPageType]?.color ?? "#78706a";
}

export function wikiTypeGroupLabel(type: string): string {
  const labels: Record<string, string> = {
    entity: "Entities",
    concept: "Concepts",
    topic: "Topics",
    source: "Sources",
    index: "Index",
    log: "Log",
  };
  return labels[type] ?? type;
}
