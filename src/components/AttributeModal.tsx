import ReactDOM from "react-dom";
// types
import type { Attribute } from "@src/types/class";
import type { Modal } from "@src/types/modal";
// components
import { InputField, SelectField, CheckboxField, ModalForm } from "@src/ui";
// hooks
import { useForm } from "react-hook-form";
import { useEffect } from "react";
// utils
import { validation } from "@src/utils/validate";

type IProps = Modal<Attribute>;

function AttributeModal({ data, onSave, onClose }: IProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<Attribute>();

  useEffect(() => {
    if (!data) return;
    for (const [key, value] of Object.entries(data)) {
      setValue(key as keyof Attribute, value);
    }
  }, [data]);

  function onSubmit(newData: Attribute) {
    onSave(newData);
    onClose();
  }

  return ReactDOM.createPortal(
    <ModalForm
      title="attribute"
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
      <InputField
        label="Name"
        error={errors.name?.message}
        {...register("name", {
          required: `Name of attribute is required`,
          validate: {
            ...validation("name"),
          },
        })}
      />
      <InputField
        label={"Type"}
        error={errors.type?.message}
        {...register("type", {
          required: `${"Type"} is required`,
          validate: {
            ...validation("type"),
          },
        })}
      />
      <CheckboxField
        text={`Array of ${watch("type") ?? ""}`}
        {...register("isArray")}
      />
      <CheckboxField text="Static" {...register("isStatic")} />
      <CheckboxField text="Final" {...register("isFinal")} />
    </ModalForm>,
    document.getElementById("modal") as HTMLDivElement
  );
}

export default AttributeModal;
