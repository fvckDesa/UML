const RIGHT_BAR_WIDTH = 320;

export const PAGES = ["data", "layout"] as const;
export const PageWidth = RIGHT_BAR_WIDTH / PAGES.length;

export type Pages = typeof PAGES[number];
