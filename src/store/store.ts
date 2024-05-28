import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import videoReducer from "./video/videoSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    video: videoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
