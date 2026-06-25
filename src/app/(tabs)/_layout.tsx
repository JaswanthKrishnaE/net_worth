import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { StyleSheet, useColorScheme } from "react-native";
import { useTheme } from "@/hooks/use-theme"; // Your new hook
import { Radius, Shadows, Spacing } from "@/constants/theme";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
export default function TabLayout() {
const colors = useTheme();
  const deviceScheme = useColorScheme();
  const insets = useSafeAreaInsets(); // 1. Get dynamic safe area insets

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          // 2. Use insets.bottom to dynamically push the bar up
          // We add Spacing.two (8px) so it doesn't touch the bottom edge
          bottom: insets.bottom + Spacing.two, 
          marginHorizontal: Spacing.two,
          height: 68,
          borderRadius: 40,
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          elevation: 0,
          shadowColor: 'transparent',
        },
        tabBarBackground: () => (
          <BlurView
            tint={deviceScheme === 'dark' ? 'dark' : 'light'}
            intensity={80}
            style={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              borderRadius: 40, // Match the tabBarStyle borderRadius
            }}
          />
        ),
        tabBarActiveTintColor: colors.info,
        tabBarInactiveTintColor: colors.textSecondary,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="home"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="assets"
        options={{
          title: "Assets",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="wallet"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="liabilities"
        options={{
          title: "Liabilities",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="card-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: "Transactions",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="receipt-outline" // Or "list-outline" for a list view
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="settings"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}