import { create } from "zustand";

interface ThemeState {
  dark: boolean;
  toggle: () => void;
  load: () => void;
}

export const useTheme = create<ThemeState>((set) => ({
  dark: true,
  toggle: () =>
    set((state) => {
      const next = !state.dark;
      localStorage.setItem("hqk_theme", next ? "dark" : "light");
      document.documentElement.classList.toggle("dark", next);
      document.documentElement.classList.toggle("light", !next);
      return { dark: next };
    }),
  load: () => {
    const saved = localStorage.getItem("hqk_theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = saved ? saved === "dark" : prefersDark;
    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.classList.toggle("light", !isDark);
    set({ dark: isDark });
  },
}));
