import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import {
  AppCard,
  AppText,
} from "@/components/common";

import { useTheme } from "@/hooks/use-theme";
import { Profile } from "@/store/profile.store";

type Props = {
  profile: Profile;
  selected: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

export default function ProfileCard({
  profile,
  selected,
  onSelect,
  onEdit,
  onDelete,
}: Props) {
  const colors = useTheme();

  return (
    <AppCard style={styles.card}>
      <View style={styles.row}>
        <Pressable
          onPress={onSelect}
          style={styles.profileLabel}
        >
          <AppText>
            {selected ? "✓ " : ""}
            {profile.name}
          </AppText>
        </Pressable>

        <View style={styles.actions}>
          <Pressable
            onPress={onEdit}
            style={styles.iconButton}
          >
            <Ionicons
              name="create-outline"
              size={18}
              color={colors.text}
            />
          </Pressable>

          <Pressable
            onPress={onDelete}
            style={styles.iconButton}
          >
            <Ionicons
              name="trash-outline"
              size={18}
              color={colors.danger}
            />
          </Pressable>
        </View>
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 8,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  profileLabel: {
    flex: 1,
  },

  actions: {
    flexDirection: "row",
    gap: 10,
  },

  iconButton: {
    padding: 8,
  },
});