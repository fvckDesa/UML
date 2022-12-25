import ReactDOM from "react-dom";
// types
import type { Attribute } from "@src/types/class";
import type { Modal } from "@src/types/modal";
// components
import { InputField, SelectField, CheckboxField, ModalForm } from "@src/ui";
import TypeList from "./TypeList";
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
        options={["public", "private", "protected", "package"]}
        {...register("visibility", { value: "public" })}
      />
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
