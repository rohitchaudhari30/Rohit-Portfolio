import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export interface ThemeDefinition {
  id: string;
  label: string;
  swatch: string; // representative hex for the toggle UI only
  kind: "dark" | "light";
}

// Add a new theme by adding an entry here + a matching [data-theme="id"] block in src/styles/themes.css
export const themes: ThemeDefinition[] = [
  { id: "amber", label: "Ink & Amber", swatch: "#D4A24E", kind: "dark" },
  { id: "porcelain", label: "Porcelain", swatch: "#A36F22", kind: "light" },
];

const STORAGE_KEY = "portfolio-theme";
const DEFAULT_THEME = "amber";

interface ThemeContextValue {
  themeId: string;
  setThemeId: (id: string) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeId] = useState<string>(() => {
    if (typeof window === "undefined") return DEFAULT_THEME;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && themes.some((t) => t.id === stored)) return stored;
    return DEFAULT_THEME;
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themeId);
    window.localStorage.setItem(STORAGE_KEY, themeId);
  }, [themeId]);

  function toggleTheme() {
    setThemeId((current) => {
      const currentIndex = themes.findIndex((t) => t.id === current);
      const next = themes[(currentIndex + 1) % themes.length];
      return next.id;
    });
  }

  return (
    <ThemeContext.Provider value={{ themeId, setThemeId, toggleTheme }}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
