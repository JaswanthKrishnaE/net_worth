import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";

import { AppCard, AppText } from "@/components/common";
import { useTheme } from "@/hooks/use-theme";
import { useProfileStore } from "@/store/profile.store";

export default function ProfileSection() {
  const colors = useTheme();
  const router = useRouter();

  const selectedProfile = useProfileStore(
    (state) =>
      state.profiles.find(
        (p) => p.isDefault === 1
      )
  );

  const handlePress = () => {
    router.push("/settings/ProfilesScreen");
  };

  return (
    <Pressable onPress={handlePress}>
      <AppCard style={styles.card}>
        <View>
          <AppText secondary>
            Active Profile
          </AppText>

          <AppText style={styles.name}>
            {selectedProfile?.name ??
              "No Profile Selected"}
          </AppText>
        </View>

        <Ionicons
          name="chevron-forward"
          size={20}
          color={colors.text}
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