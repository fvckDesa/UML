// types
import { BarsStatus, ClickEvents } from "./types";
import { ElementsKeys } from "@src/data/umlElements";

export function isViewMaximize(bars: BarsStatus): boolean {
  const { right, ...otherBars } = bars;
  return Object.values(otherBars).some((barStatus) => barStatus === false);
}

export function isElementActive(
  clickEvent: ClickEvents,
  element: ElementsKeys
) {
  return clickEvent?.type === "element" && clickEvent.info === element;
}
