import { useRedux } from "@src/hooks/useRedux";
import { Coords } from "@src/types/general";
import { ArrowElement } from "@src/types/uml";
import Line from "./Line";
import { deleteElement, setActiveElement } from "@src/features/umlSlice";
import { usePoint } from "@src/hooks/usePoint";

interface IProps {
  id: string;
}

function Arrow({ id }: IProps) {
  const { data, dispatch } = useRedux((state) => ({
    arrow: state.uml.elements[id] as ArrowElement,
    clickEvent: state.editor.clickEvent,
  }));
  const from = usePoint(data.arrow.layout.from);
  const to = usePoint(data.arrow.layout.to);

  function handlerClick() {
    switch (data.clickEvent?.type) {
      case "delete": {
        dispatch(deleteElement(id));
        break;
      }
      default: {
        dispatch(setActiveElement(id));
      }
    }
  }

  if (!from || !to) return null;

  return (
    <g className="cursor-pointer" onClick={handlerClick}>
      <Line from={from} to={to} />
    </g>
  );
}

export default Arrow;
