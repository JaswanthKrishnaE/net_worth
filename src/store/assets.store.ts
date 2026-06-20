import { create } from "zustand";
import { AssetsRepository } from "@/repositories/assets.repository";

export type Assets = {
  id: number;
  name: string;
};

type AssetsStore = {
  assets: Assets[];

  loadAssets: () => Promise<void>;
  createAsset: (name: string) => Promise<void>;
  updateAsset: (id: number, name: string) => Promise<void>;
  deleteAsset: (id: number) => Promise<void>;
};

const repo = new AssetsRepository();

export const useAssetsStore = create<AssetsStore>((set, get) => ({
  assets: [],

  loadAssets: async () => {
    const assets = await repo.getAll();
    set({ assets });
  },

  createAsset: async (name) => {
    await repo.create(name);
    await get().loadAssets();
  },

  updateAsset: async (id, name) => {
    await repo.update(id, name);
    await get().loadAssets();
  },

  deleteAsset: async (id) => {
    await repo.delete(id);
    await get().loadAssets();
  },
}));