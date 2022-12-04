// types
import type { FormEvent, ReactNode } from "react";
// components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoaderButton from "./LoaderButton";
// icons
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface IProps {
  title: string;
  isLoading: boolean;
  onClose: () => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  children: ReactNode | ReactNode[];
}

function ModalForm({ title, isLoading, onSubmit, onClose, children }: IProps) {
  return (
    <div
      className="fixed top-0 w-screen h-screen p-5 flex justify-center items-center bg-modal z-10"
      onClick={() => onClose()}
    >
      <form
        className="w-80 rounded-xl bg-white"
        onSubmit={onSubmit}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex justify-between items-center px-4 py-2 border-b border-gray-300">
          <h1 className="text-lg font-semibold uppercase" data-testid="title">
            {title}
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
        <div className="flex flex-col gap-2 p-6">{children}</div>
        <footer className="px-4 py-2 border-t border-gray-300">
          <LoaderButton
            className="ml-auto border border-slate-300 rounded-md "
            loading={isLoading}
          >
            Save
          </LoaderButton>
        </footer>
      </form>
    </div>
  );
}

export default ModalForm;
