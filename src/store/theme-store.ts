import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

type Theme = "light" | "dark";

interface ThemeStore {
  theme: Theme | null;
  setTheme: (theme: Theme) => Promise<void>;
  loadTheme: () => Promise<void>;
  toggleTheme: () => Promise<void>;
}

export const useThemeStore = create<ThemeStore>((set, get) => ({
  theme: null,

  setTheme: async (theme: Theme) => {
    try {
      await AsyncStorage.setItem("theme", theme);
      set({ theme });
    } catch (error) {
      console.error("Error saving theme:", error);
    }
  },

  loadTheme: async () => {
    try {
      const saved = await AsyncStorage.getItem("theme");
      if (saved) {
        set({ theme: saved as Theme });
      }
    } catch (error) {
      console.error("Error loading theme:", error);
    }
  },

  toggleTheme: async () => {
    const current = get().theme;
    const next = current === "dark" ? "light" : "dark";
    await get().setTheme(next);
  },
}));
