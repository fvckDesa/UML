import {
  ItemValue,
  Item,
  ListItem,
  isObjectItem,
  isListGroup,
} from "@src/types/optionsList";

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
