// type
import type { Coords } from "@src/types/general";
// components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// icons
import { faWindowMaximize } from "@fortawesome/free-solid-svg-icons";
import { useUMLContext } from "@src/contexts/UML";
// uuid
import { v4 as uuid } from "uuid";

interface IProps {
  centerCoords?: Coords;
}

function TopBar({ centerCoords = { x: 0, y: 0 } }: IProps) {
  const { umlClasses, dispatchClasses, dispatchInfo } = useUMLContext();

  function handlerAddClass() {
    const id = uuid();
    dispatchClasses({
      type: "class/add",
      payload: {
        javaClass: {
          name: `Class${Object.keys(umlClasses).length + 1}`,
          attributes: [],
          methods: [],
        },
        coords: {
          x: centerCoords.x - 100,
          y: centerCoords.y - 75,
        },
        id,
      },
    });

    dispatchInfo({ type: "activeClass/change", payload: { id } });
  }

  return (
    <header className="flex items-center w-full h-12 p-2 border-b-2 border-gray-600">
      <button className="btnAction w-8 h-8" onClick={handlerAddClass}>
        <FontAwesomeIcon icon={faWindowMaximize} />
      </button>
    </header>
  );
}

export default TopBar;
