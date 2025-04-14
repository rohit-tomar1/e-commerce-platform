import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  status: "idle", // idel | loading | succeeded | failed
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      (state.user = action.payload.user), (state.token = action.payload.token);
    },
    logout: (state) => {
      (state.user = null), (state.token = null);
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
