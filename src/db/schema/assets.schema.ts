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

export const subClass = sqliteTable(
  "sub_classes",
  {
    id: integer("id")
      .primaryKey({ autoIncrement: true }),

    name: text("name").notNull(),
  }
);