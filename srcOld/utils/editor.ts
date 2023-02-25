// types
import { BarsStatus } from "@src/types/editor";

export function isViewMaximize(bars: BarsStatus): boolean {
  const { right, ...otherBars } = bars;
  return Object.values(otherBars).some((barStatus) => barStatus === false);
}
