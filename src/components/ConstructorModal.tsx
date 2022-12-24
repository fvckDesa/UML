import ReactDOM from "react-dom";
// types
import type { Constructor, Variable } from "@src/types/class";
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
import ParametersField from "@src/ui/ParametersField";

type IProps = Modal<Constructor>;

function ConstructorsModal({ data, onSave, onClose }: IProps) {
  const { umlInfo, umlClasses } = useUMLContext();
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
      name: umlClasses[umlInfo.activeClass].javaClass.name,
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
