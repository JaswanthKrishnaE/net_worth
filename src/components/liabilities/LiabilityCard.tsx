import { useMemo, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { AppCard, AppText } from "@/components/common";
import { useTheme } from "@/hooks/use-theme";

type Liability = {
  id: number;
  name: string;
  type: string;
  lender: string;
  account: string;
  originalAmount: number;
  outstandingAmount: number;
  emi: number;
  interestRate: number;
};

type Props = {
  item: Liability;
  badge: string;
  overrideMetric?: "outstanding" | "original" | "emi" | "interest";
};

export default function LiabilityCard({ item, badge, overrideMetric }: Props) {
  const colors = useTheme();

  const metrics = ["outstanding", "original", "emi", "interest"] as const;
  const [idx, setIdx] = useState(0);
  const localMetric = metrics[idx];

  const metric = overrideMetric ?? localMetric;

  const displayValue = useMemo(() => {
    switch (metric) {
      case "outstanding":
        return `₹${item.outstandingAmount.toLocaleString()}`;
      case "original":
        return `₹${item.originalAmount.toLocaleString()}`;
      case "emi":
        return `₹${item.emi.toLocaleString()}`;
      case "interest":
        return `${item.interestRate}%`;
    }
  }, [metric, item]);

  return (
    <AppCard
      style={[styles.card, { backgroundColor: colors.backgroundElement }]}
    >
      <View style={styles.left}>
        <AppText style={styles.name}>{item.name}</AppText>
        <AppText
          style={[
            styles.badge,
            { backgroundColor: colors.backgroundSelected, color: colors.text },
          ]}
        >
          {badge}
        </AppText>
      </View>

      <View style={styles.right}>
        <Pressable
          onPress={() => {
            if (!overrideMetric) setIdx((i) => (i + 1) % metrics.length);
          }}
          style={[styles.metricButton, { borderColor: colors.textSecondary }]}
        >
          <AppText style={styles.metricLabel}>{metric}</AppText>
        </Pressable>

        <AppText style={[styles.value, { color: colors.text }]}>
          {displayValue}
        </AppText>
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    paddingVertical: 10,
  },
  left: {
    flex: 1,
  },
  right: {
    alignItems: "flex-end",
  },
  name: {
    fontWeight: "600",
    marginBottom: 6,
  },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: "600",
  },
  value: {
    fontWeight: "700",
    marginTop: 8,
  },
  metricButton: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 6,
  },
  metricLabel: {
    fontSize: 12,
  },
});
