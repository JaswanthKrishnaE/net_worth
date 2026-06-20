import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet } from "react-native";

import { AppCard, AppText } from "@/components/common";
import { useTheme } from "@/hooks/use-theme";

export default function AssetsSection() {
  const colors = useTheme();
  const router = useRouter();

  const handlePress = () => router.push("/settings/AssetsScreen");

  return (
    <Pressable onPress={handlePress}>
      <AppCard style={styles.card}>
        <AppText style={styles.name}>Assets</AppText>

        <Ionicons
          name="chevron-forward"
          size={20}
          color={colors.textSecondary}
        />
      </AppCard>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
  },
});