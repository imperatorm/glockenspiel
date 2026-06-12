"use client";

import { useEffect, useState } from "react";

export function ThemeSwitch() {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("glocken-theme", next);
    } catch {
      // private mode etc. — theme still applies for this visit
    }
    setTheme(next);
  };

  return (
    <button
      className="v2-theme-switch"
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Helles Farbschema aktivieren" : "Dunkles Farbschema aktivieren"}
      aria-pressed={theme === "dark"}
    >
      <span className="v2-theme-switch__dot" aria-hidden="true" />
      <span aria-hidden="true">{theme === "dark" ? "Dark" : "Light"}</span>
    </button>
  );
}
