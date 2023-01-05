// components
import ScrollContainer from "@src/ui/ScrollContainer";
// hooks
import { useRedux } from "@src/hooks/useRedux";
// redux
import { setActiveElement } from "@src/features/umlSlice";
import { toggleBar } from "@src/features/editorSlice";

function Layers() {
  const { data, dispatch } = useRedux((state) => ({
    elements: state.uml.elements,
    activeElement: state.uml.activeElement,
  }));

  function handlerClick(id: string) {
    return function () {
      dispatch(setActiveElement(data.activeElement === id ? null : id));
      dispatch(
        toggleBar({ bar: "right", force: !(data.activeElement === id) })
      );
    };
  }

  return (
    <div className="flex flex-col w-full h-full">
      <header className="px-2 py-1 font-semibold border-b-2 border-gray-700">
        Layers
      </header>
      <ScrollContainer className="flex-1">
        {Object.entries(data.elements).map(([id, element]) => (
          <div
            key={id}
            className={`px-4 py-2 border-2 ${
              data.activeElement === id
                ? "border-blue-500 bg-blue-500 text-white"
                : "border-transparent"
            } cursor-pointer hover:border-blue-500`}
            onClick={handlerClick(id)}
          >
            {element.data.name || "Class without name"}
          </div>
        ))}
      </ScrollContainer>
    </div>
  );
}

export default Layers;
