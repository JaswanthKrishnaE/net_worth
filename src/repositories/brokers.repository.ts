import { db } from "@/db";
import { brokers } from "@/db/schema/broker.schema";
import { eq } from "drizzle-orm";

export class BrokersRepository {
  async getAll() {
    return db.select().from(brokers);
  }

  async create(name: string) {
    const result = await db
      .insert(brokers)
      .values({ name })
      .returning(); // IMPORTANT

    return result[0]; // or result?.[0]
  }

  async update(id: number, name: string) {
    await db.update(brokers)
      .set({ name })
      .where(eq(brokers.id, id));
  }

  async delete(id: number) {
    await db.delete(brokers).where(eq(brokers.id, id));
  }
}