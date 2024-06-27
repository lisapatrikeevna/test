import { IAuthUser, IToken } from "./../../types/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define the state interface for user-related data
interface UserState {
  user: IAuthUser | null; // User data or null if not authenticated
  isAuth: boolean; // Authentication status
  token: IToken; // Token data
  hello: string; // Additional state for testing purposes
}

// Define the initial state for user-related data
const initialState: UserState = {
  user: null,
  isAuth: false,
  hello: '',
  token: {
    accessToken: null,
    accessTokenExpiry: null,
  }
};

// Create a slice of the state for user-related actions and reducers
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Reducer to handle user login
    login: (state, action: PayloadAction<IAuthUser>) => {
      state.user = action.payload;
      state.token.accessToken = action.payload.token;
      state.token.accessTokenExpiry = action.payload.tokenExpiry;
      state.isAuth = true;
      state.user.userId = action.payload.userId;
    },
    // Reducer to handle user logout
    logout: (state) => {
      state.isAuth = false;
      state.user = null;
      state.token.accessToken = null;
      state.token.accessTokenExpiry = null;
    },
    // Reducer to set the hello state for testing
    setHello: (state, action: PayloadAction<string>) => {
      state.hello = action.payload;
    }
  },
});

// Export the actions generated by createSlice
export const { login, logout, setHello } = userSlice.actions;

// Selectors to access specific parts of the user state
export const selectCount = (state: RootState) => state.user;
export const selectToken = (state: RootState) => state.user.token;
export const selectUsername = (state: RootState) => state.user.user?.username;

// Export the reducer to be included in the store
export default userSlice.reducer;
