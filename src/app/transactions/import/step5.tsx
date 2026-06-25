import { useEffect } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import { AppText, Screen } from "@/components/common";
import { useTheme } from "@/hooks/use-theme";
import { Spacing, Radius } from "@/constants/theme";

export default function Step5() {
  const colors = useTheme();
  const router = useRouter();

  return (
    <Screen scrollable={false}>
      <LottieView
        source={require("@/assets/animations/success.json")} // Ensure you have this file
        autoPlay
        loop={false}
        style={styles.animation}
      />
      
      <AppText style={[styles.title, { color: colors.text }]}>Import Successful!</AppText>
      <AppText style={{ color: colors.textSecondary, marginBottom: Spacing.four }}>
        Your transactions have been added to the database.
      </AppText>

      <Pressable 
        style={[styles.button, { backgroundColor: colors.text }]} 
        onPress={() => router.replace("/transactions")}
      >
        <AppText style={{ color: colors.background, fontWeight: "700" }}>View Transactions</AppText>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: Spacing.four },
  animation: { width: 200, height: 200 },
  title: { fontSize: 24, fontWeight: "800", marginBottom: Spacing.two },
  button: { paddingVertical: Spacing.three, paddingHorizontal: Spacing.six, borderRadius: Radius.lg }
});