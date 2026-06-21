import { View, Pressable, FlatList, StyleSheet } from "react-native";
import { AppModal, AppText } from "@/components/common";
import { useTheme } from "@/hooks/use-theme";

type Props = {
  visible: boolean;
  title: string;
  options: { id: number | null; name: string }[];
  selectedId: number | null;
  onSelect: (id: number | null) => void;
  onClose: () => void;
};

export function FilterSelectionModal({ visible, title, options, selectedId, onSelect, onClose }: Props) {
  const colors = useTheme();
  
  return (
    <AppModal visible={visible} onClose={onClose}>
      <AppText style={{ fontSize: 18, fontWeight: "700", marginBottom: 16 }}>{title}</AppText>
      <FlatList
        data={[{ id: null, name: "All" }, ...options]}
        keyExtractor={(item) => item.id?.toString() ?? "all"}
        renderItem={({ item }) => (
          <Pressable 
            onPress={() => { onSelect(item.id); onClose(); }}
            style={[styles.option, { borderBottomColor: colors.backgroundSelected }]}
          >
            <AppText style={{ color: selectedId === item.id ? colors.info : colors.text }}>
              {item.name}
            </AppText>
          </Pressable>
        )}
      />
    </AppModal>
  );
}

const styles = StyleSheet.create({
  option: { paddingVertical: 16, borderBottomWidth: 1 }
});