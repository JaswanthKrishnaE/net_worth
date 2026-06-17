import { useState } from "react";

import { AppButton, AppSpacer, Screen } from "@/components/common";

import AllocationCard from "@/components/assets/AllocationCard";
import LiabilityCard from "@/components/liabilities/LiabilityCard";

type ViewType = "type" | "lender" | "account";

type MetricType = "outstanding" | "original" | "emi" | "interest";

export default function Liabilities() {
  const [selectedView, setSelectedView] = useState<ViewType>("type");

  const [selectedFilter, setSelectedFilter] = useState("All");

  const [globalMetric, setGlobalMetric] = useState<MetricType>("outstanding");

  const allocationData = {
    type: [
      {
        name: "Home Loan",
        percent: 60,
      },
      {
        name: "Vehicle Loan",
        percent: 15,
      },
      {
        name: "Personal Loan",
        percent: 10,
      },
      {
        name: "Credit Card",
        percent: 15,
      },
    ],

    lender: [
      {
        name: "HDFC Bank",
        percent: 40,
      },
      {
        name: "ICICI Bank",
        percent: 35,
      },
      {
        name: "SBI",
        percent: 25,
      },
    ],

    account: [
      {
        name: "Home Loan",
        percent: 50,
      },
      {
        name: "Amazon Pay Card",
        percent: 20,
      },
      {
        name: "Car Loan",
        percent: 30,
      },
    ],
  };

  const liabilityData = [
    {
      id: 1,
      name: "Home Loan Bangalore",
      type: "Home Loan",
      lender: "HDFC Bank",
      account: "Home Loan",

      originalAmount: 5000000,
      outstandingAmount: 4200000,
      emi: 45000,
      interestRate: 8.5,
    },

    {
      id: 2,
      name: "Honda City Loan",
      type: "Vehicle Loan",
      lender: "SBI",
      account: "Car Loan",

      originalAmount: 900000,
      outstandingAmount: 350000,
      emi: 18000,
      interestRate: 9.1,
    },

    {
      id: 3,
      name: "Amazon Pay ICICI",
      type: "Credit Card",
      lender: "ICICI Bank",
      account: "Amazon Pay Card",

      originalAmount: 0,
      outstandingAmount: 25000,
      emi: 0,
      interestRate: 36,
    },

    {
      id: 4,
      name: "Wedding Loan",
      type: "Personal Loan",
      lender: "HDFC Bank",
      account: "Personal Loan",

      originalAmount: 600000,
      outstandingAmount: 280000,
      emi: 12000,
      interestRate: 11.5,
    },
  ];

  const filteredData = liabilityData.filter((item) => {
    if (selectedFilter === "All") return true;

    if (selectedView === "type") {
      return item.type === selectedFilter;
    }

    if (selectedView === "lender") {
      return item.lender === selectedFilter;
    }

    return item.account === selectedFilter;
  });

  const metrics = ["outstanding", "original", "emi", "interest"] as const;

  const cycleMetric = () => {
    const index = metrics.indexOf(globalMetric);

    setGlobalMetric(metrics[(index + 1) % metrics.length]);
  };

  return (
    <Screen>
      <AllocationCard
        selected={selectedView as any}
        onChange={(value: any) => {
          setSelectedView(value);
          setSelectedFilter("All");
        }}
        allocationData={allocationData as any}
      />

      <AppSpacer size={12} />

      <AppButton
        title={globalMetric}
        onPress={cycleMetric}
        style={{
          alignSelf: "flex-start",
          paddingHorizontal: 12,
        }}
      />

      <AppSpacer size={12} />

      {filteredData.map((item) => (
        <LiabilityCard
          key={item.id}
          item={item}
          overrideMetric={globalMetric}
          badge={
            selectedView === "type"
              ? item.type
              : selectedView === "lender"
                ? item.lender
                : item.account
          }
        />
      ))}
    </Screen>
  );
}
