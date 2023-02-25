import { useRedux } from "@src/common/hooks";
import { selectArrow } from "../graphSlice";
import Line from "../components/Line";

interface IArrow {
  id: string | number;
}

function Arrow({ id }: IArrow) {
  const { data, dispatch } = useRedux((state) => selectArrow(state, id));

  if (!data) return null;

  return (
    <g>
      <Line from={data.from} to={data.to} />
    </g>
  );
}

export default Arrow;
