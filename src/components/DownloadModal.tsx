import ReactDOM from "react-dom";
//types
import type { DownloadInfo } from "@src/types/general";
import type { Modal } from "@src/types/modal";
// components
import { InputField, SelectField, ModalForm } from "@src/ui";
// hooks
import { useForm } from "react-hook-form";

type IProps = Modal<DownloadInfo>;

function DownloadModal({ onSave, onClose }: IProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DownloadInfo>();

  return ReactDOM.createPortal(
    <ModalForm
      title="download"
      isLoading={isSubmitting}
      onSubmit={handleSubmit(onSave)}
      onClose={onClose}
    >
      <SelectField
        label="File type"
        {...register("fileType", { value: "png" })}
      >
        <option value="png">PNG</option>
        <option value="jpg">JPG</option>
        <option value="pdf">PDF</option>
      </SelectField>
      <InputField
        label="File name"
        error={errors.name?.message}
        {...register("name", { required: "Name is required" })}
      />
    </ModalForm>,
    document.getElementById("modal") as HTMLDivElement
  );
}

export default DownloadModal;
