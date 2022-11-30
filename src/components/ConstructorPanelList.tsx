// types
import type { Constructor } from "@src/types/class";
// components;
import PanelList from "./PanelList";
import ConstructorModal from "./ConstructorModal";
// utils
import { stringifyConstructor } from "@src/utils/class";
import { useUMLContext } from "@src/contexts/UML";

interface IProps {
  constructors: Constructor[];
  classId: string;
}

function ConstructorPanelList({ constructors, classId }: IProps) {
  const { dispatchClasses } = useUMLContext();

  function handlerCreate(data: Constructor) {
    dispatchClasses({
      type: "constructor/add",
      payload: { id: classId, constructor: data },
    });
  }

  function handlerUpdate(data: Constructor, index: number) {
    dispatchClasses({
      type: "constructor/update",
      payload: { id: classId, constructor: data, index },
    });
  }

  function handlerRemove(index: number) {
    dispatchClasses({
      type: "constructor/remove",
      payload: { id: classId, index },
    });
  }

  return (
    <PanelList<Constructor>
      name="Constructors"
      listData={constructors}
      ModalComponent={ConstructorModal}
      formatData={stringifyConstructor}
      onCreate={handlerCreate}
      onUpdate={handlerUpdate}
      onRemove={handlerRemove}
    />
  );
}

export default ConstructorPanelList;
