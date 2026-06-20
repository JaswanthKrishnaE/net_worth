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

  loadProfiles: () => Promise<void>;

  createProfile: (
    name: string
  ) => Promise<void>;

  updateProfile: (
    id: number,
    name: string
  ) => Promise<void>;

  deleteProfile: (
    id: number
  ) => Promise<void>;

  selectProfile: (
    id: number
  ) => Promise<void>;

  getSelectedProfile: () =>
    Profile | undefined;
};

export const useProfileStore =
  create<ProfileStore>(
    (set, get) => ({
      profiles: [],

      loadProfiles: async () => {
        const profiles =
          await profileRepository.getAll();

        set({
          profiles:
            profiles as Profile[],
        });
      },

      createProfile: async (
        name
      ) => {
        await profileRepository.create(
          name
        );

        await get().loadProfiles();
      },

      updateProfile: async (
        id,
        name
      ) => {
        await profileRepository.update(
          id,
          name
        );

        await get().loadProfiles();
      },

      deleteProfile: async (
        id
      ) => {
        await profileRepository.delete(
          id
        );

        await get().loadProfiles();
      },

      selectProfile: async (
        id
      ) => {
        await profileRepository.setDefault(
          id
        );

        await get().loadProfiles();
      },

      getSelectedProfile: () =>
        get().profiles.find(
          (profile) =>
            profile.isDefault === 1
        ),
    })
  );