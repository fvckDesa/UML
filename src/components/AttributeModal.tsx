import ReactDOM from "react-dom";
// types
import type { Attribute } from "@src/types/class";
// components
import { InputField, SelectField, CheckboxField, LoaderButton } from "@src/ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// hooks
import { useForm } from "react-hook-form";
// icon
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface IProps {
  close: boolean;
  onSave: (data: Attribute) => void;
  onClose: () => void;
  data?: Attribute;
}

function AttributeModal({ data, close, onSave, onClose }: IProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<Attribute>({ defaultValues: data });

  function handlerSubmit(data: Attribute) {
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
            Attribute
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
          <InputField
            label="Name"
            error={errors.name?.message}
            {...register("name", {
              required: `Name of attribute is required`,
            })}
          />
          <InputField
            label={"Type"}
            error={errors.type?.message}
            {...register("type", {
              required: `${"Type"} is required`,
            })}
          />
          <CheckboxField
            text={`Array of ${watch("type") ?? ""}`}
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

export default AttributeModal;
