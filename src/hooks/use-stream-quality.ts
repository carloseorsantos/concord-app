import { create } from "zustand";
import { StreamQualityPreset } from "@/lib/livekit-config";

interface StreamQualityStore {
  preset: StreamQualityPreset;
  setPreset: (preset: StreamQualityPreset) => void;
  cinemaMode: boolean;
  setCinemaMode: (enabled: boolean) => void;
  toggleCinemaMode: () => void;
  isPipActive: boolean;
  setIsPipActive: (active: boolean) => void;
}

export const useStreamQuality = create<StreamQualityStore>((set) => ({
  preset: "1080p60",
  setPreset: (preset) => set({ preset }),
  cinemaMode: false,
  setCinemaMode: (cinemaMode) => set({ cinemaMode }),
  toggleCinemaMode: () => set((state) => ({ cinemaMode: !state.cinemaMode })),
  isPipActive: false,
  setIsPipActive: (isPipActive) => set({ isPipActive }),
}));
