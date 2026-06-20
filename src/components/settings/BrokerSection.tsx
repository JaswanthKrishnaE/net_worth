import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable } from "react-native";
import { AppCard, AppText } from "@/components/common";
import { useTheme } from "@/hooks/use-theme";

export default function BrokerSection() {
  const colors = useTheme();
  const router = useRouter();
  return (
    <Pressable onPress={() => router.push("/settings/BrokersScreen")}>
      <AppCard style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <AppText style={{ fontSize: 18, fontWeight: "700" }}>Brokers</AppText>
        <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
      </AppCard>
    </Pressable>
  );
}