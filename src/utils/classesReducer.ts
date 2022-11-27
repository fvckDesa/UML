import type { ClassesState, ClassesAction } from "@src/types/classesReducer";

export function classesReducer(
  state: ClassesState,
  action: ClassesAction
): ClassesState {
  const { type, payload } = action;
  switch (type) {
    case "class/add": {
      const { id, ...umlClass } = payload;
      return {
        ...state,
        [id]: umlClass,
      };
    }
    case "class/name": {
      const { id, name } = payload;
      return {
        ...state,
        [id]: {
          ...state[id],
          javaClass: {
            ...state[id].javaClass,
            name,
          },
        },
      };
    }
    case "class/remove": {
      const { id } = payload;
      const { [id]: classRemoved, ...otherState } = state;
      return {
        ...otherState,
      };
    }
    case "attribute/add": {
      const { id, attribute } = payload;
      return {
        ...state,
        [id]: {
          ...state[id],
          javaClass: {
            ...state[id].javaClass,
            attributes: state[id].javaClass.attributes.concat(attribute),
          },
        },
      };
    }
    case "attribute/update": {
      const { id, attribute, index } = payload;
      return {
        ...state,
        [id]: {
          ...state[id],
          javaClass: {
            ...state[id].javaClass,
            attributes: state[id].javaClass.attributes.map((attr, i) => {
              if (i === index) return { ...attr, ...attribute };
              return attr;
            }),
          },
        },
      };
    }
    case "attribute/remove": {
      const { id, index } = payload;
      return {
        ...state,
        [id]: {
          ...state[id],
          javaClass: {
            ...state[id].javaClass,
            attributes: state[id].javaClass.attributes.filter(
              (_, i) => i !== index
            ),
          },
        },
      };
    }
    case "method/add": {
      const { id, method } = payload;
      return {
        ...state,
        [id]: {
          ...state[id],
          javaClass: {
            ...state[id].javaClass,
            methods: state[id].javaClass.methods.concat(method),
          },
        },
      };
    }
    case "method/update": {
      const { id, method, index } = payload;
      return {
        ...state,
        [id]: {
          ...state[id],
          javaClass: {
            ...state[id].javaClass,
            methods: state[id].javaClass.methods.map((attr, i) => {
              if (i === index) return { ...attr, ...method };
              return attr;
            }),
          },
        },
      };
    }
    case "method/remove": {
      const { id, index } = payload;
      return {
        ...state,
        [id]: {
          ...state[id],
          javaClass: {
            ...state[id].javaClass,
            methods: state[id].javaClass.methods.filter((_, i) => i !== index),
          },
        },
      };
    }
    case "coords/update": {
      const { id, coords } = payload;
      return {
        ...state,
        [id]: {
          ...state[id],
          coords,
        },
      };
    }
    default: {
      return state;
    }
  }
}
