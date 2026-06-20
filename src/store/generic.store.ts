import { create } from "zustand";

type BaseItem = {
  id: number;
  name: string;
};

type CrudStore<T> = {
  items: T[];

  load: () => Promise<void>;
  create: (name: string) => Promise<void>;
  update: (id: number, name: string) => Promise<void>;
  remove: (id: number) => Promise<void>;
};

export function createCrudStore<T extends BaseItem>(
  repository: {
    getAll: () => Promise<T[]>;
    create: (name: string) => Promise<T | void>;
    update: (id: number, name: string) => Promise<void>;
    delete: (id: number) => Promise<void>;
  }
) {
  return create<CrudStore<T>>((set, get) => ({
    items: [],

    load: async () => {
      const data = await repository.getAll();
      set({ items: data });
    },

    create: async (name: string) => {
      await repository.create(name);
      await get().load();
    },

    update: async (id: number, name: string) => {
      await repository.update(id, name);
      await get().load();
    },

    remove: async (id: number) => {
      await repository.delete(id);
      await get().load();
    },
  }));
}