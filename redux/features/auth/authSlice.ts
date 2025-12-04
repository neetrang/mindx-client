import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IUserState {
  accessToken: string;
  user: any; // hoặc định nghĩa type IUser nếu bạn có
}

const initialState: IUserState = {
  accessToken: "",
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userRegistration: (state, action: PayloadAction<{ accessToken: string }>) => {
      state.accessToken = action.payload.accessToken;
    },
    userLoggedIn: (state, action: PayloadAction<{ accessToken: string; user: any }>) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    userLoggedOut: (state) => {
      state.accessToken = "";
      state.user = null;
    },
  },
});

export const { userRegistration, userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;
