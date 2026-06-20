import { Pressable, StyleSheet, View, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";

import { AppCard, AppText } from "@/components/common";
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

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>
  ) => {
    return (
      <View style={styles.rightActionsContainer}>
        <Pressable onPress={onEdit} style={[styles.actionButton, { backgroundColor: colors.backgroundSelected }]}>
          <Ionicons name="create" size={20} color={colors.text} />
        </Pressable>
        <Pressable onPress={onDelete} style={[styles.actionButton, { backgroundColor: colors.danger }]}>
          <Ionicons name="trash" size={20} color="#fff" />
        </Pressable>
      </View>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <AppCard style={styles.card}>
        {/* Added justifyContent: space-between to row style */}
        <Pressable onPress={onSelect} style={styles.row}>
          <AppText style={styles.name}>{profile.name}</AppText>
          
          {selected && (
            <View style={[styles.activeChip, { backgroundColor: colors.success }]}>
              <AppText style={styles.activeText}>Active</AppText>
            </View>
          )}
        </Pressable>
      </AppCard>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 8,
    padding: 0, // Padding handled by row
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between", // Pushes name left, chip right
    alignItems: "center",
    padding: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  activeChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16, // Pill shape
  },
  activeText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "700",
  },
  rightActionsContainer: {
    flexDirection: "row",
    marginBottom: 8,
  },
  actionButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: '100%',
    borderRadius: 12,
    marginLeft: 8,
  }
});