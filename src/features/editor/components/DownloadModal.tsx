import { useForm } from "react-hook-form";
import { Modal } from "@src/common/layouts";
import { DownloadConfig, saveAs } from "@src/lib/save";
import { SelectField, InputField } from "@src/common/components";
import { useState } from "react";
import ErrorMessage from "@src/common/components/ErrorMessage";
import ReactDOM from "react-dom";

type ModalData = Omit<DownloadConfig, "htmlElement">;

interface IDownloadModal {
  onClose: () => void;
}

function DownloadModal({ onClose }: IDownloadModal) {
  const {
    formState: { isSubmitting, errors },
    register,
    handleSubmit,
  } = useForm<ModalData>({
    defaultValues: { name: "", type: "png" },
  });
  const [formError, setFormError] = useState("");

  async function handlerSave(data: ModalData) {
    const graphElement = document.querySelector<HTMLElement>("#workspace");
    try {
      if (!graphElement) {
        console.error("Error: element not found");
        throw new Error();
      }
      await saveAs({ ...data, htmlElement: graphElement });
      onClose();
    } catch (error) {
      setFormError("Oops.. Something went wrong");
    }
  }

  return ReactDOM.createPortal(
    <Modal
      title="Save"
      onSubmit={handleSubmit(handlerSave)}
      onClose={onClose}
      isLoading={isSubmitting}
    >
      <SelectField
        label="Type"
        options={["png", "jpg", "pdf"]}
        {...register("type")}
      />
      <InputField
        label="Name"
        error={errors.name?.message}
        {...register("name", { required: "Name is required" })}
      />
      <ErrorMessage>{formError}</ErrorMessage>
    </Modal>,
    document.querySelector("#modal")!
  );
}

export default DownloadModal;
