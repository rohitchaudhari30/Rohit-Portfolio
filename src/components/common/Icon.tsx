import { icons, type LucideProps } from "lucide-react";

interface IconProps extends LucideProps {
  name: string;
}

// Renders a lucide-react icon by its string name (used since icon choice lives in data files).
export default function Icon({ name, ...props }: IconProps) {
  const LucideIcon = icons[name as keyof typeof icons];
  if (!LucideIcon) return null;
  return <LucideIcon {...props} />;
}
