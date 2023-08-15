"use client";

import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  isLoggedIn: boolean;
  id: string | null;
}

const initialState: UserState = {
  isLoggedIn: false,
  id: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserStatus: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setUserId: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const { setUserStatus, setUserId } = userSlice.actions;
export const userReducer = userSlice.reducer;
