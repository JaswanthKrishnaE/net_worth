import { useState } from "react";

import { AppButton, AppSpacer, Screen } from "@/components/common";

import AllocationCard from "@/components/assets/AllocationCard";
import InstrumentCard from "@/components/assets/InstrumentCard";

type ViewType = "assets" | "entity" | "broker";

type MetricType =
  | "current"
  | "invested"
  | "returns"
  | "dayChange"
  | "xirr"
  | "cagr";

export default function Assets() {
  const [selectedView, setSelectedView] = useState<ViewType>("assets");

  const [selectedFilter, setSelectedFilter] = useState("All");

  const allocationData = {
    assets: [
      { name: "Equity", percent: 40 },
      { name: "Gold", percent: 20 },
      { name: "Debt", percent: 15 },
      { name: "Silver", percent: 10 },
      { name: "Real Estate", percent: 10 },
      { name: "Cash", percent: 5 },
    ],

    entity: [
      { name: "Stocks", percent: 35 },
      { name: "Mutual Funds", percent: 30 },
      { name: "EPF", percent: 15 },
      { name: "NPS", percent: 10 },
      { name: "PPF", percent: 10 },
    ],

    broker: [
      { name: "Zerodha", percent: 50 },
      { name: "Groww", percent: 20 },
      { name: "KFintech", percent: 15 },
      { name: "EPFO", percent: 10 },
      { name: "RBI", percent: 5 },
    ],
  };

  const instrumentData = [
    {
      id: 1,
      name: "Nifty 50 ETF",
      assetClass: "Equity",
      entity: "ETF",
      broker: "Zerodha",
      investedValue: 100000,
      currentValue: 135000,
      dayChange: 1200,
      xirr: 14.2,
      cagr: 12.5,
    },

    {
      id: 2,
      name: "HDFC Bank",
      assetClass: "Equity",
      entity: "Stocks",
      broker: "Zerodha",
      investedValue: 80000,
      currentValue: 95000,
      dayChange: 450,
      xirr: 11.8,
      cagr: 10.2,
    },

    {
      id: 3,
      name: "Parag Parikh Flexi Cap",
      assetClass: "Equity",
      entity: "Mutual Funds",
      broker: "Groww",
      investedValue: 150000,
      currentValue: 210000,
      dayChange: 800,
      xirr: 16.5,
      cagr: 15.1,
    },

    {
      id: 4,
      name: "EPF",
      assetClass: "Debt",
      entity: "EPF",
      broker: "EPFO",
      investedValue: 300000,
      currentValue: 365000,
      dayChange: 0,
      xirr: 8.1,
      cagr: 8.1,
    },

    {
      id: 5,
      name: "SGB 2032",
      assetClass: "Gold",
      entity: "SGB",
      broker: "RBI",
      investedValue: 75000,
      currentValue: 110000,
      dayChange: 300,
      xirr: 13.2,
      cagr: 11.9,
    },

    {
      id: 6,
      name: "Groww Flexi Multicap",
      assetClass: "Equity",
      entity: "Mutual Funds",
      broker: "Groww",
      investedValue: 50000,
      currentValue: 72000,
      dayChange: 150,
      xirr: 12.4,
      cagr: 11.6,
    },
  ];

  const filterData = [
    "All",
    ...allocationData[selectedView].map((item) => item.name),
  ];

  const filteredData = instrumentData.filter((item) => {
    if (selectedFilter === "All") return true;

    if (selectedView === "assets") {
      return item.assetClass === selectedFilter;
    }

    if (selectedView === "entity") {
      return item.entity === selectedFilter;
    }

    return item.broker === selectedFilter;
  });

  // global metric toggle for all cards (can be undefined to allow per-card toggles)
  const [globalMetric, setGlobalMetric] = useState<MetricType | undefined>(
    "current",
  );

  const _metrics = ["current", "invested", "returns", "xirr"] as const;

  const cycleGlobalMetric = () => {
    const idx = _metrics.indexOf(globalMetric as any);
    const next = _metrics[(idx + 1) % _metrics.length];
    setGlobalMetric(next as MetricType);
  };

  return (
    <Screen>
      <AllocationCard
        selected={selectedView}
        onChange={(value) => {
          setSelectedView(value);
          setSelectedFilter("All");
        }}
        allocationData={allocationData}
      />

      <AppSpacer size={12} />

      {/* <HorizontalSelector
        data={filterData}
        selected={selectedFilter}
        onChange={setSelectedFilter}
        slideUpOnMount
      /> */}

      {/* <AppSpacer size={12} /> */}

      {/* <AppSpacer size={12} /> */}

      <AppButton
        title={globalMetric ?? "metric"}
        onPress={cycleGlobalMetric}
        style={{ alignSelf: "flex-start", paddingHorizontal: 12 }}
      />

      <AppSpacer size={8} />

      {filteredData.map((item) => (
        <InstrumentCard
          key={item.id}
          item={item}
          overrideMetric={globalMetric as any}
          badge={
            selectedView === "assets"
              ? item.assetClass
              : selectedView === "entity"
                ? item.entity
                : item.broker
          }
        />
      ))}
    </Screen>
  );
}
