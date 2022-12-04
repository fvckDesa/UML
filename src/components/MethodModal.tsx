import ReactDOM from "react-dom";
// types
import type { Method } from "@src/types/class";
import type { Modal } from "@src/types/modal";
// components
import {
  InputField,
  SelectField,
  CheckboxField,
  LoaderButton,
  VariableField,
  ModalForm,
} from "@src/ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// hooks
import { useForm, useFieldArray } from "react-hook-form";
// icon
import { faXmark, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { validation } from "@src/utils/validate";

type IProps = Modal<Method>;

function ClassModal({ data, onSave, onClose }: IProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const [isTop, setIsTop] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    control,
    setFocus,
    setValue,
  } = useForm<Method>();
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
      setValue(key as keyof Method, value);
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

  function onSubmit(newData: Method) {
    onSave(newData);
    onClose();
  }

  function handlerParametersScroll() {
    if (!listRef.current) return;
    setIsTop(listRef.current.scrollTop === 0);
  }

  return ReactDOM.createPortal(
    <ModalForm
      title="method"
      isLoading={isSubmitting}
      onSubmit={handleSubmit(onSubmit)}
      onClose={onClose}
    >
      <SelectField
        label="Visibility"
        {...register("visibility", { value: "public" })}
      >
        <option value="public">Public</option>
        <option value="private">Private</option>
        <option value="protected">Protected</option>
        <option value="package">Package</option>
      </SelectField>
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
              register={register}
              index={i}
              errors={errors.parameters?.[i]}
              onRemove={remove}
            />
          ))}
        </ul>
      </div>
      <InputField
        label="Name"
        error={errors.name?.message}
        {...register("name", {
          required: `Name of method is required`,
          validate: {
            ...validation("name"),
          },
        })}
      />
      <InputField
        label={"Return type"}
        error={errors.type?.message}
        {...register("type", {
          required: `Return type is required`,
          validate: {
            ...validation("return type"),
          },
        })}
      />
      <CheckboxField
        text={`Return array of ${watch("type") ?? ""}`}
        {...register("isArray")}
      />
      <CheckboxField text="Static" {...register("isStatic")} />
      <CheckboxField text="Final" {...register("isFinal")} />
    </ModalForm>,
    document.getElementById("modal") as HTMLDivElement
  );
}

export default ClassModal;
