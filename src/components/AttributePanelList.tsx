// types
import type { Attribute } from "@src/types/class";
// components
import PanelList from "./PanelList";
import AttributeModal from "./AttributeModal";
// utils
import { stringifyAttribute } from "@src/utils/class";
import { useUMLContext } from "@src/contexts/UML";

interface IProps {
  attributes: Attribute[];
  classId: string;
}

function AttributePanelList({ attributes, classId }: IProps) {
  const { dispatchClasses } = useUMLContext();

  function handlerCreate(data: Attribute) {
    dispatchClasses({
      type: "attribute/add",
      payload: { id: classId, attribute: data },
    });
  }

  function handlerUpdate(data: Attribute, index: number) {
    dispatchClasses({
      type: "attribute/update",
      payload: { id: classId, attribute: data, index },
    });
  }

  function handlerDelete(index: number) {
    dispatchClasses({
      type: "attribute/remove",
      payload: { id: classId, index },
    });
  }

  return (
    <PanelList<Attribute>
      name="attributes"
      listData={attributes}
      ModalComponent={AttributeModal}
      formatData={stringifyAttribute}
      onCreate={handlerCreate}
      onUpdate={handlerUpdate}
      onRemove={handlerDelete}
    />
  );
}

export default AttributePanelList;
