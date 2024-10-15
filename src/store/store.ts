import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "../redux/usersSlice";
import { usersApi } from "../api/index";

const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    user: usersSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };
