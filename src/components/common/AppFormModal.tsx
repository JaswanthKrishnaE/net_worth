// components/common/AppFormModal.tsx
import { StyleSheet, TextInput, View } from "react-native";
import { AppButton, AppModal, AppText } from "@/components/common";
import { useTheme } from "@/hooks/use-theme";

type Props = {
  visible: boolean;
  value: string;
  isEditing: boolean;
  title: string;         // Add this
  placeholder: string;   // Add this
  onChange: (value: string) => void;
  onClose: () => void;
  onSave: () => void;
};

export default function AppFormModal({
  visible,
  value,
  isEditing,
  title,       // Use this
  placeholder, // Use this
  onChange,
  onClose,
  onSave,
}: Props) {
  const colors = useTheme();

  return (
    <AppModal visible={visible} onClose={onClose}>
      <AppText style={styles.title}>{title}</AppText>

      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder} // Use this
        placeholderTextColor={colors.textSecondary}
        style={[
          styles.input,
          { color: colors.text, borderColor: colors.textSecondary },
        ]}
      />

      <View style={styles.actions}>
        <AppButton title="Cancel" onPress={onClose} style={styles.button} />
        <AppButton
          title={isEditing ? "Save" : "Create"}
          onPress={onSave}
          style={styles.button}
        />
      </View>
    </AppModal>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 18, fontWeight: "700", marginBottom: 12 },
  input: { borderWidth: 1, borderRadius: 12, padding: 12, marginBottom: 16 },
  actions: { flexDirection: "row", gap: 10 },
  button: { flex: 1 },
});