import ReactDOM from "react-dom";
// types
import type { Method } from "@src/types/class";
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
import { useLayoutEffect, useRef } from "react";

interface IProps {
  close: boolean;
  onSave: (data: Method) => void;
  onClose: () => void;
  data?: Method;
}

function ClassModal({ data, close, onSave, onClose }: IProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    control,
    setFocus,
  } = useForm<Method>({ defaultValues: data });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "parameters",
  });

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

  function handlerSubmit(data: Method) {
    onSave(data);
  }

  if (close) return null;

  return ReactDOM.createPortal(
    <div className="fixed top-0 w-screen h-screen p-5 flex justify-center items-center bg-modal">
      <form
        className="w-80 rounded-xl bg-white"
        onSubmit={handleSubmit(handlerSubmit)}
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
            <header className="flex justify-between items-center">
              <h2>Parameters</h2>
              <button
                className="btnAction w-6 h-6"
                type="button"
                onClick={handlerAppend}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </header>
            <ul
              ref={listRef}
              className="flex flex-col items-center gap-2 max-h-28 p-2 !pr-[50px] mr-[-50px] overflow-y-scroll scroll-smooth"
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
            })}
          />
          <InputField
            label={"Return type"}
            error={errors.type?.message}
            {...register("type", {
              required: `${"Return type"} is required`,
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
