export type ItemValue = number | string;

export interface ItemObject {
  label: string;
  value: ItemValue;
}

export type Item = ItemValue | ItemObject;

export interface ListGroup {
  label: string;
  items: Item[];
}

export type ListItem = ListGroup | Item;

export function isListGroup(item: unknown): item is ListGroup {
	return typeof item === "object" && !!item && "label" in item && "items" in item;
}

export function isObjectItem(item: Item): item is ItemObject {
	return typeof item === "object" && "label" in item && "value" in item;
}
