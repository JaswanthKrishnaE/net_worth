/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from "@/constants/theme";
import { useColorScheme as useDeviceColorScheme } from "@/hooks/use-color-scheme";
import { useThemeStore } from "@/store/theme-store";

export function useTheme() {
  const theme = useThemeStore((state) => state.theme);
  const deviceScheme = useDeviceColorScheme();

  // Use stored theme if available, otherwise fall back to device scheme
  const currentTheme =
    theme === "light"
      ? "light"
      : theme === "dark"
        ? "dark"
        : deviceScheme === "dark"
          ? "dark"
          : "light";

  return Colors[currentTheme];
}
