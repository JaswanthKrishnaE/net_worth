// components/transactions/TransactionCard.tsx
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppCard, AppText } from "@/components/common";
import { useTheme } from "@/hooks/use-theme";

export function TransactionCard({ transaction }: { transaction: any }) {
  const colors = useTheme();
  const isExpense = transaction.amount < 0;

  return (
    <AppCard style={styles.card}>
      <View style={styles.left}>
        <View style={[styles.iconContainer, { backgroundColor: colors.backgroundSelected }]}>
          <Ionicons name="wallet-outline" size={20} color={colors.text} />
        </View>
        <View>
          <AppText style={{ fontWeight: '600' }}>{transaction.title}</AppText>
          <AppText secondary style={{ fontSize: 12 }}>{transaction.subtitle}</AppText>
        </View>
      </View>
      
      <AppText style={{ color: isExpense ? colors.danger : colors.success, fontWeight: '700' }}>
        {isExpense ? "" : "+"}{transaction.amount.toLocaleString()}
      </AppText>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8, padding: 12 },
  left: { flexDirection: "row", alignItems: "center", gap: 12 },
  iconContainer: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }
});