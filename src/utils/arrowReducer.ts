import type { ArrowState, ArrowActions } from "@src/types/arrowReducer";

export function arrowReducer(
  state: ArrowState,
  action: ArrowActions
): ArrowState {
  const { type, payload } = action;
  switch (type) {
    case "arrow/add": {
      const { id, arrow } = payload;
      return {
        ...state,
        arrows: {
          ...state.arrows,
          [id]: arrow,
        },
      };
    }
    case "arrow/update": {
      const { id, arrow } = payload;
      return {
        ...state,
        arrows: {
          ...state.arrows,
          [id]: {
            ...state.arrows[id],
            ...arrow,
          },
        },
      };
    }
    case "arrow/remove": {
      const { [payload.id]: _, ...restArrows } = state.arrows;
      return {
        ...state,
        arrows: restArrows,
      };
    }
    case "arrow/new": {
      return {
        ...state,
        newArrow: payload.node,
      };
    }
    case "arrow/cancel": {
      return {
        ...state,
        newArrow: null,
      };
    }
    default: {
      return state;
    }
  }
}
