// repositories/instruments.repository.ts
import { db } from "@/db";
import { instruments } from "@/db/schema/instruments.schema";
import { eq } from "drizzle-orm";

export class InstrumentsRepository {
  // Find by Symbol (e.g., when parsing a broker CSV)
  async findBySymbol(symbol: string) {
    const result = await db
      .select()
      .from(instruments)
      .where(eq(instruments.symbol, symbol));
    return result[0];
  }

  // Find all instruments of a specific asset type (e.g., "Find all Mutual Funds")
  async getByAssetId(assetId: number) {
    return await db
      .select()
      .from(instruments)
      .where(eq(instruments.assetId, assetId));
  }

  // Add new instrument
  async create(data: typeof instruments.$inferInsert) {
    return await db.insert(instruments).values(data);
  }

  // Update metadata (for when you discover new info about an instrument)
  async updateMetadata(id: number, meta: Record<string, any>) {
    return await db
      .update(instruments)
      .set({ metadata: meta })
      .where(eq(instruments.id, id));
  }
}
