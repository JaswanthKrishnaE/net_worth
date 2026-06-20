import { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { AppCard, AppText } from "@/components/common";
import { useTheme } from "@/hooks/use-theme";
import { useProfileStore } from "@/store/profile.store";

export default function ProfileSection() {
  const colors = useTheme();
  const router = useRouter();

  // Pull profiles, loading state, and the load function from the store
  const { profiles, isLoading, loadProfiles } = useProfileStore();

  // Automatically fetch profiles when this section appears on the screen
  useEffect(() => {
    loadProfiles();
  }, []);

  const selectedProfile = profiles.find((p) => p.isDefault === 1);

  const handlePress = () => {
    router.push("/settings/ProfilesScreen");
  };

  return (
    <Pressable onPress={handlePress}>
      <AppCard style={styles.card}>
        <View style={styles.leftContainer}>
          {/* Circular Icon container for a premium feel */}
          <View style={[styles.iconContainer, { backgroundColor: colors.backgroundSelected }]}>
            <Ionicons name="person-outline" size={20} color={colors.text} />
          </View>

          <View>
            <AppText secondary style={{ fontSize: 12 }}>
              Active Profile
            </AppText>
            <AppText style={styles.name}>
              {isLoading
                ? "Loading..."
                : (selectedProfile?.name ?? "No Profile Selected")}
            </AppText>
          </View>
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
    borderRadius: 20, // Perfectly circular
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
  },
});