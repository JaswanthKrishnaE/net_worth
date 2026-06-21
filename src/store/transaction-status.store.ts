import { create } from "zustand";
import { TransactionStatusRepository } from "@/repositories/transaction-status.repository";

export type TransactionStatus = {
  id: number;
  name: string;
};

type TransactionStatusStore = {
  transactionStatuses: TransactionStatus[];
  isLoading: boolean;
  error: string | null;

  loadTransactionStatuses: () => Promise<void>;
  createTransactionStatus: (name: string) => Promise<void>;
  updateTransactionStatus: (id: number, name: string) => Promise<void>;
  deleteTransactionStatus: (id: number) => Promise<void>;
};

const repo = new TransactionStatusRepository();

export const useTransactionStatusStore = create<TransactionStatusStore>((set, get) => ({
  transactionStatuses: [],
  isLoading: false,
  error: null,

  loadTransactionStatuses: async () => {
    set({ isLoading: true, error: null });
    try {
      const transactionStatuses = await repo.getAll();
      set({ transactionStatuses: transactionStatuses as TransactionStatus[], isLoading: false });
    } catch (err) {
      set({ error: "Failed to load transaction statuses", isLoading: false });
    }
  },

  createTransactionStatus: async (name) => {
    set({ isLoading: true });
    try {
      await repo.create(name);
      await get().loadTransactionStatuses();
    } catch (err) {
      set({ error: "Failed to create transaction status", isLoading: false });
    }
  },

  updateTransactionStatus: async (id, name) => {
    set({ isLoading: true });
    try {
      await repo.update(id, name);
      await get().loadTransactionStatuses();
    } catch (err) {
      set({ error: "Failed to update transaction status", isLoading: false });
    }
  },

  deleteTransactionStatus: async (id) => {
    set({ isLoading: true });
    try {
      await repo.delete(id);
      await get().loadTransactionStatuses();
    } catch (err) {
      set({ error: "Failed to delete transaction status", isLoading: false });
    }
  },
}));