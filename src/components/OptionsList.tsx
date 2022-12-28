// types
import { RefObject } from "react";
import { ListItem, ItemValue, isListGroup, Item } from "@src/types/optionsList";
// components
import ScrollContainer from "@src/ui/ScrollContainer";
// hooks
import { useKeydown } from "@src/hooks/useKeydown";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
// utils
import {
  getLabel,
  getValue,
  flatItems,
  getItemIndex,
} from "@src/utils/optionsList";

export interface IProps {
  items: ListItem[];
  element: RefObject<HTMLElement>;
  onSelect: (value: ItemValue) => void;
  onClose: () => void;
}

function OptionsList({ items, element, onSelect, onClose }: IProps) {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [focusEl, setFocusEl] = useState<number>(-1);
  const listRef = useRef<HTMLDivElement>(null);

  useKeydown({
    target: element.current,
    events: {
      ArrowUp: (e) => {
        e.preventDefault();
        setFocusEl((prev) => Math.max(prev - 1, 0));
      },
      ArrowDown: (e) => {
        e.preventDefault();
        setFocusEl((prev) => Math.min(prev + 1, flatItems(items).length - 1));
      },
      Enter: (e) => {
        e.preventDefault();
        const item = flatItems(items)[focusEl];
        if (!item) return;
        onSelect(getValue(item));
        onClose();
      },
    },
  });

  const positionList = useCallback(() => {
    if (!listRef.current || !element.current) return;

    const { height: bodyHeight } = document.body.getBoundingClientRect();
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

  useLayoutEffect(() => {
    positionList();
    window.addEventListener("resize", positionList);
    const observer = new MutationObserver(positionList);

    observer.observe(document, {
      childList: true,
      subtree: true,
    });

    return () => {
      window.removeEventListener("resize", positionList);
      observer.disconnect();
    };
  }, [positionList]);

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

  function handlerMouseOver(item: Item) {
    return function () {
      setFocusEl(getItemIndex(items, item));
    };
  }

  return (
    <div
      ref={listRef}
      className="fixed border border-gray-400 rounded-lg bg-white shadow-lg select-none overflow-hidden z-10"
      style={position}
      onClick={(e) => e.stopPropagation()}
    >
      <ScrollContainer
        className="min-w-[268px]"
        height={"fit-content"}
        maxHeight={256}
        scrollAbsolute
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
                    className={`flex py-0.5 cursor-pointer ${
                      focusEl === getItemIndex(items, item)
                        ? "bg-blue-500 text-white"
                        : ""
                    }`}
                    onClick={handlerSelect(item)}
                    onMouseOver={handlerMouseOver(item)}
                    ref={(focusItem) => {
                      if (
                        !focusItem ||
                        !listRef.current ||
                        focusEl !== getItemIndex(items, item)
                      )
                        return;
                      const { top: listTop, bottom: listBottom } =
                        listRef.current.getBoundingClientRect();
                      const { top: itemTop, bottom: itemBottom } =
                        focusItem.getBoundingClientRect();

                      if (itemTop >= listTop && itemBottom <= listBottom)
                        return;

                      focusItem.scrollIntoView(itemTop < listTop);
                    }}
                  >
                    <div className="w-6" />
                    <span>{getLabel(item)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div
              key={getLabel(item)}
              data-list-item={true}
              className={`flex py-0.5 cursor-pointer ${
                focusEl === getItemIndex(items, item)
                  ? "bg-blue-500 text-white"
                  : ""
              }`}
              onClick={handlerSelect(item)}
              ref={(focusItem) => {
                if (
                  !focusItem ||
                  !listRef.current ||
                  focusEl !== getItemIndex(items, item)
                )
                  return;
                const { top: listTop, bottom: listBottom } =
                  listRef.current.getBoundingClientRect();
                const { top: itemTop, bottom: itemBottom } =
                  focusItem.getBoundingClientRect();

                if (itemTop >= listTop && itemBottom <= listBottom) return;

                focusItem.scrollIntoView(itemTop < listTop);
              }}
            >
              <div className="w-2" />
              <span>{getLabel(item)}</span>
            </div>
          )
        )}
      </ScrollContainer>
    </div>
  );
}

export default OptionsList;
