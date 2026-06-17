import { useState } from "react";
import { StyleSheet, View } from "react-native";

import {
  AppCard,
  AppSpacer,
  AppText,
  Screen,
} from "@/components/common";

import HorizontalSelector from "@/components/assets/HorizontalSelector";

export default function Reports() {
  const [selectedType, setSelectedType] =
    useState("All");

  const transactions = [
    {
      id: 1,
      date: "15 Jun 2026",
      type: "Buy",
      instrument: "Nifty 50 ETF",
      amount: 10000,
    },

    {
      id: 2,
      date: "14 Jun 2026",
      type: "Dividend",
      instrument: "HDFC Bank",
      amount: 1250,
    },

    {
      id: 3,
      date: "12 Jun 2026",
      type: "Sell",
      instrument: "Infosys",
      amount: 15000,
    },

    {
      id: 4,
      date: "10 Jun 2026",
      type: "Interest",
      instrument: "EPF",
      amount: 8500,
    },

    {
      id: 5,
      date: "08 Jun 2026",
      type: "Buy",
      instrument: "Parag Parikh Flexi Cap",
      amount: 5000,
    },
  ];

  const filteredTransactions =
    selectedType === "All"
      ? transactions
      : transactions.filter(
          (item) =>
            item.type === selectedType
        );

  return (
    <Screen>
      <AppCard>
        <AppText secondary>
          Total Transactions
        </AppText>

        <AppSpacer size={8} />

        <AppText style={styles.bigText}>
          {transactions.length}
        </AppText>
      </AppCard>

      <AppSpacer size={16} />

      <HorizontalSelector
        data={[
          "All",
          "Buy",
          "Sell",
          "Dividend",
          "Interest",
        ]}
        selected={selectedType}
        onChange={setSelectedType}
      />

      <AppSpacer size={16} />

      {filteredTransactions.map(
        (transaction) => (
          <TransactionCard
            key={transaction.id}
            transaction={transaction}
          />
        )
      )}
    </Screen>
  );
}

function TransactionCard({
  transaction,
}: {
  transaction: {
    date: string;
    type: string;
    instrument: string;
    amount: number;
  };
}) {
  return (
    <>
      <AppCard>
        <View style={styles.row}>
          <View>
            <AppText secondary>
              {transaction.date}
            </AppText>

            <AppSpacer size={4} />

            <AppText>
              {transaction.instrument}
            </AppText>

            <AppSpacer size={4} />

            <AppText secondary>
              {transaction.type}
            </AppText>
          </View>

          <AppText style={styles.amount}>
            ₹
            {transaction.amount.toLocaleString()}
          </AppText>
        </View>
      </AppCard>

      <AppSpacer size={8} />
    </>
  );
}

const styles = StyleSheet.create({
  bigText: {
    fontSize: 32,
    fontWeight: "700",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  amount: {
    fontWeight: "700",
  },
});