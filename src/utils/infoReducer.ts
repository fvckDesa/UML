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
    default: {
      return state;
    }
  }
}
