import {
  integer,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

export const transactionStatus = sqliteTable(
  "transaction_status",
  {
    id: integer("id")
      .primaryKey({ autoIncrement: true }),

    name: text("name").notNull(),
  }
);