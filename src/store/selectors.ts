import {RootState} from "./store.ts";

export const currentUserId = (state: RootState) => state.user.user?.userId