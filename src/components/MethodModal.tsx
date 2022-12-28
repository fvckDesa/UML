import ReactDOM from "react-dom";
// types
import type { Method } from "@src/types/class";
import type { Modal } from "@src/types/modal";
// components
import { InputField, SelectField, CheckboxField, ModalForm } from "@src/ui";
// hooks
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { validation } from "@src/utils/validate";
import TypeList from "./TypeList";
import ParametersField from "@src/ui/ParametersField";

type IProps = Modal<Method>;

function ClassModal({ data, onSave, onClose }: IProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    control,
    setValue,
  } = useForm<Method>();

  useEffect(() => {
    if (!data) return;
    for (const [key, value] of Object.entries(data)) {
      setValue(key as keyof Method, value);
    }
  }, [data]);

  function onSubmit(newData: Method) {
    onSave(newData);
    onClose();
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
        options={["public", "private", "protected", "package"]}
        {...register("visibility", { value: "public" })}
      />
      <ParametersField control={control as any} register={register as any} />
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
      <TypeList onSelectOption={(value) => setValue("type", String(value))}>
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
      </TypeList>
      <CheckboxField
        text={`Return array of ${watch("type") || "<Type>"}`}
        {...register("isArray")}
      />
      <CheckboxField text="Static" {...register("isStatic")} />
      <CheckboxField text="Final" {...register("isFinal")} />
    </ModalForm>,
    document.getElementById("modal") as HTMLDivElement
  );
}

export default ClassModal;
