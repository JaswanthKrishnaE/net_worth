import { create } from "zustand";
import { AssetsRepository } from "@/repositories/assets.repository";

export type Assets = {
  id: number;
  name: string;
};

type AssetsStore = {
  assets: Assets[];
  isLoading: boolean;
  error: string | null;

  loadAssets: () => Promise<void>;
  createAsset: (name: string) => Promise<void>;
  updateAsset: (id: number, name: string) => Promise<void>;
  deleteAsset: (id: number) => Promise<void>;
};

const repo = new AssetsRepository();

export const useAssetsStore = create<AssetsStore>((set, get) => ({
  assets: [],
  isLoading: false, // Default to false, set to true during fetch
  error: null,

  loadAssets: async () => {
    set({ isLoading: true, error: null });
    try {
      const assets = await repo.getAll();
      set({ assets, isLoading: false });
    } catch (err) {
      set({ error: "Failed to load assets", isLoading: false });
    }
  },

  createAsset: async (name) => {
    set({ isLoading: true });
    try {
      await repo.create(name);
      await get().loadAssets(); // This calls loadAssets which handles the 'set'
    } catch (err) {
      set({ error: "Failed to create asset", isLoading: false });
    }
  },

  updateAsset: async (id, name) => {
    set({ isLoading: true });
    try {
      await repo.update(id, name);
      await get().loadAssets();
    } catch (err) {
      set({ error: "Failed to update asset", isLoading: false });
    }
  },

  deleteAsset: async (id) => {
    set({ isLoading: true });
    try {
      await repo.delete(id);
      await get().loadAssets();
    } catch (err) {
      set({ error: "Failed to delete asset", isLoading: false });
    }
  },
}));