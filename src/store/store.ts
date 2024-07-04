import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import videoReducer from "./video/videoSlice";
import validationReducer from "./sendValidationRequest"; // Импортируем редуктор правильно

// Configure the Redux store with user, video and validation reducers
export const store = configureStore({
  reducer: {
    user: userReducer, // Reducer to manage user-related state
    video: videoReducer,
    validation: validationReducer,
  },
});

// Define the RootState type as the return type of the store's getState method
export type RootState = ReturnType<typeof store.getState>;

// Define the AppDispatch type as the dispatch method of the store
export type AppDispatch = typeof store.dispatch;