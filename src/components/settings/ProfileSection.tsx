import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { AppCard, AppText } from "@/components/common";
import { useTheme } from "@/hooks/use-theme";

export default function ProfileSection() {
  const colors = useTheme();
  const router = useRouter();

  const handlePress = () => {
    router.push("/settings/ProfilesScreen");
  };

  return (
    <Pressable onPress={handlePress}>
      <AppCard style={styles.card}>
        <View style={styles.leftContainer}>
          {/* Circular Icon container for consistency */}
          <View style={[styles.iconContainer, { backgroundColor: colors.backgroundSelected }]}>
            <Ionicons name="people-outline" size={20} color={colors.text} />
          </View>

          <AppText style={styles.title}>Manage Profiles</AppText>
        </View>

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
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20, 
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
});