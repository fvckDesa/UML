// types
import type { ComponentProps } from "react";
import type { ListGroup } from "@src/types/optionsList";
// components
import { DataList } from "@src/ui";
// hooks
import { useUMLContext } from "@src/contexts/UML";
import { useMemo } from "react";
// data
import { JAVA_TYPES } from "@src/data/types";

type IProps = Omit<ComponentProps<typeof DataList>, "options">;

function TypeList(dataListProps: IProps) {
  const { umlClasses } = useUMLContext();
  const options = useMemo(() => {
    const types = Object.entries(JAVA_TYPES).map(([label, items]) => ({
      label,
      items,
    }));

    return types.reduce<ListGroup[]>((types, { label, items }) => {
      const javaClasses = Object.values(umlClasses).map(
        (c) => c.javaClass.name
      );
      return types.concat({
        label: label.replace(/_/g, " "),
        items:
          label === "NOT_PRIMITIVES" ? items.concat(...javaClasses) : items,
      });
    }, []);
  }, [umlClasses]);

  return <DataList options={options} {...dataListProps} />;
}

export default TypeList;
