import { useState, useEffect, useMemo } from "react";
import {
  Pressable,
  SectionList,
  TextInput,
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

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
import { useTransactionsStore } from "@/store/transactions.store";

export default function TransactionsScreen() {
  const colors = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [modalConfig, setModalConfig] = useState<{
    visible: boolean;
    type: "asset" | "broker" | "entity" | null;
  }>({ visible: false, type: null });

  // Load stores
  const { assets, loadAssets } = useAssetsStore();
  const { brokers, loadBrokers } = useBrokersStore();
  const { entities, loadEntities } = useEntitiesStore();
  const { loadTransactionStatuses } = useTransactionStatusStore();
  
  // Load Transactions Store
  const { transactions, loadTransactions, isLoading } = useTransactionsStore();

  const {
    setFilter,
    selectedAssetId,
    selectedBrokerId,
    selectedEntityId,
  } = useTransactionFilterStore();

  useEffect(() => {
    loadAssets();
    loadBrokers();
    loadEntities();
    loadTransactionStatuses();
    loadTransactions(); // Initial fetch
  }, []);

  // Transform flat array into sections grouped by Date
  const sections = useMemo(() => {
    const grouped = transactions.reduce((acc, tx) => {
      // Convert epoch to readable date string
      const dateString = new Date(tx.date * 1000).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      if (!acc[dateString]) acc[dateString] = [];
      acc[dateString].push(tx);
      return acc;
    }, {} as Record<string, typeof transactions>);

    return Object.keys(grouped).map((date) => ({
      title: date,
      data: grouped[date],
    }));
  }, [transactions]);

  const getModalProps = () => {
    if (modalConfig.type === "asset") return { title: "Select Asset", options: assets, selectedId: selectedAssetId };
    if (modalConfig.type === "broker") return { title: "Select Broker", options: brokers, selectedId: selectedBrokerId };
    return { title: "Select Entity", options: entities, selectedId: selectedEntityId };
  };

  if (isLoading) {
    return <Screen ><ActivityIndicator size="large" color={colors.text} /></Screen>;
  }

  return (
    <Screen scrollable={false}>
      <View style={{ paddingHorizontal: 24 }}>
        <TextInput
          placeholder="Search transactions..."
          placeholderTextColor={colors.textSecondary}
          style={[styles.searchInput, { backgroundColor: colors.backgroundSelected, color: colors.text }]}
        />
        <TransactionFilters
          onOpenFilter={(type) => setModalConfig({ visible: true, type })}
        />
      </View>

      <FilterSelectionModal
        visible={modalConfig.visible}
        {...getModalProps()}
        onSelect={(id) => modalConfig.type && setFilter(modalConfig.type, id)}
        onClose={() => setModalConfig({ visible: false, type: null })}
      />

      <SectionList
        contentContainerStyle={styles.listContainer}
        sections={sections}
        keyExtractor={(item) => item.id.toString()}
        renderSectionHeader={({ section: { title } }) => (
          <AppText style={[styles.sectionHeader, { color: colors.text }]}>{title}</AppText>
        )}
        renderItem={({ item }) => (
          <TransactionCard
            // Map your DB fields to the props your card expects
            transaction={{
              id: item.id,
              title: "Transaction", // You may need to look up the instrument name here
              subtitle: "Details",
              amount: item.value,
            }}
          />
        )}
      />

      <Pressable
        style={[styles.fab, { backgroundColor: colors.text, bottom: insets.bottom + 90 }]}
        onPress={() => router.push("/transactions/import/step1")}
      >
        <Ionicons name="add" size={28} color={colors.background} />
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  searchInput: { padding: 14, borderRadius: 16, marginBottom: 16 },
  listContainer: { paddingHorizontal: 24, paddingBottom: 140 },
  sectionHeader: { fontWeight: "700", fontSize: 16, marginVertical: 8 },
  fab: {
    position: "absolute",
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
  },
});