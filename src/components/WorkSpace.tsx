import { useUMLContext } from "@src/contexts/UML";
import { useRef } from "react";
import Class from "./Class";

interface IProps {
  width: number;
  height: number;
  onActiveClass: (id: string) => void;
}

function WorkSpace({ width, height, onActiveClass }: IProps) {
  const { umlClasses } = useUMLContext();
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className="relative bg-[length:25px_25px] bg-dot"
      style={{
        width,
        height,
      }}
    >
      {Object.keys(umlClasses).map((id) => (
        <Class key={id} id={id} onClassSelect={onActiveClass} container={ref} />
      ))}
    </div>
  );
}

export default WorkSpace;
