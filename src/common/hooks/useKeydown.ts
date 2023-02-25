import {
	KeyboardEvent as ReactKeyboardEvent,
	useCallback,
	useEffect,
} from "react";

type Target = Window | Document | Element | null;

type Event = KeyboardEvent | ReactKeyboardEvent;

type KeyboardListener = (e: Event) => void;

type KeyEvents = Record<string, KeyboardListener>;

interface IProps {
  target?: Target;
  events: KeyEvents;
}

const PROTECTED_ELEMENTS = [HTMLInputElement, HTMLTextAreaElement];

export function useKeydown({ target, events }: IProps): KeyboardListener {
	const handlerKeydown = useCallback(
		(e: Event) => {
			// not trigger key events when write in input, textarea, ecc..
			if (
				!(e.key in events) ||
        (!PROTECTED_ELEMENTS.some((el) => e.currentTarget instanceof el) &&
          PROTECTED_ELEMENTS.some((el) => e.target instanceof el))
			)
				return;

			if ("beforeEach" in events) {
				events.beforeEach(e);
			}
			events[e.key](e);
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
