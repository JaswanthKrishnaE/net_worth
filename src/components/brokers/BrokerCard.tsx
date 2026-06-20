import { Pressable, View, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";
import { AppCard, AppText } from "@/components/common";
import { useTheme } from "@/hooks/use-theme";

export function BrokerCard({ broker, onEdit, onDelete }: any) {
  const colors = useTheme();

  const renderRightActions = () => (
    <View style={{ flexDirection: "row", marginBottom: 8 }}>
      <Pressable onPress={onEdit} style={{ justifyContent: "center", paddingHorizontal: 20, backgroundColor: colors.backgroundSelected, borderRadius: 12, marginLeft: 8 }}>
        <Ionicons name="create" size={20} color={colors.text} />
      </Pressable>
      <Pressable onPress={onDelete} style={{ justifyContent: "center", paddingHorizontal: 20, backgroundColor: colors.danger, borderRadius: 12, marginLeft: 8 }}>
        <Ionicons name="trash" size={20} color="#fff" />
      </Pressable>
    </View>
  );

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <AppCard style={{ marginBottom: 8, padding: 16 }}>
        <AppText>{broker.name}</AppText>
      </AppCard>
    </Swipeable>
  );
}