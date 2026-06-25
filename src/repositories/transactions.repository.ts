
// repositories/transactions.repository.ts
import { db } from "@/db";
import { transactions } from "@/db/schema/transactions.shema";
import { sql } from "drizzle-orm";

export class TransactionsRepository {
  async getAll() {
    return await db.select().from(transactions);
  }

  // Bulk create is efficient for imports
  async bulkCreate(data: typeof transactions.$inferInsert[]) {
    return await db.insert(transactions).values(data);
  }

  // Optional: Get by profile (useful for your transaction list view)
  async getByProfileId(profileId: number) {
    return await db
      .select()
      .from(transactions)
      .where(sql`${transactions.profileId} = ${profileId}`);
  }
}