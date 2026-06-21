import { useEffect, useState, useMemo } from "react";
import { Alert } from "react-native";
import { AppButton, AppSpacer, Screen, AppFormModal } from "@/components/common";
import SubClassCard from "@/components/subclasses/SubClassCard";
import { useSubClassStore } from "@/store/subclass.store";

export default function SubClassScreen() {
  const { subClasses, loadSubClasses, createSubClass, updateSubClass, deleteSubClass } = useSubClassStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [name, setName] = useState("");

  useEffect(() => { loadSubClasses(); }, []);

  const isEditing = editingId !== null;
  
  const handleSave = async () => {
    const trimmed = name.trim();
    if (!trimmed) { Alert.alert("Invalid Name"); return; }
    isEditing ? await updateSubClass(editingId!, trimmed) : await createSubClass(trimmed);
    closeModal();
  };

  const closeModal = () => { setModalVisible(false); setName(""); setEditingId(null); };

  return (
    <Screen>
      {subClasses.map((item) => (
        <SubClassCard 
          key={item.id} 
          subClass={item} 
          onEdit={() => { setEditingId(item.id); setName(item.name); setModalVisible(true); }}
          onDelete={() => Alert.alert("Delete", "Are you sure?", [{ text: "Delete", style: "destructive", onPress: () => deleteSubClass(item.id) }])}
        />
      ))}
      <AppSpacer size={16} />
      <AppButton title="Add Sub-Class" onPress={() => setModalVisible(true)} />
      <AppFormModal
        visible={modalVisible}
        title={isEditing ? "Edit Sub-Class" : "Add Sub-Class"}
        placeholder="Sub-Class Name"
        value={name}
        isEditing={isEditing}
        onChange={setName}
        onClose={closeModal}
        onSave={handleSave}
      />
    </Screen>
  );
}