"use client";

import { createSlice, createSelector } from "@reduxjs/toolkit";

import { RootState } from "@app/GlobalRedux/store";

export interface Event {
  id: string;
  videoId: string;
  userId: string;
  title: string;
  description: string;
  views: number;
  likes: number;
  comments: number;
  categories: string[];
}

export interface EventState {
  modal: string | null;
  events: Event[];
}

const initialState: EventState = {
  modal: null,
  events: [],
};

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    setModal: (state, action) => {
      state.modal = action.payload;
    },
    setEvents: (state, action) => {
      state.events = action.payload;
    },
  },
});

export const { setModal, setEvents } = eventSlice.actions;

export const eventReducer = eventSlice.reducer;

export const selectEvents = (state: RootState) => state.events.events;

export const selectEventById = (state: RootState, id: string) =>
  state.events.events.find((event: Event) => event.id === id);

export const selectEventIds = createSelector(selectEvents, (events) =>
  events.map((event: Event) => event.id)
);
