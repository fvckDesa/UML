// types
import type {
  Ref,
  MouseEvent,
  ChangeEvent,
  FocusEvent,
  ReactElement,
  KeyboardEvent,
} from "react";
import type { ItemValue, ListItem } from "@src/types/optionsList";
// react
import { Children } from "react";
// components
import OptionsList from "@src/components/OptionsList";
// hooks
import { useRef, useState, useLayoutEffect, useMemo } from "react";
// utils
import { filterItems } from "@src/utils/optionsList";
import { useKeydown } from "@src/hooks/useKeydown";

interface IProps {
  options: ListItem[];
  onSelectOption: (value: ItemValue) => void;
  children: ReactElement;
}

function DataList({ options, onSelectOption, children }: IProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const filterOptions = useMemo(
    () => (filter ? filterItems(options, filter) : options),
    [options, filter]
  );

  const handlerKeydown = useKeydown({
    events: {
      Escape: () => setIsOpen(false),
    },
  });

  useLayoutEffect(() => {
    const ref: Ref<HTMLInputElement> = (children as any).ref;
    if (!(inputRef.current instanceof HTMLInputElement)) {
      console.error(
        "DataList Error: The ref is not an HTML input element, check if ref is correctly forward"
      );
      return;
    }
    if (typeof ref === "function") {
      ref(inputRef.current);
    } else if (ref) {
      (ref as any).current = inputRef.current;
    }
  }, [inputRef]);

  function handlerClick(e: MouseEvent<HTMLInputElement>) {
    setFilter(inputRef.current?.value ?? "");
    setIsOpen(true);
  }

  function handlerChange(e: ChangeEvent<HTMLInputElement>) {
    setFilter(e.target.value);
  }

  function handlerFocus(e: FocusEvent<HTMLInputElement>) {
    setFilter(e.target.value);
    setIsOpen(true);
  }

  function handlerBlur(e: FocusEvent<HTMLInputElement>) {
    setIsOpen(e.relatedTarget === null);
  }

  return (
    <>
      {Children.map(children, (Child) => (
        <Child.type
          {...Child.props}
          onClick={(e: MouseEvent<HTMLInputElement>) => {
            Child.props.onClick?.(e);
            handlerClick(e);
          }}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            Child.props.onChange?.(e);
            handlerChange(e);
          }}
          onFocus={(e: FocusEvent<HTMLInputElement>) => {
            Child.props.onFocus?.(e);
            handlerFocus(e);
          }}
          onBlur={(e: FocusEvent<HTMLInputElement>) => {
            Child.props.onBlur?.(e);
            handlerBlur(e);
          }}
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
            Child.props.onKeyDown?.(e);
            handlerKeydown(e);
          }}
          ref={inputRef}
        />
      ))}
      {isOpen && filterOptions.length > 0 && (
        <OptionsList
          items={filterOptions}
          element={inputRef}
          onClose={() => setIsOpen(false)}
          onSelect={(v) => onSelectOption(v)}
        />
      )}
    </>
  );
}

export default DataList;
