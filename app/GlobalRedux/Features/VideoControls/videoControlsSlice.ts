"use client";

import { createSlice } from "@reduxjs/toolkit";

export interface VideoControlsState {
  playback: boolean;
  current: string | null;
  muted: boolean;
  volume: number;
}

const initialState: VideoControlsState = {
  playback: true,
  current: null,
  muted: true,
  volume: 0.65,
};

export const videoControlsSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    setMuted: (state, action) => {
      state.muted = action.payload;
    },
    toggleMuted: (state) => {
      state.muted = !state.muted;
    },
    setVolume: (state, action) => {
      state.volume = action.payload;
    },
    togglePlayback: (state) => {
      state.playback = !state.playback;
    },
    setCurrent: (state, action) => {
      state.current = action.payload;
      state.playback = true;
    },
  },
});

export const { setMuted, toggleMuted, setVolume, togglePlayback, setCurrent } =
  videoControlsSlice.actions;
export const videoControlsReducer = videoControlsSlice.reducer;
