import { useUMLContext } from "@src/contexts/UML";
import { Coords } from "@src/types/general";

interface IProps {
  node: string;
  pointer: Coords;
}

function NewArrow({ node, pointer }: IProps) {
  const { umlClasses } = useUMLContext();
  const nodeClass = umlClasses[node];

  if (!nodeClass.ref) return null;

  return (
    <line
      x1={nodeClass.coords.x + nodeClass.ref.scrollWidth / 2}
      y1={nodeClass.coords.y + nodeClass.ref.scrollHeight / 2}
      x2={pointer.x}
      y2={pointer.y}
      stroke="black"
      strokeWidth={3}
    />
  );
}

export default NewArrow;
