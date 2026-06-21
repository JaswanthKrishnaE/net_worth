import { db } from "@/db";
import { subClass } from "@/db/schema/assets.schema";
import { eq } from "drizzle-orm";

export class SubClassRepository {
  async getAll() {
    return db.select().from(subClass);
  }

  async create(name: string) {
    const result = await db.insert(subClass).values({ name }).returning();
    return result[0];
  }

  async update(id: number, name: string) {
    await db.update(subClass).set({ name }).where(eq(subClass.id, id));
  }

  async delete(id: number) {
    await db.delete(subClass).where(eq(subClass.id, id));
  }
}
