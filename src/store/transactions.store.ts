// store/transactions.store.ts
import { create } from "zustand";
import { TransactionsRepository } from "@/repositories/transactions.repository";
import { transactions } from "@/db/schema/transactions.shema";

type TransactionsStore = {
  transactions: (typeof transactions.$inferSelect)[];
  isLoading: boolean;
  error: string | null;

  loadTransactions: () => Promise<void>;
  // We use this to trigger the full import workflow
  importBulkTransactions: (data: (typeof transactions.$inferInsert)[]) => Promise<void>;
};

const repo = new TransactionsRepository();

export const useTransactionsStore = create<TransactionsStore>((set, get) => ({
  transactions: [],
  isLoading: false,
  error: null,

  loadTransactions: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await repo.getAll();
      set({ transactions: data, isLoading: false });
    } catch (err) {
      set({ error: "Failed to load transactions", isLoading: false });
    }
  },

  importBulkTransactions: async (data) => {
    set({ isLoading: true, error: null });
    try {
      await repo.bulkCreate(data);
      await get().loadTransactions(); // Refresh list after import
    } catch (err) {
      set({ error: "Failed to import transactions", isLoading: false });
      throw err; // Propagate error so the component knows it failed
    }
  },
}));