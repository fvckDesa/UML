// types
import type { Method } from "@src/types/class";
import type { ClassElement } from "@src/types/uml";
// components;
import PanelList from "./PanelList";
import MethodModal from "./MethodModal";
// hooks
import { useRedux } from "@src/hooks/useRedux";
// redux
import { updateElementData } from "@src/features/umlSlice";
// utils
import { stringifyMethod } from "@src/utils/class";

interface IProps {
  methods: Method[];
  classId: string;
}

function MethodPanelList({ methods, classId }: IProps) {
  const { data: classMethods, dispatch } = useRedux(
    (state) => (state.uml.elements[classId] as ClassElement).data.methods
  );

  function handlerCreate(data: Method) {
    dispatch(
      updateElementData({
        id: classId,
        data: { methods: classMethods.concat(data) },
      })
    );
  }

  function handlerUpdate(data: Method, index: number) {
    dispatch(
      updateElementData({
        id: classId,
        data: {
          methods: classMethods.map((constr, i) =>
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
        data: { methods: classMethods.filter((_, i) => i !== index) },
      })
    );
  }

  return (
    <PanelList<Method>
      name="methods"
      listData={methods}
      ModalComponent={MethodModal}
      formatData={stringifyMethod}
      onCreate={handlerCreate}
      onUpdate={handlerUpdate}
      onRemove={handlerRemove}
    />
  );
}

export default MethodPanelList;
