import { configureStore } from "@reduxjs/toolkit";
import umlSlice from "@src/features/umlSlice";
import editorSlice from "@src/features/editorSlice";

const store = configureStore({
  reducer: {
    uml: umlSlice,
    editor: editorSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
