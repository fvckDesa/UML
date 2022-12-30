// hooks
import { useRedux } from "@src/hooks/useRedux";
// redux
import { setActiveElement } from "@src/features/umlSlice";

function SidebarElements() {
  const { data, dispatch } = useRedux((state) => ({
    elements: state.uml.elements,
    activeElement: state.uml.activeElement,
  }));

  function handlerClick(id: string) {
    dispatch(setActiveElement(data.activeElement === id ? null : id));
  }

  return (
    <>
      {Object.entries(data.elements).map(([id, element]) => (
        <div
          key={id}
          className={`px-4 py-2 border-2 ${
            data.activeElement === id
              ? "border-blue-500 bg-blue-500 text-white"
              : "border-transparent"
          } cursor-pointer hover:border-blue-500`}
          onClick={() => handlerClick(id)}
        >
          {element.data.name}
        </div>
      ))}
    </>
  );
}

export default SidebarElements;
