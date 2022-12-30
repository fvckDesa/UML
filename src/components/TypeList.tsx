// types
import type { ComponentProps } from "react";
import type { ListGroup } from "@src/types/optionsList";
// components
import { DataList } from "@src/ui";
// hooks
import { useMemo } from "react";
import { useAppSelector } from "@src/hooks/useRedux";
// data
import { JAVA_TYPES } from "@src/data/types";

type IProps = Omit<ComponentProps<typeof DataList>, "options">;

function TypeList(dataListProps: IProps) {
  const classNames = useAppSelector((state) =>
    Object.values(state.uml.elements)
      .filter((el) => el.type === "class")
      .map((el) => el.data.name)
  );
  const options = useMemo(() => {
    const types = Object.entries(JAVA_TYPES).map(([label, items]) => ({
      label,
      items,
    }));

    return types.reduce<ListGroup[]>(
      (types, { label, items }) =>
        types.concat({
          label: label.replace(/_/g, " "),
          items:
            label === "NOT_PRIMITIVES" ? items.concat(...classNames) : items,
        }),
      []
    );
  }, [classNames]);

  return <DataList options={options} {...dataListProps} />;
}

export default TypeList;
