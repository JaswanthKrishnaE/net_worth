import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { AppCard, AppText } from "@/components/common";
import { useTheme } from "@/hooks/use-theme";
import { Assets } from "@/store/assets.store";

type Props = {
  asset: Assets;
  onEdit: () => void;
  onDelete: () => void;
};

export default function AssetCard({
  asset,
  onEdit,
  onDelete,
}: Props) {
  const colors = useTheme();

  return (
    <AppCard style={styles.card}>
      <View style={styles.row}>
        <AppText style={styles.name}>{asset.name}</AppText>

        <View style={styles.actions}>
          <Pressable onPress={onEdit} style={styles.iconButton}>
            <Ionicons name="create-outline" size={18} color={colors.text} />
          </Pressable>

          <Pressable onPress={onDelete} style={styles.iconButton}>
            <Ionicons name="trash-outline" size={18} color={colors.danger} />
          </Pressable>
        </View>
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    flex: 1,
  },
  actions: {
    flexDirection: "row",
    gap: 10,
  },
  iconButton: {
    padding: 8,
  },
});