import { db } from "@/db";
import { assets } from "@/db/schema/assets.schema";
import { eq } from "drizzle-orm";

export class AssetsRepository {
  async getAll() {
    return db.select().from(assets);
  }

  async create(name: string) {
    const result = await db
      .insert(assets)
      .values({ name })
      .returning(); // IMPORTANT

    return result[0]; // or result?.[0]
  }

  async update(id: number, name: string) {
    await db.update(assets)
      .set({ name })
      .where(eq(assets.id, id));
  }

  async delete(id: number) {
    await db.delete(assets).where(eq(assets.id, id));
  }
}