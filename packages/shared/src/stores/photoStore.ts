import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface PhotoData {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

export interface PhotoState {
  photo: PhotoData | null;
  hasViewed: boolean;
  lastViewedAt: number | null;
  setPhoto: (photo: PhotoData) => void;
  clearPhoto: () => void;
  resetStore: () => void;
}

const initialState = {
  photo: null,
  hasViewed: false,
  lastViewedAt: null,
};

export const usePhotoStore = create<PhotoState>()(
  persist(
    (set) => ({
      ...initialState,

      setPhoto: (photo: PhotoData) =>
        set({
          photo,
          hasViewed: true,
          lastViewedAt: Date.now(),
        }),

      clearPhoto: () => set({ photo: null }),

      resetStore: () => set(initialState),
    }),
    {
      name: 'photo-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        photo: state.photo,
        hasViewed: state.hasViewed,
        lastViewedAt: state.lastViewedAt,
      }),
    }
  )
);

// Selectors
export const selectPhoto = (state: PhotoState) => state.photo;
export const selectHasViewed = (state: PhotoState) => state.hasViewed;
export const selectLastViewedAt = (state: PhotoState) => state.lastViewedAt;

