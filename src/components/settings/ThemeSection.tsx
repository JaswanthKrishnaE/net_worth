import { StyleSheet, Switch, View } from "react-native";

import { AppCard, AppText } from "@/components/common";
import { useThemeStore } from "@/store/theme-store";

export default function ThemeSection() {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  const handleToggle = async () => {
    await toggleTheme();
  };

  return (
    <AppCard style={styles.card}>
      <View>
        <AppText>Dark Theme</AppText>

        <AppText secondary>
          Enable dark mode
        </AppText>
      </View>

      <Switch
        value={theme === "dark"}
        onValueChange={handleToggle}
      />
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});