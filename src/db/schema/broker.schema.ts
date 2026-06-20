import {
  integer,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

export const brokers = sqliteTable(
  "brokers",
  {
    id: integer("id")
      .primaryKey({ autoIncrement: true }),

    name: text("name").notNull(),
  }
);