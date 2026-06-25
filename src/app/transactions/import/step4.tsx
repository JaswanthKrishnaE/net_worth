import { useState, useMemo } from "react";
import { View, Pressable, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { AppText, Screen, AppSpacer } from "@/components/common";
import { useImportStore } from "@/store/import.store";
import { useTheme } from "@/hooks/use-theme";
import { Spacing, Radius } from "@/constants/theme";
import { db } from "@/db";
import { instruments } from "@/db/schema/instruments.schema";
import { transactions } from "@/db/schema/transactions.shema";
import { useProfileStore } from "@/store/profile.store";

export default function Step4() {
  const colors = useTheme();
  const router = useRouter();
  const [isImporting, setIsImporting] = useState(false);
  const { parsedData, instrumentMappings, broker, reset } = useImportStore();
  const { getSelectedProfile } = useProfileStore();

  const handleConfirmImport = async () => {
    setIsImporting(true);
    try {
      await db.transaction(async (tx) => {
        // 1. Resolve/Create Instruments
        const instrumentMap = new Map<string, number>();
        
        // Fetch existing
        const existing = await tx.select().from(instruments);
        existing.forEach(i => instrumentMap.set(i.symbol!, i.id));

        // Create new ones from mappings
        for (const [symbol, mapping] of Object.entries(instrumentMappings)) {
          const [res] = await tx.insert(instruments).values({
            name: mapping.name,
            symbol: symbol,
            assetId: mapping.assetId,
            entityId: mapping.entityId,
            subClassId: mapping.subClassId,
          }).returning({ id: instruments.id });
          instrumentMap.set(symbol, res.id);
        }

        // 2. Prepare Transactions
        const transactionPayload = parsedData.map(row => ({
          profileId: getSelectedProfile!.id,
          brokerId: broker!.id,
          instrumentId: instrumentMap.get(row.instrumentSymbol!)!,
          statusId: parseInt(row.tradeType === 'BUY' ? '1' : '2'), // Adjust based on your status schema
          date: Math.floor(new Date(row.date!).getTime() / 1000),
          units: parseFloat(row.units!),
          pricePerUnit: parseFloat(row.pricePerUnit!),
          value: parseFloat(row.value!),
          description: row.description,
        }));

        // 3. Bulk Insert
        await tx.insert(transactions).values(transactionPayload);
      });

      reset();
      router.replace("/transactions/import/step5");
    } catch (e) {
      console.error("Import failed:", e);
      setIsImporting(false);
    }
  };

  return (
    <Screen scrollable={false}>
      <FlatList
        data={parsedData}
        keyExtractor={(_, i) => String(i)}
        contentContainerStyle={styles.list}
        ListHeaderComponent={<AppText style={styles.title}>Confirm Import</AppText>}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: colors.backgroundElement }]}>
            <AppText style={{ fontWeight: "700" }}>{item.instrumentSymbol}</AppText>
            <AppText style={{ color: colors.textSecondary }}>{item.units} x {item.pricePerUnit}</AppText>
          </View>
        )}
        ListFooterComponent={
          <Pressable 
            style={[styles.button, { backgroundColor: isImporting ? colors.textSecondary : colors.text }]} 
            onPress={handleConfirmImport}
            disabled={isImporting}
          >
            {isImporting ? <ActivityIndicator color={colors.background} /> : <AppText style={{ color: colors.background, fontWeight: "700" }}>Complete Import</AppText>}
          </Pressable>
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: { padding: Spacing.four },
  title: { fontSize: 24, fontWeight: "800", marginBottom: Spacing.four },
  card: { padding: Spacing.three, borderRadius: Radius.md, marginBottom: Spacing.two },
  button: { padding: Spacing.four, borderRadius: Radius.lg, alignItems: "center" },
});