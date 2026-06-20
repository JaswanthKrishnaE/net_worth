import { create } from "zustand";
import { EntitiesRepository } from "@/repositories/entities.repository";

// Assuming your Entity type matches your schema
export type Entity = {
  id: number;
  name: string;
};

type EntitiesStore = {
  entities: Entity[];
  isLoading: boolean;
  error: string | null;

  loadEntities: () => Promise<void>;
  createEntity: (name: string) => Promise<void>;
  updateEntity: (id: number, name: string) => Promise<void>;
  deleteEntity: (id: number) => Promise<void>;
};

const repo = new EntitiesRepository();

export const useEntitiesStore = create<EntitiesStore>((set, get) => ({
  entities: [],
  isLoading: false,
  error: null,

  loadEntities: async () => {
    set({ isLoading: true, error: null });
    try {
      const entities = await repo.getAll();
      set({ entities: entities as Entity[], isLoading: false });
    } catch (err) {
      set({ error: "Failed to load entities", isLoading: false });
    }
  },

  createEntity: async (name) => {
    set({ isLoading: true });
    try {
      await repo.create(name);
      await get().loadEntities();
    } catch (err) {
      set({ error: "Failed to create entity", isLoading: false });
    }
  },

  updateEntity: async (id, name) => {
    set({ isLoading: true });
    try {
      await repo.update(id, name);
      await get().loadEntities();
    } catch (err) {
      set({ error: "Failed to update entity", isLoading: false });
    }
  },

  deleteEntity: async (id) => {
    set({ isLoading: true });
    try {
      await repo.delete(id);
      await get().loadEntities();
    } catch (err) {
      set({ error: "Failed to delete entity", isLoading: false });
    }
  },
}));