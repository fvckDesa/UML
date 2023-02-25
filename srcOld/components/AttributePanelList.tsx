// types
import type { Attribute } from "@src/types/class";
import type { ClassElement } from "@src/types/uml";
// components
import PanelList from "./PanelList";
import AttributeModal from "./AttributeModal";
// hooks
import { useRedux } from "@src/hooks/useRedux";
// redux
import { updateElementData } from "@src/features/umlSlice";
// utils
import { stringifyAttribute } from "@src/utils/class";

interface IProps {
  attributes: Attribute[];
  classId: string;
}

function AttributePanelList({ attributes, classId }: IProps) {
  const { data: classAttributes, dispatch } = useRedux(
    (state) => (state.uml.elements[classId] as ClassElement).data.attributes
  );

  function handlerCreate(data: Attribute) {
    dispatch(
      updateElementData({
        id: classId,
        data: { attributes: classAttributes.concat(data) },
      })
    );
  }

  function handlerUpdate(data: Attribute, index: number) {
    dispatch(
      updateElementData({
        id: classId,
        data: {
          attributes: classAttributes.map((attr, i) =>
            i === index ? data : attr
          ),
        },
      })
    );
  }

  function handlerDelete(index: number) {
    dispatch(
      updateElementData({
        id: classId,
        data: { attributes: classAttributes.filter((_, i) => i !== index) },
      })
    );
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
