import { IAuthUser, IToken } from "./../../types/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface UserState {
  user: IAuthUser | null;
  isAuth: boolean;
  token: IToken
  //TODO - для тестирования сервера ресурсов
  hello: string;
  //TODO

}


const initialState: UserState = {
  user: null,
  isAuth: false,
  hello: '',
  token: {
    accessToken: null,
    accessTokenExpiry: null,
  }
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<IAuthUser>) => {
      state.user = action.payload;
      state.token.accessToken = action.payload.token;
      state.token.accessTokenExpiry = action.payload.tokenExpiry;

      state.isAuth = true;
    },
    logout: (state) => {
      state.isAuth = false;
      state.user = null;
      state.token.accessToken = null;
      state.token.accessTokenExpiry = null;
    },

    setHello: (state, action: PayloadAction<string>) => {
      state.hello = action.payload;
    }

  },
});

export const { login, logout, setHello } = userSlice.actions;

export const selectCount = (state: RootState) => state.user;
export const selectToken = (state: RootState) => state.user.token;

export const selectUsername = (state: RootState) => state.user.user?.username;
export default userSlice.reducer;
