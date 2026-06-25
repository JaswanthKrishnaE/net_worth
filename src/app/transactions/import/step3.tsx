import { useEffect, useState, useMemo } from "react";
import { View, Pressable, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { AppText, Screen, AppSpacer } from "@/components/common";
import { useImportStore } from "@/store/import.store";
import { useTheme } from "@/hooks/use-theme";
import { Spacing, Radius } from "@/constants/theme";
import { db } from "@/db";
import { instruments } from "@/db/schema/instruments.schema";
import { Ionicons } from "@expo/vector-icons";

export default function Step3() {
  const colors = useTheme();
  const router = useRouter();
  const { parsedData, instrumentMappings } = useImportStore();
  
  const [loading, setLoading] = useState(true);
  const [knownInstruments, setKnownInstruments] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    // We only need to check if instruments exist here
    const existing = await db.select().from(instruments);
    setKnownInstruments(existing);
    setLoading(false);
  };

  const handleOpenMap = (symbol: string) => {
    router.push({
      pathname: "/transactions/import/map-instrument",
      params: { symbol: symbol },
    });
  };

  const symbolStats = useMemo(() => {
    const uniqueSymbols = Array.from(new Set(parsedData.map((d) => d.instrumentSymbol).filter(Boolean)));
    return uniqueSymbols.map((symbol) => ({
      symbol: symbol!,
      status: knownInstruments.find((i) => i.symbol === symbol) 
        ? "exists" 
        : instrumentMappings[symbol!] 
        ? "mapped" 
        : "missing",
    }));
  }, [parsedData, knownInstruments, instrumentMappings]);

  const missing = symbolStats.filter((s) => s.status === "missing");
  const ready = symbolStats.filter((s) => s.status !== "missing");
  const listData = [...missing, ...ready];

  if (loading) {
    return (
      <Screen scrollable={false}>
        <ActivityIndicator size="large" color={colors.text} style={{ marginTop: 60 }} />
      </Screen>
    );
  }

  return (
    <Screen scrollable={false}>
      <FlatList
        data={listData}
        keyExtractor={(item) => item.symbol}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <>
            <AppText style={[styles.title, { color: colors.text }]}>Resolve Instruments</AppText>
            <AppText style={{ color: colors.textSecondary, marginBottom: Spacing.four }}>
              {missing.length > 0 
                ? `${missing.length} items require mapping.` 
                : "All instruments resolved."}
            </AppText>
          </>
        }
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: colors.backgroundElement }]}>
            <View style={{ flex: 1 }}>
              <AppText style={{ fontWeight: "700", color: colors.text }}>{item.symbol}</AppText>
              <AppText style={{ color: item.status === "missing" ? colors.error : colors.success, fontSize: 12 }}>
                {item.status.toUpperCase()}
              </AppText>
            </View>

            {item.status === "missing" ? (
              <Pressable onPress={() => handleOpenMap(item.symbol)} style={styles.actionBtn}>
                <AppText style={{ color: colors.info, fontWeight: "600" }}>Map</AppText>
              </Pressable>
            ) : (
              <Ionicons name="checkmark-circle" size={20} color={colors.success} />
            )}
          </View>
        )}
        ListFooterComponent={
          <>
            <AppSpacer size={Spacing.four} />
            <Pressable
              style={[
                styles.button, 
                { backgroundColor: missing.length === 0 ? colors.text : colors.backgroundElement }
              ]}
              onPress={() => router.push("/transactions/import/step4")} // Navigate to final preview
              disabled={missing.length > 0}
            >
              <AppText style={{ 
                color: missing.length === 0 ? colors.background : colors.textSecondary, 
                fontWeight: "700" 
              }}>
                {missing.length === 0 ? "Continue to Preview" : `Map ${missing.length} more instrument(s)`}
              </AppText>
            </Pressable>
            <AppSpacer size={Spacing.six} />
          </>
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: { padding: Spacing.four },
  title: { fontSize: 24, fontWeight: "800", marginBottom: Spacing.one },
  card: { 
    padding: Spacing.three, 
    borderRadius: Radius.md, 
    marginBottom: Spacing.two, 
    flexDirection: "row", 
    justifyContent: "space-between",
    alignItems: "center"
  },
  actionBtn: { padding: Spacing.two },
  button: { padding: Spacing.four, borderRadius: Radius.lg, alignItems: "center" },
});