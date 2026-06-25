import { useEffect, useState } from "react";
import { View, Pressable, StyleSheet, ActivityIndicator, FlatList } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { AppText, Screen, AppSpacer } from "@/components/common";
import { useImportStore } from "@/store/import.store";
import { useTheme } from "@/hooks/use-theme";
import { Spacing, Radius } from "@/constants/theme";
import { db } from "@/db";
import { assets } from "@/db/schema/assets.schema";
import { entities } from "@/db/schema/entity.schema";
import { subClass } from "@/db/schema/assets.schema";

export default function MapInstrumentScreen() {
  const { symbol } = useLocalSearchParams<{ symbol: string }>();
  const router = useRouter();
  const colors = useTheme();
  const { setInstrumentMapping } = useImportStore();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{ assets: any[], entities: any[], subClasses: any[] }>({ assets: [], entities: [], subClasses: [] });
  
  const [selection, setSelection] = useState({ assetId: 0, entityId: 0, subClassId: 0 });

  useEffect(() => {
    const fetchData = async () => {
      const [a, e, s] = await Promise.all([
        db.select().from(assets),
        db.select().from(entities),
        db.select().from(subClass)
      ]);
      setData({ assets: a, entities: e, subClasses: s });
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleSave = () => {
    if (selection.assetId && selection.entityId) {
      setInstrumentMapping(symbol, {
        name: symbol,
        ...selection
      });
      router.back();
    }
  };

  if (loading) return <Screen><ActivityIndicator /></Screen>;

  return (
    <Screen scrollable={false}>
      <FlatList
        data={[
          { title: "Select Asset", key: "assets", list: data.assets, field: "assetId" },
          { title: "Select Entity", key: "entities", list: data.entities, field: "entityId" },
          { title: "Select Sub-Class", key: "subClasses", list: data.subClasses, field: "subClassId" },
        ]}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.container}
        ListHeaderComponent={<AppText style={styles.title}>Map {symbol}</AppText>}
        renderItem={({ item }) => (
          <View style={styles.section}>
            <AppText style={styles.sectionTitle}>{item.title}</AppText>
            {item.list.map((option) => {
              const isSelected = selection[item.field as keyof typeof selection] === option.id;
              return (
                <Pressable
                  key={option.id}
                  style={[styles.option, isSelected && { backgroundColor: colors.backgroundSelected }]}
                  onPress={() => setSelection({ ...selection, [item.field]: option.id })}
                >
                  <AppText style={{ color: isSelected ? colors.text : colors.textSecondary }}>
                    {option.name}
                  </AppText>
                </Pressable>
              );
            })}
          </View>
        )}
        ListFooterComponent={
          <Pressable style={[styles.button, { backgroundColor: colors.text }]} onPress={handleSave}>
            <AppText style={{ color: colors.background, fontWeight: "700" }}>Save Mapping</AppText>
          </Pressable>
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { padding: Spacing.four },
  title: { fontSize: 24, fontWeight: "800", marginBottom: Spacing.four },
  section: { marginBottom: Spacing.four },
  sectionTitle: { fontSize: 16, fontWeight: "700", marginBottom: Spacing.two },
  option: { padding: Spacing.three, borderRadius: Radius.md, marginBottom: Spacing.one, borderWidth: 1, borderColor: '#ccc' },
  button: { padding: Spacing.four, borderRadius: Radius.lg, alignItems: "center", marginTop: Spacing.four },
});