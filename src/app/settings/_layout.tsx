import { Stack } from "expo-router";

export default function SettingsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="ProfilesScreen"
        options={{
          title: "Profiles",
        }}
      />

      <Stack.Screen
        name="AssetsScreen"
        options={{
          title: "Assets",
        }}
      />

      <Stack.Screen
        name="BrokersScreen"
        options={{
          title: "Brokers",
        }}
      />

      <Stack.Screen
        name="EntitiesScreen"
        options={{
          title: "Entities",
        }}
      />

      <Stack.Screen
        name="TransactionStatusScreen"
        options={{
          title: "Transaction Status",
        }}
      />

      <Stack.Screen
        name="SubClassScreen"
        options={{
          title: "Sub-Classes",
        }}
      />
    </Stack>
  );
}