// app/(tabs)/transactions.tsx
import { useState, useEffect } from "react";
import { SectionList, TextInput, View } from "react-native";
import { AppText, Screen } from "@/components/common";
import { TransactionCard } from "@/components/transactions/TransactionCard";
import { TransactionFilters } from "@/components/transactions/TransactionFilters";
import { FilterSelectionModal } from "@/components/common/FilterSelectionModal";
import { useTheme } from "@/hooks/use-theme";
import { useAssetsStore } from "@/store/assets.store";
import { useBrokersStore } from "@/store/brokers.store";
import { useEntitiesStore } from "@/store/entities.store";
import { useTransactionFilterStore } from "@/store/transaction-filter.store";
import { useTransactionStatusStore } from "@/store/transaction-status.store";

export default function TransactionsScreen() {
  const colors = useTheme();
  const [modalConfig, setModalConfig] = useState<{ visible: boolean; type: 'asset' | 'broker' | 'entity' | null }>({ visible: false, type: null });

  // Load stores
  const { assets, loadAssets } = useAssetsStore();
  const { brokers, loadBrokers } = useBrokersStore();
  const { entities, loadEntities } = useEntitiesStore();
  const { loadTransactionStatuses } = useTransactionStatusStore();
  const { setFilter, selectedAssetId, selectedBrokerId, selectedEntityId } = useTransactionFilterStore();

  useEffect(() => {
    loadAssets(); loadBrokers(); loadEntities(); loadTransactionStatuses();
  }, []);

  const getModalProps = () => {
    if (modalConfig.type === 'asset') return { title: 'Select Asset', options: assets, selectedId: selectedAssetId };
    if (modalConfig.type === 'broker') return { title: 'Select Broker', options: brokers, selectedId: selectedBrokerId };
    return { title: 'Select Entity', options: entities, selectedId: selectedEntityId };
  };

  return (
    <Screen scrollable={false}>
      <View style={{ paddingHorizontal: 24, paddingTop: 16 }}>
        <TextInput placeholder="Search transactions..." style={{ backgroundColor: colors.backgroundSelected, padding: 14, borderRadius: 16, color: colors.text, marginBottom: 16 }} placeholderTextColor={colors.textSecondary} />
        <TransactionFilters onOpenFilter={(type) => setModalConfig({ visible: true, type })} />
      </View>

      <FilterSelectionModal 
        visible={modalConfig.visible}
        {...getModalProps()}
        onSelect={(id) => modalConfig.type && setFilter(modalConfig.type, id)}
        onClose={() => setModalConfig({ visible: false, type: null })}
      />

      <SectionList
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 100 }}
        sections={[{ title: "Today", data: [{ id: 1, title: "Reliance", subtitle: "Buy", amount: -24500 }] }]}
        keyExtractor={(item) => item.id.toString()}
        renderSectionHeader={({ section: { title } }) => <AppText style={{ fontWeight: '700', fontSize: 16, marginVertical: 8 }}>{title}</AppText>}
        renderItem={({ item }) => <TransactionCard transaction={item} />}
      />
    </Screen>
  );
}