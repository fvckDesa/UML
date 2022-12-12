import { useCallback, useEffect } from "react";

type Target = Window | Document | Element;

type EventFn = (e: KeyboardEvent) => void;

type KeyEvents = Record<string, EventFn>;

interface IProps {
  target?: Target;
  events: KeyEvents;
}

export function useKeydown({ target, events }: IProps): EventFn {
  const handlerKeydown = useCallback(
    (e: KeyboardEvent) => {
      // not trigger key events when write in input, textarea, ecc..
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLDataListElement ||
        (e.target instanceof HTMLElement && e.target.isContentEditable)
      )
        return;

      events?.beforeAll(e);
      if (e.key in events) {
        events[e.key](e);
      }
    },
    [events]
  );

  useEffect(() => {
    if (!target) return;

    target.addEventListener("keydown", handlerKeydown as EventListener);

    return () => {
      target.removeEventListener("keydown", handlerKeydown as EventListener);
    };
  }, [target, handlerKeydown]);

  return handlerKeydown;
}
