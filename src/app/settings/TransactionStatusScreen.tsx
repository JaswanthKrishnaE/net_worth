import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { Screen, AppButton, AppSpacer, AppFormModal } from "@/components/common";
import { useTransactionStatusStore } from "@/store/transaction-status.store";
import { TransactionStatusCard } from "@/components/transaction-status/TransactionStatusCard";

export default function TransactionStatusScreen() {
  const { transactionStatuses, loadTransactionStatuses, createTransactionStatus, updateTransactionStatus, deleteTransactionStatus } = useTransactionStatusStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [name, setName] = useState("");

  useEffect(() => { loadTransactionStatuses(); }, []);

  const handleSave = async () => {
    if (!name.trim()) return;
    if (editingId) await updateTransactionStatus(editingId, name);
    else await createTransactionStatus(name);
    setModalVisible(false);
    setName("");
    setEditingId(null);
  };

  return (
    <Screen>
      {transactionStatuses.map((s) => (
        <TransactionStatusCard
          key={s.id}
          status={s}
          onEdit={() => { setEditingId(s.id); setName(s.name); setModalVisible(true); }}
          onDelete={() => Alert.alert("Delete", "Are you sure?", [{ text: "Delete", style: "destructive", onPress: () => deleteTransactionStatus(s.id) }])}
        />
      ))}
      <AppSpacer size={16} />
      <AppButton title="Add Status" onPress={() => { setEditingId(null); setName(""); setModalVisible(true); }} />
      <AppFormModal 
        visible={modalVisible} 
        title={editingId ? "Edit Status" : "Add Status"}
        placeholder="e.g., Pending, Completed"
        value={name} 
        isEditing={!!editingId} 
        onChange={setName} 
        onClose={() => setModalVisible(false)} 
        onSave={handleSave} 
      />
    </Screen>
  );
}