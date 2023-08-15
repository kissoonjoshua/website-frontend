"use client";

import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./Features/Users/userSlice";
import { eventReducer } from "./Features/Events/eventSlice";
import { videoControlsReducer } from "./Features/VideoControls/videoControlsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    events: eventReducer,
    videoControls: videoControlsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
