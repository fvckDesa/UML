import { configureStore } from "@reduxjs/toolkit";
// slices
import umlSlice from "@src/features/umlSlice";
import editorSlice from "@src/features/editorSlice";
// middlewares
import { deleteMiddleware } from "@src/middlewares/deleteMiddleware";

const store = configureStore({
  reducer: {
    uml: umlSlice,
    editor: editorSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(deleteMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
