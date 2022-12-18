import { RefObject, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ListItem, ItemValue, isListGroup, Item } from "@src/types/optionsList";
import { getLabel, getValue } from "@src/utils/optionsList";

export interface IProps {
  items: ListItem[];
  element: RefObject<HTMLElement>;
  onSelect: (value: ItemValue) => void;
  onClose: () => void;
}

function OptionsList({ items, element, onSelect, onClose }: IProps) {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const listRef = useRef<HTMLUListElement>(null);

  useLayoutEffect(() => {
    if (!listRef.current || !element.current) return;

    const { width: bodyWidth, height: bodyHeight } =
      document.body.getBoundingClientRect();
    const {
      width: elementWidth,
      top: elementTop,
      bottom: elementBottom,
      left: elementLeft,
    } = element.current.getBoundingClientRect();
    const { width, height } = listRef.current.getBoundingClientRect();

    setPosition({
      top:
        elementBottom + height > bodyHeight
          ? elementTop - height
          : elementBottom,
      left: elementLeft - width / 2 + elementWidth / 2,
    });
  }, [items, element, listRef]);

  useEffect(() => {
    function close(e: MouseEvent) {
      if (
        e.target instanceof HTMLElement &&
        e.target !== element.current &&
        !listRef.current?.contains(e.target)
      )
        onClose();
    }
    window.addEventListener("click", close, true);
    return () => {
      window.removeEventListener("click", close, true);
    };
  }, [element, listRef]);

  function handlerSelect(item: Item) {
    return function () {
      onSelect(getValue(item));
      onClose();
    };
  }

  return (
    <ul
      ref={listRef}
      className="fixed max-h-64 min-w-[268px] border border-gray-400 rounded-lg bg-white overflow-x-hidden overflow-y-auto shadow-lg select-none"
      style={{ width: element.current?.clientWidth, ...position }}
      onClick={(e) => e.stopPropagation()}
    >
      {items.map((item) =>
        isListGroup(item) ? (
          <div key={item.label}>
            <h1 className="px-2 py-1 font-bold">{item.label}</h1>
            <ul>
              {item.items.map((item) => (
                <li
                  key={getLabel(item)}
                  data-list-item={true}
                  className="flex py-0.5 cursor-pointer hover:bg-blue-500 hover:text-white"
                  onClick={handlerSelect(item)}
                >
                  <div className="w-6" />
                  <span>{getLabel(item)}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <li
            key={getLabel(item)}
            data-list-item={true}
            className="flex cursor-pointer hover:bg-blue-500 hover:text-white first:pt-1 last:pb-1"
            onClick={handlerSelect(item)}
          >
            <div className="w-2" />
            <span>{getLabel(item)}</span>
          </li>
        )
      )}
    </ul>
  );
}

export default OptionsList;
