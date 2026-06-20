import { db } from "@/db";
import { profiles } from "@/db/schema/profile.schema";
import { eq } from "drizzle-orm";

export class ProfileRepository {
  async getAll() {
    return db.select().from(profiles);
  }

  async getDefaultProfile() {
    const result = await db
      .select()
      .from(profiles)
      .where(eq(profiles.isDefault, 1));

    return result[0];
  }

  async create(name: string) {
    const existing =
      await this.getAll();

    await db.insert(profiles).values({
      name,
      isDefault:
        existing.length === 0 ? 1 : 0,
      createdAt: Date.now(),
    });
  }

  async update(
    id: number,
    name: string
  ) {
    await db
      .update(profiles)
      .set({ name })
      .where(eq(profiles.id, id));
  }

  async setDefault(
    id: number
  ) {
    await db
      .update(profiles)
      .set({
        isDefault: 0,
      });

    await db
      .update(profiles)
      .set({
        isDefault: 1,
      })
      .where(eq(profiles.id, id));
  }

  async delete(id: number) {
    const allProfiles =
      await this.getAll();

    const deletingProfile =
      allProfiles.find(
        (p) => p.id === id
      );

    await db
      .delete(profiles)
      .where(eq(profiles.id, id));

    if (
      deletingProfile?.isDefault ===
      1
    ) {
      const remaining =
        await this.getAll();

      if (
        remaining.length > 0
      ) {
        await this.setDefault(
          remaining[0].id
        );
      }
    }
  }
}

export const profileRepository =
  new ProfileRepository();