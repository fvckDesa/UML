import { useUMLContext } from "@src/contexts/UML";
import DropList from "@src/ui/DropList";
import Element from "@src/ui/Element";

function SidebarElements() {
  const { umlClasses, umlArrows, umlInfo, dispatchInfo } = useUMLContext();

  function handlerClick(id: string) {
    dispatchInfo({
      type: "activeClass/change",
      payload: { id: umlInfo.activeClass === id ? "" : id },
    });
  }

  return (
    <div className="pb-6">
      <DropList
        name="Classes"
        items={Object.entries(umlClasses).map(([id, umlClass]) => ({
          id,
          javaClass: umlClass.javaClass,
        }))}
      >
        {({ id, javaClass }) => (
          <Element
            key={id}
            active={umlInfo.activeClass === id}
            onClick={handlerClick.bind(null, id)}
          >
            {javaClass.name}
          </Element>
        )}
      </DropList>
      <DropList
        name="Arrows"
        items={Object.entries(umlArrows.arrows).map(([id, arrow]) => ({
          id,
          arrow,
        }))}
      >
        {({ id, arrow }) => <Element key={id}>{arrow.relationship}</Element>}
      </DropList>
    </div>
  );
}

export default SidebarElements;
