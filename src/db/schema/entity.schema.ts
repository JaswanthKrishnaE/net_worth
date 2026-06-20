import {
  integer,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

export const entities = sqliteTable(
  "entities",
  {
    id: integer("id")
      .primaryKey({ autoIncrement: true }),

    name: text("name").notNull(),
  }
);