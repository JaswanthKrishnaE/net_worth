import { create } from "zustand";
import { SubClassRepository } from "@/repositories/subclass.repository";

export type SubClass = {
  id: number;
  name: string;
};

type SubClassStore = {
  subClasses: SubClass[];
  isLoading: boolean;
  error: string | null;

  loadSubClasses: () => Promise<void>;
  createSubClass: (name: string) => Promise<void>;
  updateSubClass: (id: number, name: string) => Promise<void>;
  deleteSubClass: (id: number) => Promise<void>;
};

const repo = new SubClassRepository();

export const useSubClassStore = create<SubClassStore>((set, get) => ({
  subClasses: [],
  isLoading: false,
  error: null,

  loadSubClasses: async () => {
    set({ isLoading: true, error: null });
    try {
      const subClasses = await repo.getAll();
      set({ subClasses, isLoading: false });
    } catch (err) {
      set({ error: "Failed to load sub-classes", isLoading: false });
    }
  },

  createSubClass: async (name) => {
    set({ isLoading: true });
    try {
      await repo.create(name);
      await get().loadSubClasses();
    } catch (err) {
      set({ error: "Failed to create sub-class", isLoading: false });
    }
  },

  updateSubClass: async (id, name) => {
    set({ isLoading: true });
    try {
      await repo.update(id, name);
      await get().loadSubClasses();
    } catch (err) {
      set({ error: "Failed to update sub-class", isLoading: false });
    }
  },

  deleteSubClass: async (id) => {
    set({ isLoading: true });
    try {
      await repo.delete(id);
      await get().loadSubClasses();
    } catch (err) {
      set({ error: "Failed to delete sub-class", isLoading: false });
    }
  },
}));