import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet } from "react-native";
import { AppCard, AppText } from "@/components/common";
import { useTheme } from "@/hooks/use-theme";

export default function SubClassSection() {
  const colors = useTheme();
  const router = useRouter();

  return (
    <Pressable onPress={() => router.push("/settings/SubClassScreen")}>
      <AppCard style={styles.card}>
        <AppText style={styles.name}>Sub-Classes</AppText>
        <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
      </AppCard>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  name: { fontSize: 18, fontWeight: "700" },
});