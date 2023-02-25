import { ItemValue, Item, ListItem, isObjectItem, isListGroup } from "./types";

export function getLabel(item: Item): ItemValue {
	return isObjectItem(item) ? item.label : item;
}

export function getValue(item: Item): ItemValue {
	return isObjectItem(item) ? item.value : item;
}

export function filterItems(items: ListItem[], filter: string): Item[] {
	return items
		.reduce<Item[]>(
			(flatItems, item) =>
				flatItems.concat(isListGroup(item) ? item.items : item),
			[]
		)
		.filter((item) =>
			String(isObjectItem(item) ? item.label : item)
				.toLowerCase()
				.includes(filter.toLowerCase())
		);
}

export function flatItems(items: ListItem[]) {
	return items.reduce<Item[]>(
		(list, item) => list.concat(isListGroup(item) ? [...item.items] : item),
		[]
	);
}

export function getItemIndex(items: ListItem[], item: Item): number {
	return flatItems(items).findIndex(
		(flatItem) => getLabel(item) === getLabel(flatItem)
	);
}
