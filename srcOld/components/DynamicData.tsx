import { useAppDispatch } from "@src/hooks/useRedux";
import { InputField } from "@src/ui";

interface IDynamicData<T extends {}> {
  data: T;
}

function DynamicData<T extends {} = {}>({ data, onChange }: IDynamicData<T>) {
  const dispatch = useAppDispatch();
  function handlerChange() {
    return function () {};
  }
  return (
    <div>
      {Object.entries(data).map(([label, value]) => {
        switch (typeof value) {
          case "string":
            return (
              <InputField
                label={label}
                onChange={(e) => onChange(e.target.value)}
                value={value}
              />
            );
        }
        return null;
      })}
    </div>
  );
}

export default DynamicData;
