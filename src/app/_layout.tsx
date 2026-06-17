import { useThemeStore } from "@/store/theme-store";
import { Stack } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  const loadTheme = useThemeStore((state) => state.loadTheme);

  useEffect(() => {
    loadTheme();
  }, []);

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="profile"
        options={{
          title: "Profiles",
        }}
      />
    </Stack>
  );
}
