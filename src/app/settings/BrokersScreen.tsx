import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { Screen, AppButton, AppSpacer } from "@/components/common";
import { useBrokersStore } from "@/store/brokers.store";
import { BrokerCard } from "@/components/brokers/BrokerCard";
import AppFormModal from "@/components/common/AppFormModal";


export default function BrokersScreen() {
  const { brokers, loadBrokers, createBroker, updateBroker, deleteBroker } = useBrokersStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [name, setName] = useState("");

  useEffect(() => { loadBrokers(); }, []);

  const handleSave = async () => {
    if (!name.trim()) return;
    if (editingId) await updateBroker(editingId, name);
    else await createBroker(name);
    setModalVisible(false);
    setName("");
    setEditingId(null);
  };

  return (
    <Screen>
      {brokers.map((b) => (
        <BrokerCard
          key={b.id}
          broker={b}
          onEdit={() => { setEditingId(b.id); setName(b.name); setModalVisible(true); }}
          onDelete={() => Alert.alert("Delete", "Are you sure?", [{ text: "Delete", style: "destructive", onPress: () => deleteBroker(b.id) }])}
        />
      ))}
      <AppSpacer size={16} />
      <AppButton title="Add Broker" onPress={() => { setEditingId(null); setName(""); setModalVisible(true); }} />
      <AppFormModal 
        visible={modalVisible} value={name} isEditing={!!editingId} 
        onChange={setName} onClose={() => setModalVisible(false)} onSave={handleSave} 
        title={editingId ? "Edit Broker" : "Add Broker"}
        placeholder="Enter broker name"
      />
    </Screen>
  );
}