import ReactDOM from "react-dom";
// types
import type { Constructor } from "@src/types/class";
import type { Modal } from "@src/types/modal";
// components
import { SelectField, LoaderButton, VariableField, ModalForm } from "@src/ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// hooks
import { useForm, useFieldArray } from "react-hook-form";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
// icon
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useUMLContext } from "@src/contexts/UML";

type IProps = Modal<Constructor>;

function ConstructorsModal({ data, onSave, onClose }: IProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const { umlInfo, umlClasses } = useUMLContext();
  const [isTop, setIsTop] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    setFocus,
    control,
  } = useForm<Constructor>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "parameters",
  });

  useEffect(() => {
    if (!data) return;
    for (const [key, value] of Object.entries(data)) {
      if (key === "parameters") {
        value.forEach(append);
        continue;
      }
      setValue(key as keyof Constructor, value);
    }

    return () => {
      remove(data.parameters.map((_, i) => i));
    };
  }, [data]);

  useLayoutEffect(() => {
    listRef.current?.scrollTo({
      top: listRef.current?.scrollHeight ?? 0,
      behavior: "smooth",
    });
    setFocus(`parameters.${fields.length - 1}.name`);
  }, [fields.length]);

  function handlerAppend() {
    append({ name: "", type: "", isArray: false });
  }

  function onSubmit(newData: Constructor) {
    onSave({
      ...newData,
      name: umlClasses[umlInfo.activeClass].javaClass.name,
    });
    onClose();
  }

  function handlerParametersScroll() {
    if (!listRef.current) return;
    setIsTop(listRef.current.scrollTop === 0);
  }

  return ReactDOM.createPortal(
    <ModalForm
      title="constructor"
      isLoading={isSubmitting}
      onSubmit={handleSubmit(onSubmit)}
      onClose={onClose}
    >
      <SelectField
        label="Visibility"
        options={["public", "private", "protected", "package"]}
        {...register("visibility", { value: "public" })}
      />
      <div className="overflow-x-hidden">
        <header className="flex justify-between items-center p-1">
          <h2>Parameters</h2>
          <button
            className="btnAction w-6 h-6"
            type="button"
            onClick={handlerAppend}
            data-testid="add-parameter"
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </header>
        <ul
          ref={listRef}
          className={`flex flex-col items-center gap-2 max-h-[120px] p-2 !pr-[50px] border-t-2 ${
            !isTop ? "border-blue-500" : "border-transparent"
          } mr-[-50px] overflow-y-scroll scroll-smooth`}
          onScroll={handlerParametersScroll}
        >
          {fields.map((field, i) => (
            <VariableField
              key={field.id}
              isArray={watch(`parameters.${i}.isArray`)}
              //! resolve type error
              register={register as any}
              index={i}
              errors={errors.parameters?.[i]}
              onRemove={remove}
            />
          ))}
        </ul>
      </div>
    </ModalForm>,
    document.getElementById("modal") as HTMLDivElement
  );
}

export default ConstructorsModal;
