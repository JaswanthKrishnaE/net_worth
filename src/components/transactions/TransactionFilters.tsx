// components/transactions/TransactionFilters.tsx
import { AppText } from "@/components/common";
import { useTheme } from "@/hooks/use-theme";
import { useAssetsStore } from "@/store/assets.store";
import { useBrokersStore } from "@/store/brokers.store";
import { useEntitiesStore } from "@/store/entities.store";
import { useTransactionFilterStore } from "@/store/transaction-filter.store";
import { useTransactionStatusStore } from "@/store/transaction-status.store";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, ScrollView, View } from "react-native";

export function TransactionFilters({
  onOpenFilter,
}: {
  onOpenFilter: (type: "asset" | "broker" | "entity") => void;
}) {
  const {
    selectedStatusId,
    selectedAssetId,
    selectedBrokerId,
    selectedEntityId,
    setFilter,
  } = useTransactionFilterStore();
  const { transactionStatuses } = useTransactionStatusStore();
  const { assets } = useAssetsStore();
  const { brokers } = useBrokersStore();
  const { entities } = useEntitiesStore();

  // Use nullish coalescing (??) to guarantee a string return
  const getAssetName = () =>
    assets.find((a) => a.id === selectedAssetId)?.name ?? "All Personal";
    
  const getBrokerName = () =>
    brokers.find((b) => b.id === selectedBrokerId)?.name ?? "All Brokers";
    
  const getEntityName = () =>
    entities.find((e) => e.id === selectedEntityId)?.name ?? "All Entities";

  return (
    <View style={{ marginBottom: 16 }}>
      {/* 1. Primary Selectors with Dropdowns */}
      <View style={{ flexDirection: "row", gap: 8, marginBottom: 12 }}>
        <SelectorDropdown
          label={getAssetName()}
          onPress={() => onOpenFilter("asset")}
        />
        <SelectorDropdown
          label={getBrokerName()}
          onPress={() => onOpenFilter("broker")}
        />
        <SelectorDropdown
          label={getEntityName()}
          onPress={() => onOpenFilter("entity")}
        />
      </View>

      {/* 2. Status Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 8 }}
      >
        <FilterChip
          label="All"
          isActive={selectedStatusId === null}
          onPress={() => setFilter("status", null)}
        />
        {transactionStatuses.map((s) => (
          <FilterChip
            key={s.id}
            label={s.name}
            isActive={selectedStatusId === s.id}
            onPress={() => setFilter("status", s.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

function SelectorDropdown({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) {
  const colors = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={{
        flex: 1,
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: colors.backgroundSelected,
        borderRadius: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <AppText
        style={{ color: colors.text, fontSize: 12, fontWeight: "600", flex: 1 }}
        numberOfLines={1}
      >
        {label}
      </AppText>
      <Ionicons name="chevron-down" size={16} color={colors.textSecondary} />
    </Pressable>
  );
}

function FilterChip({
  label,
  isActive,
  onPress,
}: {
  label: string;
  isActive: boolean;
  onPress: () => void;
}) {
  const colors = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={{
        paddingHorizontal: 14,
        paddingVertical: 8,
        backgroundColor: isActive ? colors.info : colors.backgroundSelected,
        borderRadius: 16,
        marginRight: 8,
        borderWidth: isActive ? 0 : 1,
        borderColor: colors.textSecondary,
      }}
    >
      <AppText
        style={{
          color: isActive ? "#fff" : colors.text,
          fontSize: 12,
          fontWeight: "600",
        }}
      >
        {label}
      </AppText>
    </Pressable>
  );
}