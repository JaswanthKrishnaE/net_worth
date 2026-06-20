import { useThemeStore } from "@/store/theme-store";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { db } from "@/db/index"; // <-- adjust to wherever you export `db`
import migrations from "../../drizzle/migrations"; // <-- adjust relative path to drizzle/migrations.js

export default function RootLayout() {
  const loadTheme = useThemeStore((state) => state.loadTheme);
  const { success, error } = useMigrations(db, migrations);

  useEffect(() => {
    loadTheme();
  }, []);

  useEffect(() => {
    if (error) {
      console.error("Migration error:", error);
    }
    if (success) {
      console.log("Migrations applied successfully");
    }
  }, [success, error]);

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
        <Text style={{ color: "red", textAlign: "center" }}>
          Migration error: {error.message}
        </Text>
      </View>
    );
  }

  if (!success) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Migrating database...</Text>
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="settings/ProfilesScreen"
        options={{
          title: "Profiles",
        }}
      />
    </Stack>
  );
}