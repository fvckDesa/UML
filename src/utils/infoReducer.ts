import type { InfoState, InfoAction } from "@src/types/infoReducer";

export function infoReducer(state: InfoState, action: InfoAction): InfoState {
  const { type, payload } = action;
  switch (type) {
    case "activeClass/change": {
      return {
        ...state,
        activeClass: payload.id,
      };
    }
    case "error/change": {
      const { id, error } = payload;
      return {
        ...state,
        errors: {
          ...state.errors,
          [id]: error,
        },
      };
    }
    case "error/remove": {
      const { [payload.id]: _, ...errors } = state.errors;
      return {
        ...state,
        errors,
      };
    }
    case "clickEvent/change": {
      return {
        ...state,
        clickEvent: payload.clickEvent,
      };
    }
    default: {
      return state;
    }
  }
}
