import { View, Pressable, StyleSheet, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { AppText } from "@/components/common";
import { useTheme } from "@/hooks/use-theme";
import { useProfileStore } from "@/store/profile.store"; // Fixed import

export function SelectedProfileCard() {
  const router = useRouter();
  const colors = useTheme();
  
  // 1. Select both the loading state and the profile getter from the store
  const isLoading = useProfileStore((state) => state.isLoading);
  const getSelectedProfile = useProfileStore((state) => state.getSelectedProfile);
  const profile = getSelectedProfile();

  // 2. Loading State: Return a skeleton or subtle loading indicator
  if (isLoading) {
    return (
      <View style={[styles.card, { backgroundColor: colors.backgroundSelected, justifyContent: 'center' }]}>
        <ActivityIndicator color={colors.textSecondary} />
      </View>
    );
  }

  // 3. Empty State
  if (!profile) return null;

  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);

  return (
    <View style={[styles.card, { backgroundColor: colors.backgroundSelected }]}>
      <View style={styles.leftContainer}>
        <View style={[styles.avatar, { backgroundColor: colors.info }]}>
          <AppText style={styles.avatarText}>{initials}</AppText>
        </View>

        <View>
          <AppText secondary style={styles.label}>Selected Profile</AppText>
          <AppText style={styles.name}>{profile.name}</AppText>
        </View>
      </View>

      <Pressable 
        style={[styles.button, { backgroundColor: colors.background }]} 
        onPress={() => router.push("/settings/ProfilesScreen")}
      >
        <AppText style={styles.buttonText}>Change</AppText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 16,
    marginVertical: 8,
    minHeight: 80, // Added minHeight so the card doesn't collapse during loading
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  label: {
    fontSize: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 12,
    fontWeight: "600",
  },
});