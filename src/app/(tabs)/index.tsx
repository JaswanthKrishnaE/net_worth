import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";
import NetWorthCard from "@/components/dashboard/netWorthCard";
import GreetingsCard from "@/components/dashboard/greetingsCard";
import ValueCard from "@/components/dashboard/valueCard";
import {AppSpacer, AppText,Screen} from "@/components/common";
import AssetAllocationCard from "@/components/dashboard/AssetAllocationCard";

export default function Index() {
    const data = {
        'assets' : {
            'totalInvested' : 10000,
            'currentValue' : 12000,
            'todayChange' : 200,
            'todayChangePercent' : 1.67,
            'xirr' : 0.12,
            'cagr' : 0.15            
        }
    }
  return (
    <Screen>

        <View >
            <GreetingsCard />
            <AppSpacer size={16} />
            <NetWorthCard />
            <AppSpacer size={16} />
            <View style={styles.statsRow}>
                <ValueCard
                    icon="wallet-outline"
                    label="Invested"
                    value="₹10K"
                />

                <ValueCard
                    icon="trending-up"
                    label="Gain"
                    value="+₹2K"
                />

                <ValueCard
                    icon="cash-outline"
                    label="Current"
                    value="₹12K"
                />
            </View>
            <AppSpacer size={12} />
            <View style={styles.statsRow}>
                <ValueCard
                    icon="bar-chart-outline"
                    label="XIRR"
                    value="12%"
                />
              <ValueCard
                    icon="bar-chart-outline"
                    label="CAGR"
                    value="12%"
                />
            </View>
            <AppSpacer size={12} />
            <AssetAllocationCard />
        </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
});