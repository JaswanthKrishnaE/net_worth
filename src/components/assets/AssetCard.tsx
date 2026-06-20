import { Pressable, StyleSheet, View, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";

import { AppCard, AppText } from "@/components/common";
import { useTheme } from "@/hooks/use-theme";
import { Assets } from "@/store/assets.store";

type Props = {
  asset: Assets;
  onEdit: () => void;
  onDelete: () => void;
};

export default function AssetCard({
  asset,
  onEdit,
  onDelete,
}: Props) {
  const colors = useTheme();

  // Renders the hidden buttons when swiping
  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>
  ) => {
    return (
      <View style={styles.rightActionsContainer}>
        {/* Edit Button */}
        <Pressable onPress={onEdit} style={[styles.actionButton, { backgroundColor: colors.backgroundSelected }]}>
          <Ionicons name="create" size={20} color={colors.text} />
        </Pressable>
        
        {/* Delete Button */}
        <Pressable onPress={onDelete} style={[styles.actionButton, { backgroundColor: colors.danger }]}>
          <Ionicons name="trash" size={20} color="#fff" />
        </Pressable>
      </View>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <AppCard style={styles.card}>
        <View style={styles.row}>
          <AppText style={styles.name}>{asset.name}</AppText>
          
          {/* We keep the icons small or hidden if you prefer, 
              but swipe usually makes them redundant. 
              The swipe actions handle the interaction now. */}
        </View>
      </AppCard>
    </Swipeable>
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
    paddingVertical: 4, // Adjust padding if needed for your AppCard
  },
  name: {
    flex: 1,
  },
  rightActionsContainer: {
    flexDirection: "row",
    marginBottom: 8, // This must match the card's marginBottom
  },
  actionButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 60, // Compact size
    height: '100%',
    borderRadius: 12,
    marginLeft: 8,
  },
});