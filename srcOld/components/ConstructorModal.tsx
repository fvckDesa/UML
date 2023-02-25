import ReactDOM from "react-dom";
// types
import type { Constructor } from "@src/types/class";
import type { Modal } from "@src/types/modal";
// components
import { SelectField, ModalForm, ParametersField } from "@src/ui";
// hooks
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useAppSelector } from "@src/hooks/useRedux";

type IProps = Modal<Constructor>;

function ConstructorsModal({ data, onSave, onClose }: IProps) {
  const name = useAppSelector((state) =>
    state.uml.activeElement
      ? state.uml.elements[state.uml.activeElement].data.name
      : null
  );
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    control,
    setValue,
  } = useForm<Constructor>();

  useEffect(() => {
    if (!data) return;
    for (const [key, value] of Object.entries(data)) {
      setValue(key as keyof Constructor, value);
    }
  }, [data]);

  function onSubmit(newData: Constructor) {
    onSave({
      ...newData,
      name: name ?? "",
    });
    onClose();
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
      <ParametersField control={control as any} register={register as any} />
    </ModalForm>,
    document.getElementById("modal") as HTMLDivElement
  );
}

export default ConstructorsModal;
