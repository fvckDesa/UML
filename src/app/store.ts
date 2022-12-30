import { configureStore } from "@reduxjs/toolkit";
import elementsSlice from "@src/features/umlSlice";

const store = configureStore({
  reducer: {
    uml: elementsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
