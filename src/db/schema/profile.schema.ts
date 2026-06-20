import {
  integer,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

export const profiles = sqliteTable(
  "profiles",
  {
    id: integer("id")
      .primaryKey({ autoIncrement: true }),

    name: text("name").notNull(),

    isDefault: integer(
      "is_default"
    )
      .notNull()
      .default(0),

    createdAt: integer(
      "created_at"
    ).notNull(),
  }
);