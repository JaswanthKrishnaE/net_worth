import { Pressable, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";
import { AppCard, AppText } from "@/components/common";
import { useTheme } from "@/hooks/use-theme";
import { TransactionStatus } from "@/store/transaction-status.store";

type Props = {
  status: TransactionStatus;
  onEdit: () => void;
  onDelete: () => void;
};

export function TransactionStatusCard({ status, onEdit, onDelete }: Props) {
  const colors  = useTheme();

  const renderRightActions = () => (
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
        <AppText>{status.name}</AppText>
      </AppCard>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: 8, padding: 16 },
  rightActionsContainer: { flexDirection: "row", marginBottom: 8 },
  actionButton: { justifyContent: "center", paddingHorizontal: 20, borderRadius: 12, marginLeft: 8 },
});