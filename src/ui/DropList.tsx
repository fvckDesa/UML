// types
import type { ReactNode } from "react";
// components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// hooks
import { useState } from "react";
// icons
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

interface IProps<T> {
  name: string;
  items: T[];
  children: (item: T) => ReactNode;
}

function DropList<T>({ name, items, children }: IProps<T>) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <header
        className="flex items-center gap-2 px-3 py-2 cursor-pointer transition-colors hover:bg-gray-100"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`${
            isOpen ? "rotate-0" : "-rotate-90"
          } transition-all duration-300`}
        />
        <span className="font-semibold">{name}</span>
      </header>
      <ul
        className={`${
          isOpen ? "" : "max-h-[0px]"
        } overflow-hidden transition-all duration-300`}
      >
        {items.map(children)}
      </ul>
    </>
  );
}

export default DropList;
