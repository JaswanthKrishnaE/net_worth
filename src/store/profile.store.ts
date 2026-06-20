import { create } from "zustand";
import { profileRepository } from "@/repositories/profile.repository";

export type Profile = {
  id: number;
  name: string;
  isDefault: number;
  createdAt: number;
};

type ProfileStore = {
  profiles: Profile[];
  isLoading: boolean; // 1. Added loading type

  loadProfiles: () => Promise<void>;
  createProfile: (name: string) => Promise<void>;
  updateProfile: (id: number, name: string) => Promise<void>;
  deleteProfile: (id: number) => Promise<void>;
  selectProfile: (id: number) => Promise<void>;
  getSelectedProfile: () => Profile | undefined;
};

export const useProfileStore = create<ProfileStore>((set, get) => ({
  profiles: [],
  isLoading: true, // 2. Start as true so the app knows we are fetching

  loadProfiles: async () => {
    set({ isLoading: true }); // Start loading
    try {
      const profiles = await profileRepository.getAll();
      set({ 
        profiles: profiles as Profile[], 
        isLoading: false // Loading finished
      });
    } catch (error) {
      console.error("Failed to load profiles:", error);
      set({ isLoading: false }); // Ensure loading stops even if it fails
    }
  },

  createProfile: async (name) => {
    // Optional: You could set isLoading: true here if you want a loading spinner on the app during creation
    await profileRepository.create(name);
    await get().loadProfiles();
  },

  updateProfile: async (id, name) => {
    await profileRepository.update(id, name);
    await get().loadProfiles();
  },

  deleteProfile: async (id) => {
    await profileRepository.delete(id);
    await get().loadProfiles();
  },

  selectProfile: async (id) => {
    await profileRepository.setDefault(id);
    await get().loadProfiles();
  },

  getSelectedProfile: () =>
    get().profiles.find((profile) => profile.isDefault === 1),
}));