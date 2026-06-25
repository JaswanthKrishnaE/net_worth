import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { brokers } from "./broker.schema";
import { instruments } from "./instruments.schema";
import { profiles } from "./profile.schema";
import { transactionStatus } from "./transaction-status.schema";

export const transactions = sqliteTable("transactions", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  // Linkages (Foreign Keys)
  profileId: integer("profile_id")
    .references(() => profiles.id)
    .notNull(),
  brokerId: integer("broker_id")
    .references(() => brokers.id)
    .notNull(),
  instrumentId: integer("instrument_id")
    .references(() => instruments.id)
    .notNull(),
  statusId: integer("status_id")
    .references(() => transactionStatus.id)
    .notNull(),

  // Data Fields
  date: integer("date").notNull(), // Epoch timestamp
  units: real("units").notNull(), // Quantity (e.g., 10.5 shares)
  pricePerUnit: real("price_per_unit").notNull(), // Execution price
  value: real("value").notNull(), // Total amount (units * price)
  description: text("description"), // Optional notes
});