import { create } from "zustand";

interface VolumeMixerStore {
  userVolumes: Record<string, number>; // participantId -> volume (0 to 200%)
  streamVolumes: Record<string, number>; // streamTrackId -> volume (0 to 200%)
  setUserVolume: (participantId: string, volume: number) => void;
  setStreamVolume: (streamTrackId: string, volume: number) => void;
  getUserVolume: (participantId: string) => number;
  getStreamVolume: (streamTrackId: string) => number;
}

export const useVolumeMixer = create<VolumeMixerStore>((set, get) => ({
  userVolumes: {},
  streamVolumes: {},
  setUserVolume: (participantId, volume) =>
    set((state) => ({
      userVolumes: { ...state.userVolumes, [participantId]: volume },
    })),
  setStreamVolume: (streamTrackId, volume) =>
    set((state) => ({
      streamVolumes: { ...state.streamVolumes, [streamTrackId]: volume },
    })),
  getUserVolume: (participantId) => get().userVolumes[participantId] ?? 100,
  getStreamVolume: (streamTrackId) => get().streamVolumes[streamTrackId] ?? 100,
}));
