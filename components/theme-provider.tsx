"use client";

import * as React from "react";

type Theme = "light" | "dark" | undefined;

interface ThemeProviderProps {
  children: React.ReactNode;
  attribute?: string;
  defaultTheme?: Theme;
  enableSystem?: boolean;
}

const ThemeContext = React.createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
}>({
  theme: "light",
  setTheme: () => {},
});

export function ThemeProvider({
  children,
  attribute = "class",
  defaultTheme = "light",
  enableSystem = true,
}: ThemeProviderProps) {
  const [theme, setTheme] = React.useState<Theme>(defaultTheme);

  React.useEffect(() => {
    if (enableSystem && typeof window !== "undefined") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      setTheme(systemTheme);
    }
  }, [enableSystem]);

  React.useEffect(() => {
    if (typeof document !== "undefined") {
      if (attribute === "class") {
        document.documentElement.classList.remove("light", "dark");
        if (theme) document.documentElement.classList.add(theme);
      } else if (attribute === "data-theme") {
        document.documentElement.setAttribute("data-theme", theme || "");
      }
    }
  }, [theme, attribute]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return React.useContext(ThemeContext);
}
