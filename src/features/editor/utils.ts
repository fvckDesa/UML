// types
import { BarsStatus, ClickEvents } from "./types";
import { ElementsKeys } from "@src/data/umlElements";

export function isViewMaximize(bars: BarsStatus): boolean {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { right, ...otherBars } = bars;
	return Object.values(otherBars).some((barStatus) => barStatus === false);
}

export function isElementActive(
	clickEvent: ClickEvents,
	element: ElementsKeys
) {
	return clickEvent?.type === "element" && clickEvent.info === element;
}
