// types
import type { Constructor } from "@src/types/class";
import type { ClassElement } from "@src/types/uml";
// components;
import PanelList from "./PanelList";
import ConstructorModal from "./ConstructorModal";
// hooks
import { useRedux } from "@src/hooks/useRedux";
// redux
import { updateElementData } from "@src/features/umlSlice";
// utils
import { stringifyConstructor } from "@src/utils/class";

interface IProps {
  constructors: Constructor[];
  classId: string;
}

function ConstructorPanelList({ constructors, classId }: IProps) {
  const { data: classConstructors, dispatch } = useRedux(
    (state) => (state.uml.elements[classId] as ClassElement).data.constructors
  );

  function handlerCreate(data: Constructor) {
    dispatch(
      updateElementData({
        id: classId,
        data: { constructors: classConstructors.concat(data) },
      })
    );
  }

  function handlerUpdate(data: Constructor, index: number) {
    dispatch(
      updateElementData({
        id: classId,
        data: {
          constructors: classConstructors.map((constr, i) =>
            i === index ? data : constr
          ),
        },
      })
    );
  }

  function handlerRemove(index: number) {
    dispatch(
      updateElementData({
        id: classId,
        data: { constructors: classConstructors.filter((_, i) => i !== index) },
      })
    );
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
