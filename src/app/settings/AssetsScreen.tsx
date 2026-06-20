import { useEffect, useState, useMemo } from "react";
import { Alert } from "react-native";

import { AppButton, AppSpacer, Screen } from "@/components/common";

import AssetCard from "@/components/assets/AssetCard";
import AssetFormModal from "@/components/assets/AssetFormModal";

import { useAssetsStore } from "@/store/assets.store";

export default function AssetsScreen() {
  const {
    assets,
    loadAssets,
    createAsset,
    updateAsset,
    deleteAsset,
  } = useAssetsStore();

  const [modalVisible, setModalVisible] = useState(false);
  const [editingAssetId, setEditingAssetId] = useState<number | null>(null);
  const [assetName, setAssetName] = useState("");

  useEffect(() => {
    loadAssets();
  }, []);

  const isEditing = editingAssetId !== null;

  const selectedAsset = useMemo(
    () => assets.find((a) => a.id === editingAssetId),
    [editingAssetId, assets]
  );

  useEffect(() => {
    if (selectedAsset) {
      setAssetName(selectedAsset.name);
    }
  }, [selectedAsset]);

  const openAddModal = () => {
    setEditingAssetId(null);
    setAssetName("");
    setModalVisible(true);
  };

  const openEditModal = (id: number) => {
    setEditingAssetId(id);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setAssetName("");
    setEditingAssetId(null);
  };

  const handleSave = async () => {
    const trimmed = assetName.trim();

    if (!trimmed) {
      Alert.alert("Invalid Name");
      return;
    }

    if (isEditing && editingAssetId) {
      await updateAsset(editingAssetId, trimmed);
    } else {
      await createAsset(trimmed);
    }

    closeModal();
  };

  const handleDelete = (id: number) => {
    Alert.alert("Delete Asset", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => deleteAsset(id),
      },
    ]);
  };

  return (
    <Screen>
      {assets.map((asset) => (
        <AssetCard
          key={asset.id}
          asset={asset}
          onEdit={() => openEditModal(asset.id)}
          onDelete={() => handleDelete(asset.id)}
        />
      ))}

      <AppSpacer size={16} />

      <AppButton title="Add Asset" onPress={openAddModal} />

      <AssetFormModal
        visible={modalVisible}
        value={assetName}
        isEditing={isEditing}
        onChange={setAssetName}
        onClose={closeModal}
        onSave={handleSave}
      />
    </Screen>
  );
}