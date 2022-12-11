import { useUMLContext } from "@src/contexts/UML";

interface IProps {
  id: string;
}

function Arrow({ id }: IProps) {
  const { umlArrows, umlClasses } = useUMLContext();

  const [class1, class2] = umlArrows.arrows[id].nodes.map((node) =>
    node ? umlClasses[node] : null
  );

  if (!class1?.ref || !class2?.ref) return null;

  return (
    <g>
      <line
        x1={class1.coords.x + class1.ref.scrollWidth / 2}
        y1={class1.coords.y + class1.ref.scrollHeight / 2}
        x2={class2.coords.x + class2.ref.scrollWidth / 2}
        y2={class2.coords.y + class2.ref.scrollHeight / 2}
        stroke="black"
        strokeWidth={3}
      />
    </g>
  );
}

export default Arrow;