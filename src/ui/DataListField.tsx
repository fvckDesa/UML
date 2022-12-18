// types
import type { Ref, MouseEvent, ChangeEvent, FocusEvent } from "react";
import type { ItemValue, ListItem } from "@src/types/optionsList";
// react
import { forwardRef } from "react";
// components
import InputField, { IProps as InputProps } from "./InputField";
import OptionsList from "@src/components/OptionsList";
// hooks
import { useRef, useState, useLayoutEffect, useMemo } from "react";
// utils
import { filterItems } from "@src/utils/optionsList";
import { useKeydown } from "@src/hooks/useKeydown";

interface IProps extends InputProps {
  options: ListItem[];
  onSelectOption: (value: ItemValue) => void;
}

function DataListField(
  {
    options,
    onSelectOption,
    label,
    onClick,
    onChange,
    onFocus,
    onBlur,
    ...inputProps
  }: IProps,
  ref: Ref<HTMLInputElement>
) {
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
    if (typeof ref === "function") {
      ref(inputRef.current);
    } else if (ref) {
      (ref as any).current = inputRef.current;
    }
  }, [inputRef]);

  function handlerClick(e: MouseEvent<HTMLInputElement>) {
    onClick?.(e);
    setFilter(inputRef.current?.value ?? "");
    setIsOpen(true);
  }

  function handlerChange(e: ChangeEvent<HTMLInputElement>) {
    onChange?.(e);
    setFilter(e.target.value);
  }

  function handlerFocus(e: FocusEvent<HTMLInputElement>) {
    onFocus?.(e);
    setFilter(e.target.value);
    setIsOpen(true);
  }

  function handlerBlur(e: FocusEvent<HTMLInputElement>) {
    onBlur?.(e);
    setIsOpen(e.relatedTarget === null);
  }

  return (
    <>
      <InputField
        ref={inputRef}
        label={label}
        onClick={handlerClick}
        onChange={handlerChange}
        onFocus={handlerFocus}
        onBlur={handlerBlur}
        onKeyDown={handlerKeydown}
        {...inputProps}
      />
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

export default forwardRef(DataListField);
