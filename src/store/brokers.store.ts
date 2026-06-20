import { create } from "zustand";
import { BrokersRepository } from "@/repositories/brokers.repository";

// Assuming your Broker type matches your schema
export type Broker = {
  id: number;
  name: string;
};

type BrokersStore = {
  brokers: Broker[];
  isLoading: boolean;
  error: string | null;

  loadBrokers: () => Promise<void>;
  createBroker: (name: string) => Promise<void>;
  updateBroker: (id: number, name: string) => Promise<void>;
  deleteBroker: (id: number) => Promise<void>;
};

const repo = new BrokersRepository();

export const useBrokersStore = create<BrokersStore>((set, get) => ({
  brokers: [],
  isLoading: false,
  error: null,

  loadBrokers: async () => {
    set({ isLoading: true, error: null });
    try {
      const brokers = await repo.getAll();
      set({ brokers: brokers as Broker[], isLoading: false });
    } catch (err) {
      set({ error: "Failed to load brokers", isLoading: false });
    }
  },

  createBroker: async (name) => {
    set({ isLoading: true });
    try {
      await repo.create(name);
      await get().loadBrokers();
    } catch (err) {
      set({ error: "Failed to create broker", isLoading: false });
    }
  },

  updateBroker: async (id, name) => {
    set({ isLoading: true });
    try {
      await repo.update(id, name);
      await get().loadBrokers();
    } catch (err) {
      set({ error: "Failed to update broker", isLoading: false });
    }
  },

  deleteBroker: async (id) => {
    set({ isLoading: true });
    try {
      await repo.delete(id);
      await get().loadBrokers();
    } catch (err) {
      set({ error: "Failed to delete broker", isLoading: false });
    }
  },
}));