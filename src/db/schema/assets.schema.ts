import {
  integer,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

export const assets = sqliteTable(
  "assets",
  {
    id: integer("id")
      .primaryKey({ autoIncrement: true }),

    name: text("name").notNull(),
  }
);