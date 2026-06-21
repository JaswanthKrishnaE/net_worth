import { db } from "@/db";
import { assets } from "./schema/assets.schema";
import { entities } from "./schema/entity.schema"; 
import { subClass } from "./schema/assets.schema";
import { brokers } from "./schema/broker.schema";

async function runSeed() {
  await db.transaction(async (tx) => {
    
    // 1. Assets
    await tx.insert(assets).values([
      { id: 1, name: "Equity" },
      { id: 2, name: "Debt" },
      { id: 3, name: "Commodities" },
      { id: 4, name: "Hybrid" }, // Added for Balanced Advantage / Multi-Asset funds
      { id: 5, name: "Others" },
    ]).onConflictDoNothing();

    // 2. Instrument Types
    await tx.insert(entities).values([
      { id: 1, name: "Stock" },
      { id: 2, name: "ETF" },
      { id: 3, name: "Mutual Fund" },
      { id: 4, name: "Provident Fund" },
      { id: 5, name: "Pension" },
      { id: 6, name: "Fixed Income" },
      { id: 7, name: "REIT / InvIT" }, // Real Estate / Infrastructure Trusts
      { id: 8, name: "ULIP" },         // Insurance-linked investments
      { id: 9, name: "Savings / Cash" },// For tracking bank balances
    ]).onConflictDoNothing();

    // 3. Sub-Classes (Expanded & Granular)
    await tx.insert(subClass).values([
      // Equity
      { id: 1, name: "LARGE CAP" },
      { id: 2, name: "MID CAP" },
      { id: 3, name: "SMALL CAP" },
      { id: 4, name: "MULTI CAP" },
      { id: 5, name: "FLEXI CAP" },
      { id: 6, name: "ELSS" },
      { id: 7, name: "SECTORAL / THEMATIC" },
      { id: 8, name: "INDEX" },        // For Nifty 50, Bank Nifty, etc.
      // Debt / Fixed Income
      { id: 9, name: "LIQUID" },
      { id: 10, name: "ULTRA SHORT" },
      { id: 11, name: "CORPORATE BOND" },
      { id: 12, name: "GOVT BOND" },
      { id: 13, name: "GILT" },        // Pure Govt securities
      { id: 14, name: "SOVEREIGN" },   // PPF, EPF, SGB
      // Commodities
      { id: 15, name: "GOLD" },
      { id: 16, name: "SILVER" },
      // Hybrid
      { id: 17, name: "BALANCED" },    // Balanced Advantage / Hybrid
      // NPS Components
      { id: 18, name: "NPS - EQUITY" },
      { id: 19, name: "NPS - CORP BOND" },
      { id: 20, name: "NPS - GOVT BOND" },
    ]).onConflictDoNothing();

    // 4. Brokers & Banks
    await tx.insert(brokers).values([
      { id: 1, name: "Zerodha" },
      { id: 2, name: "FYERS" },
      { id: 3, name: "Groww" },
      { id: 4, name: "HDFC Bank" },
      { id: 5, name: "ICICI Bank" },
      { id: 6, name: "SBI" },
      { id: 7, name: "Axis Bank" },
      { id: 8, name: "Kotak Bank" },
      { id: 9, name: "Direct/Other" },
    ]).onConflictDoNothing();
  });

  console.log("✅ Seed complete. (Skipped existing records).");
}