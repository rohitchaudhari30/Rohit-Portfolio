import type { HighlightItem } from "@/types/content";

// Section 10 — keep this concise; do not duplicate the full skills section.
export const highlights: HighlightItem[] = [
  {
    icon: "Database",
    title: "Data Engineering",
    description: "Building ETL pipelines and warehousing solutions that keep data reliable and queryable.",
  },
  {
    icon: "BrainCircuit",
    title: "AI Solutions",
    description: "Integrating LLM APIs and applied ML into products that solve a specific, real problem.",
  },
  {
    icon: "Server",
    title: "Backend Systems",
    description: "Designing services and data models that stay maintainable as scope grows.",
  },
  {
    icon: "Plug",
    title: "API Development",
    description: "REST APIs with clear contracts, sensible error handling, and real documentation.",
  },
  {
    icon: "BarChart3",
    title: "BI & Analytics",
    description: "Power BI dashboards with DAX measures that business teams use directly, instead of filing one-off report requests.",
  },
  {
    icon: "Table",
    title: "Database Design",
    description: "Schemas and query patterns designed for the access patterns the application actually needs.",
  },
];
