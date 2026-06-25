import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { Screen, AppButton, AppSpacer } from "@/components/common";
import AppFormModal from "@/components/common/AppFormModal";
import { useEntitiesStore } from "@/store/entities.store";
import { EntityCard } from "@/components/entities/EntityCard";

export default function EntitiesScreen() {
  const { entities, loadEntities, createEntity, updateEntity, deleteEntity } = useEntitiesStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [name, setName] = useState("");

  useEffect(() => { loadEntities(); }, []);

  const handleSave = async () => {
    if (!name.trim()) return;
    if (editingId) await updateEntity(editingId, name);
    else await createEntity(name);
    setModalVisible(false);
    setName("");
    setEditingId(null);
  };

  return (
    <Screen>
      {entities.map((e) => (
        <EntityCard
          key={e.id}
          entity={e}
          onEdit={() => { setEditingId(e.id); setName(e.name); setModalVisible(true); }}
          onDelete={() => Alert.alert("Delete", "Are you sure?", [{ text: "Delete", style: "destructive", onPress: () => deleteEntity(e.id) }])}
        />
      ))}
      <AppSpacer size={16} />
      <AppButton title="Add Entity" onPress={() => { setEditingId(null); setName(""); setModalVisible(true); }} />
      <AppFormModal 
        visible={modalVisible} 
        title={editingId ? "Edit Entity" : "Add Entity"}
        placeholder="Entity Name"
        value={name} 
        isEditing={!!editingId} 
        onChange={setName} 
        onClose={() => setModalVisible(false)} 
        onSave={handleSave} 
      />
    </Screen>
  );
}