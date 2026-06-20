import { Modal, StyleSheet, View } from "react-native";

import { useTheme } from "@/hooks/use-theme";

type Props = {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function AppModal({
  visible,
  onClose,
  children,
}: Props) {
  const colors = useTheme();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View
          style={[
            styles.content,
            {
              backgroundColor:
                colors.backgroundElement,
            },
          ]}
        >
          {children}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor:
      "rgba(0,0,0,0.35)",
  },

  content: {
    borderRadius: 16,
    padding: 20,
  },
});