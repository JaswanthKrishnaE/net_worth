import { Pressable, StyleSheet, View, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";
import { AppCard, AppText } from "@/components/common";
import { useTheme } from "@/hooks/use-theme";
import { SubClass } from "@/store/subclass.store"; // Ensure this matches your store type

type Props = {
  subClass: SubClass;
  onEdit: () => void;
  onDelete: () => void;
};

export default function SubClassCard({ subClass, onEdit, onDelete }: Props) {
  const colors = useTheme();

  const renderRightActions = (progress: Animated.AnimatedInterpolation<number>, dragX: Animated.AnimatedInterpolation<number>) => (
    <View style={styles.rightActionsContainer}>
      <Pressable onPress={onEdit} style={[styles.actionButton, { backgroundColor: colors.backgroundSelected }]}>
        <Ionicons name="create" size={20} color={colors.text} />
      </Pressable>
      <Pressable onPress={onDelete} style={[styles.actionButton, { backgroundColor: colors.danger }]}>
        <Ionicons name="trash" size={20} color="#fff" />
      </Pressable>
    </View>
  );

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <AppCard style={styles.card}>
        <View style={styles.row}>
          <AppText style={styles.name}>{subClass.name}</AppText>
        </View>
      </AppCard>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: 8 },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 4 },
  name: { flex: 1 },
  rightActionsContainer: { flexDirection: "row", marginBottom: 8 },
  actionButton: { justifyContent: "center", alignItems: "center", width: 60, height: '100%', borderRadius: 12, marginLeft: 8 },
});