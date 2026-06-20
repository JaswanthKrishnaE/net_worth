import { db } from "@/db";
import { entities } from "@/db/schema/entity.schema";
import { eq } from "drizzle-orm";

export class EntitiesRepository {
  async getAll() {
    return db.select().from(entities);
  }

  async create(name: string) {
    const result = await db
      .insert(entities)
      .values({ name })
      .returning(); // IMPORTANT

    return result[0]; // or result?.[0]
  }

  async update(id: number, name: string) {
    await db.update(entities)
      .set({ name })
      .where(eq(entities.id, id));
  }

  async delete(id: number) {
    await db.delete(entities).where(eq(entities.id, id));
  }
}