import { db } from "@/db";
import { transactionStatus } from "@/db/schema/transaction-status.schema";
import { eq } from "drizzle-orm";

export class TransactionStatusRepository {
  async getAll() {
    return db.select().from(transactionStatus);
  }

  async create(name: string) {
    const result = await db
      .insert(transactionStatus)
      .values({ name })
      .returning(); // IMPORTANT

    return result[0]; // or result?.[0]
  }

  async update(id: number, name: string) {
    await db.update(transactionStatus)
      .set({ name })
      .where(eq(transactionStatus.id, id));
  }

  async delete(id: number) {
    await db.delete(transactionStatus).where(eq(transactionStatus.id, id));
  }
}