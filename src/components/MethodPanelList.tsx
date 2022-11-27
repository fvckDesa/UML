// types
import type { Method } from "@src/types/class";
// components;
import PanelList from "./PanelList";
import MethodModal from "./MethodModal";
// utils
import { stringifyMethod } from "@src/utils/class";
import { useUMLContext } from "@src/contexts/UML";

interface IProps {
  methods: Method[];
  classId: string;
}

function MethodPanelList({ methods, classId }: IProps) {
  const { dispatchClasses } = useUMLContext();

  function handlerCreate(data: Method) {
    dispatchClasses({
      type: "method/add",
      payload: { id: classId, method: data },
    });
  }

  function handlerUpdate(data: Method, index: number) {
    dispatchClasses({
      type: "method/update",
      payload: { id: classId, method: data, index },
    });
  }

  function handlerRemove(index: number) {
    dispatchClasses({ type: "method/remove", payload: { id: classId, index } });
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
