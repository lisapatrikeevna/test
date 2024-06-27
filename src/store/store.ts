import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import videoReducer from "./video/videoSlice";

// Configure the Redux store with user and video reducers
export const store = configureStore({
  reducer: {
    user: userReducer, // Reducer to manage user-related state
    video: videoReducer, // Reducer to manage video-related state
  },
});

// Define the RootState type as the return type of the store's getState method
export type RootState = ReturnType<typeof store.getState>;

// Define the AppDispatch type as the dispatch method of the store
export type AppDispatch = typeof store.dispatch;
