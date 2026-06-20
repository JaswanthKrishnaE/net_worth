import { useEffect, useMemo, useState } from "react";
import { Alert } from "react-native";
import { AppButton, AppSpacer, Screen, AppFormModal } from "@/components/common"; // Import common modal
import { ProfileCard } from "@/components/profile";
import { useProfileStore } from "@/store/profile.store";

export default function ProfilesScreen() {
  const {
    profiles,
    loadProfiles,
    createProfile,
    updateProfile,
    deleteProfile,
    selectProfile,
  } = useProfileStore();

  const [modalVisible, setModalVisible] = useState(false);
  const [editingProfileId, setEditingProfileId] = useState<number | null>(null);
  const [profileName, setProfileName] = useState("");

  useEffect(() => {
    loadProfiles();
  }, []);

  const isEditing = editingProfileId !== null;

  const selectedProfile = useMemo(
    () => profiles.find((p) => p.id === editingProfileId),
    [editingProfileId, profiles]
  );

  useEffect(() => {
    if (selectedProfile) {
      setProfileName(selectedProfile.name);
    }
  }, [selectedProfile]);

  const openAddModal = () => {
    setEditingProfileId(null);
    setProfileName("");
    setModalVisible(true);
  };

  const openEditModal = (id: number) => {
    setEditingProfileId(id);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setProfileName("");
    setEditingProfileId(null);
  };

  const handleSave = async () => {
    const trimmed = profileName.trim();
    if (!trimmed) {
      Alert.alert("Invalid Name");
      return;
    }

    if (isEditing && editingProfileId) {
      await updateProfile(editingProfileId, trimmed);
    } else {
      await createProfile(trimmed);
    }
    closeModal();
  };

  const handleDelete = (id: number) => {
    Alert.alert("Delete Profile", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => deleteProfile(id),
      },
    ]);
  };

  return (
    <Screen>
      {profiles.map((profile) => (
        <ProfileCard
          key={profile.id}
          profile={profile}
          selected={profile.isDefault === 1}
          onSelect={() => selectProfile(profile.id)}
          onEdit={() => openEditModal(profile.id)}
          onDelete={() => handleDelete(profile.id)}
        />
      ))}

      <AppSpacer size={16} />

      <AppButton title="Add Profile" onPress={openAddModal} />

      {/* Using the Universal Modal */}
      <AppFormModal
        visible={modalVisible}
        title={isEditing ? "Edit Profile" : "Add Profile"}
        placeholder="Profile Name"
        value={profileName}
        isEditing={isEditing}
        onChange={setProfileName}
        onClose={closeModal}
        onSave={handleSave}
      />
    </Screen>
  );
}