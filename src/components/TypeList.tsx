// types
import type { ComponentPropsWithoutRef, Ref } from "react";
import type { ListGroup } from "@src/types/optionsList";
// components
import { DataListField } from "@src/ui";
// hooks
import { useUMLContext } from "@src/contexts/UML";
import { forwardRef, useMemo } from "react";
// data
import { JAVA_TYPES } from "@src/data/types";

type IProps = Omit<ComponentPropsWithoutRef<typeof DataListField>, "options">;

const TypeList = forwardRef(
  (dataListProps: IProps, ref: Ref<HTMLInputElement>) => {
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

    return <DataListField ref={ref} options={options} {...dataListProps} />;
  }
);

TypeList.displayName = "TypeList";

export default TypeList;
