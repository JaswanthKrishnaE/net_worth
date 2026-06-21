import { useThemeStore } from "@/store/theme-store";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { db } from "@/db/index"; // <-- adjust to wherever you export `db`
import migrations from "../../drizzle/migrations"; // <-- adjust relative path to drizzle/migrations.js
import { useProfileStore } from "@/store/profile.store";
import ForceCreateProfile from "@/components/profile/ForceCreateProfile"; // New component
import { GestureHandlerRootView } from 'react-native-gesture-handler';


export default function RootLayout() {
  const loadTheme = useThemeStore((state) => state.loadTheme);
  const { success, error } = useMigrations(db, migrations);
  const { profiles,isLoading} = useProfileStore(); // Use your store
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
if (!isLoading && profiles.length === 0) {
    return <ForceCreateProfile />;
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>

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
        <Stack.Screen
          name="settings/AssetsScreen"
          options={{
            title: "Assets",
          }}
        />
        <Stack.Screen name="settings/BrokersScreen" options={{ title: "Brokers" }} />
        <Stack.Screen name="settings/EntitiesScreen" options={{ title: "Entities" }} />
        <Stack.Screen name="settings/TransactionStatusScreen" options={{ title: "Transaction Status" }} />
        <Stack.Screen name="settings/SubClassScreen" options={{ title: "Sub-Classes" }} />
      </Stack>
    </GestureHandlerRootView>

  );
}