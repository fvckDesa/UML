import {
  TypedStartListening,
  createListenerMiddleware,
} from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "@src/app/store";
import { deleteElement } from "@src/features/umlSlice";

export type StartDeleteListening = TypedStartListening<RootState, AppDispatch>;

const deleteListener = createListenerMiddleware();

export const startDeleteListening =
  deleteListener.startListening as StartDeleteListening;

export const deleteMiddleware = deleteListener.middleware;

startDeleteListening({
  actionCreator: deleteElement,
  effect: async (action, listenerApi) => {
    const { elements } = listenerApi.getState().uml;

    for (const [id, element] of Object.entries(elements)) {
      if (
        element.type === "arrow" &&
        (element.layout.from === action.payload ||
          element.layout.to === action.payload)
      ) {
        listenerApi.dispatch(deleteElement(id));
      }
    }
  },
});
