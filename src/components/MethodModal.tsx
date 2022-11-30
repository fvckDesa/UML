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
  } = useForm<Method>({ defaultValues: { parameters: [] } });
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

  function handlerSubmit(newData: Method) {
    onSave(newData);
    onClose();
  }

  function handlerParametersScroll() {
    if (!listRef.current) return;
    setIsTop(listRef.current.scrollTop === 0);
  }

  return ReactDOM.createPortal(
    <div
      className="fixed top-0 w-screen h-screen p-5 flex justify-center items-center bg-modal"
      onClick={() => onClose()}
    >
      <form
        className="w-80 rounded-xl bg-white"
        onSubmit={handleSubmit(handlerSubmit)}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex justify-between items-center px-4 py-2 border-b border-gray-300">
          <h1 className="text-lg font-semibold uppercase" data-testid="title">
            Method
          </h1>
          <button
            className="w-8 h-8 btnAction"
            type="button"
            onClick={() => onClose()}
            data-testid="close-btn"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </header>
        <div className="flex flex-col gap-2 p-6">
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
        </div>
        <footer className="px-4 py-2 border-t border-gray-300">
          <LoaderButton
            className="ml-auto border border-slate-300 rounded-md "
            loading={isSubmitting}
          >
            Save
          </LoaderButton>
        </footer>
      </form>
    </div>,
    document.getElementById("class-modal") as HTMLDivElement
  );
}

export default ClassModal;
