import { useState, useEffect } from "react";

const THEME_KEY = "we-cooked-theme";

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem(THEME_KEY) || "lilac";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "lilac" ? "charcoal" : "lilac"));

  return { theme, toggle };
}
