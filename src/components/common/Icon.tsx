import type { ComponentType } from "react";
import { icons, type LucideProps, Layers, Code } from "lucide-react";

interface IconProps extends LucideProps {
  name: string;
}

const iconAliases: Record<string, string> = {
  Code2: "Code",
  BrainCircuit: "Brain",
  MessageSquareCode: "MessageSquare",
  ScanEye: "Eye",
  ScanText: "FileText",
  GitCommitHorizontal: "GitCommitVertical",
  FlaskConical: "FlaskConical",
};

// Renders a lucide-react icon by its string name (used since icon choice lives in data files).
export default function Icon({ name, ...props }: IconProps) {
  const resolvedName = iconAliases[name] || name;
  const LucideIcon =
    (icons as Record<string, ComponentType<LucideProps>>)[resolvedName] || Code || Layers;
  return <LucideIcon {...props} />;
}
