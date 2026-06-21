// store/transaction-filter.store.ts
import { create } from "zustand";

type FilterStore = {
  selectedAssetId: number | null;
  selectedBrokerId: number | null;
  selectedEntityId: number | null;
  selectedStatusId: number | null;

  setFilter: (key: 'asset' | 'broker' | 'entity' | 'status', id: number | null) => void;
};

export const useTransactionFilterStore = create<FilterStore>((set) => ({
  selectedAssetId: null,
  selectedBrokerId: null,
  selectedEntityId: null,
  selectedStatusId: null,

  setFilter: (key, id) => set((state) => ({ 
    ...state, 
    [`selected${key.charAt(0).toUpperCase() + key.slice(1)}Id`]: id 
  })),
}));