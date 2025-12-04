import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
}

interface AuthState {
  activationToken: string;
  user: User | null;
  accessToken: string;
}

const initialState: AuthState = {
  activationToken: "",
  user: null,
  accessToken: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userRegistration: (state, action: PayloadAction<{ activationToken: string }>) => {
      state.activationToken = action.payload.activationToken;
    },
    userLoggedIn: (state, action: PayloadAction<{ user: User; accessToken: string }>) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.activationToken = ""; // reset token khi login
    },
    userLoggedOut: (state) => {
      state.user = null;
      state.accessToken = "";
      state.activationToken = "";
    },
  },
});

export const { userRegistration, userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;
