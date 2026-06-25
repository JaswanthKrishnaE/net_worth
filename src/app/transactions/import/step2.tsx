import { useState, useRef } from "react";
import { View, Pressable, StyleSheet, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetView, BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { AppText, Screen, AppSpacer } from "@/components/common";
import { useImportStore } from "@/store/import.store";
import { useTheme } from "@/hooks/use-theme";
import { Spacing, Radius } from "@/constants/theme";

const FIELD_OPTIONS = [
  { key: "date",             label: "Trade Date",           required: true },
  { key: "instrumentSymbol", label: "Instrument Symbol",    required: true },
  { key: "units",            label: "Quantity",             required: true },
  { key: "pricePerUnit",     label: "Price per Unit",       required: true },
  { key: "value",            label: "Total Value",          required: false },
  { key: "tradeType",        label: "Trade Type (BUY/SELL)", required: true },
  { key: "description",      label: "Description / Notes",  required: false },
  { key: null,               label: "Save as Metadata",     required: false },
  { key: "IGNORE",           label: "Ignore this column",   required: false },
];

const REQUIRED_KEYS = FIELD_OPTIONS.filter(f => f.required).map(f => f.key);

export default function Step2() {
  const colors = useTheme();
  const router = useRouter();
  const sheetRef = useRef<BottomSheet>(null);
  const [activeHeader, setActiveHeader] = useState<string | null>(null);

  const { rawRows, headerRow, columnMapping, setColumnMapping, setParsedData } = useImportStore();

  if (headerRow < 0 || !rawRows[headerRow]) {
    return (
      <Screen scrollable>
        <AppText style={{ color: colors.error }}>Could not detect header row. Go back and try again.</AppText>
      </Screen>
    );
  }

  const headers: string[] = rawRows[headerRow].map(String);
  const previewRow: any[] = rawRows[headerRow + 1] ?? [];

  const openSheet = (header: string) => {
    setActiveHeader(header);
    sheetRef.current?.expand();
  };

  const handleSelect = (fieldKey: string | null) => {
    if (!activeHeader) return;
    setColumnMapping({ ...columnMapping, [activeHeader]: fieldKey });
    sheetRef.current?.close();
  };

  // Check all required fields are mapped
  const mappedKeys = Object.values(columnMapping);
  const missingRequired = REQUIRED_KEYS.filter(k => !mappedKeys.includes(k));
  const canContinue = missingRequired.length === 0;

  const handleContinue = () => {
    const dataRows = rawRows.slice(headerRow + 1).filter(row =>
      row.some(cell => cell !== null && cell !== undefined && cell !== "")
    );

    const parsed = dataRows.map((row) => {
      const core: Record<string, any> = {};
      const meta: Record<string, any> = {};

      headers.forEach((header, i) => {
        const field = columnMapping[header] ?? null;
        if (field === "IGNORE") return;
        if (field) core[field] = row[i];
        else meta[header] = row[i];
      });

      // Auto-calc value if not mapped
      if (!core.value && core.units && core.pricePerUnit) {
        core.value = parseFloat(core.units) * parseFloat(core.pricePerUnit);
      }

      return { ...core, metadata: meta } as any;
    });

    setParsedData(parsed);
    router.push("/transactions/import/step3");
  };

  const getMappingLabel = (header: string) => {
    const field = columnMapping[header];
    if (field === undefined)  return { label: "Tap to map", color: colors.textSecondary };
    if (field === "IGNORE")   return { label: "Ignored", color: colors.textSecondary };
    if (field === null)       return { label: "Metadata", color: colors.info };
    return { label: FIELD_OPTIONS.find(o => o.key === field)?.label ?? field, color: colors.success };
  };

  return (
    <Screen scrollable={false}>
      <FlatList
        data={headers}
        keyExtractor={(item, i) => `${item}-${i}`}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <>
            <AppText style={[styles.title, { color: colors.text }]}>Map Columns</AppText>
            <AppText style={{ color: colors.textSecondary, fontSize: 14, marginTop: Spacing.one }}>
              {headers.length} columns detected. Map required fields to continue.
            </AppText>

            {/* Required fields checklist */}
            <View style={[styles.checklist, { backgroundColor: colors.backgroundElement }]}>
              <AppText style={{ color: colors.textSecondary, fontSize: 12, fontWeight: '700', marginBottom: Spacing.two }}>
                REQUIRED FIELDS
              </AppText>
              {FIELD_OPTIONS.filter(f => f.required).map(f => {
                const mapped = mappedKeys.includes(f.key);
                return (
                  <View key={f.key} style={styles.checkRow}>
                    <Ionicons
                      name={mapped ? "checkmark-circle" : "ellipse-outline"}
                      size={16}
                      color={mapped ? colors.success : colors.textSecondary}
                    />
                    <AppText style={{ color: mapped ? colors.success : colors.textSecondary, fontSize: 13, marginLeft: Spacing.one }}>
                      {f.label}
                    </AppText>
                  </View>
                );
              })}
            </View>

            <AppSpacer size={Spacing.three} />
          </>
        }
        ListFooterComponent={
          <>
            <AppSpacer size={Spacing.four} />
            <Pressable
              style={[styles.button, { backgroundColor: canContinue ? colors.text : colors.backgroundElement }]}
              onPress={handleContinue}
              disabled={!canContinue}
            >
              <AppText style={{ color: canContinue ? colors.background : colors.textSecondary, fontWeight: "700" }}>
                {canContinue ? "Continue to Preview" : `Map ${missingRequired.length} more required field(s)`}
              </AppText>
            </Pressable>
            <AppSpacer size={Spacing.six} />
          </>
        }
        renderItem={({ item: header, index }) => {
          const { label, color } = getMappingLabel(header);
          const preview = previewRow[index];

          return (
            <Pressable
              style={[styles.row, { backgroundColor: colors.backgroundElement }]}
              onPress={() => openSheet(header)}
            >
              <View style={{ flex: 1 }}>
                <AppText style={{ fontWeight: "700", color: colors.text }}>{header}</AppText>
                {preview !== undefined && (
                  <AppText style={{ color: colors.textSecondary, fontSize: 12 }} numberOfLines={1}>
                    e.g. {String(preview)}
                  </AppText>
                )}
              </View>
              <View style={styles.badge}>
                <AppText style={{ color, fontSize: 12, fontWeight: "600" }}>{label}</AppText>
                <Ionicons name="chevron-down" size={16} color={colors.textSecondary} style={{ marginLeft: 4 }} />
              </View>
            </Pressable>
          );
        }}
      />

      <BottomSheet
        ref={sheetRef}
        index={-1}
        snapPoints={["55%"]}
        enablePanDownToClose
        backgroundStyle={{ backgroundColor: colors.backgroundElement }}
        handleIndicatorStyle={{ backgroundColor: colors.textSecondary }}
      >
        <BottomSheetView style={{ padding: Spacing.four }}>
          <AppText style={{ fontSize: 18, fontWeight: "700", color: colors.text, marginBottom: Spacing.one }}>
            Map "{activeHeader}"
          </AppText>
          <AppText style={{ color: colors.textSecondary, fontSize: 13, marginBottom: Spacing.three }}>
            e.g. {activeHeader ? String(previewRow[headers.indexOf(activeHeader)] ?? "—") : "—"}
          </AppText>
        </BottomSheetView>
        <BottomSheetFlatList
          data={FIELD_OPTIONS}
          keyExtractor={(item) => String(item.key)}
          contentContainerStyle={{ paddingHorizontal: Spacing.four, paddingBottom: Spacing.six }}
          renderItem={({ item }) => {
            const isSelected = columnMapping[activeHeader!] === item.key;
            return (
              <Pressable
                style={[styles.sheetItem, { borderBottomColor: colors.backgroundSelected }]}
                onPress={() => handleSelect(item.key)}
              >
                <View>
                  <AppText style={{ color: colors.text, fontWeight: isSelected ? "700" : "400" }}>
                    {item.label}
                  </AppText>
                  {item.required && (
                    <AppText style={{ color: colors.error, fontSize: 11 }}>Required</AppText>
                  )}
                </View>
                {isSelected && <Ionicons name="checkmark" size={18} color={colors.success} />}
              </Pressable>
            );
          }}
        />
      </BottomSheet>
    </Screen>
  );
}

const styles = StyleSheet.create({
  list:      { padding: Spacing.four },
  title:     { fontSize: 24, fontWeight: "800" },
  checklist: { marginTop: Spacing.three, padding: Spacing.three, borderRadius: Radius.md },
  checkRow:  { flexDirection: "row", alignItems: "center", marginBottom: Spacing.one },
  row:       { padding: Spacing.three, borderRadius: Radius.md, marginBottom: Spacing.two, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  badge:     { flexDirection: "row", alignItems: "center" },
  sheetItem: { paddingVertical: Spacing.three, flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderBottomWidth: 1 },
  button:    { padding: Spacing.four, borderRadius: Radius.lg, alignItems: "center" },
});