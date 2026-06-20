import * as SQLite from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";

const sqlite = SQLite.openDatabaseSync("investment.db");

console.log("DB OPENED");

export const db = drizzle(sqlite);