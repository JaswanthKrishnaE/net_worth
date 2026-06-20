import { View, Text } from "react-native";
import { useState } from "react";
import { ProfileFormModal } from "@/components/profile";
import { useProfileStore } from "@/store/profile.store";
import { AppButton } from "@/components/common";

export default function ForceCreateProfile() {
  const [modalVisible, setModalVisible] = useState(true);
  
  // 1. Add state to hold the input value
  const [profileName, setProfileName] = useState("");
  
  const { createProfile } = useProfileStore();

  // 2. Use the local state to save the profile
  const handleSave = async () => {
    if (!profileName.trim()) return; 
    
    await createProfile(profileName);
    setModalVisible(false);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>
        Welcome! Please create your first profile.
      </Text>
      <AppButton title="Create Profile" onPress={() => setModalVisible(true)} />

      <ProfileFormModal
        visible={modalVisible}
        value={profileName}         // 3. Bind the value
        onChange={setProfileName}   // 4. Update the state on change
        isEditing={false}
        onClose={() => setModalVisible(false)}
        onSave={handleSave}         // 5. Use the handler that reads the state
      />
    </View>
  );
}