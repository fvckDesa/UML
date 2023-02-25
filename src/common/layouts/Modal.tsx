import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormEvent, PropsWithChildren } from "react";
import { ScrollContainer, LoaderButton } from "../components";

export type IModal = PropsWithChildren<{
  title: string;
  isLoading: boolean;
  onClose: () => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}>;

function Modal({ title, isLoading, onClose, onSubmit, children }: IModal) {
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
        <header className="flex justify-between items-center h-12 px-4 py-2 border-b border-gray-300">
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
        <ScrollContainer maxHeight={"calc(100vh - 40px - 96px)"}>
          <div className="flex flex-col gap-2 p-6">{children}</div>
        </ScrollContainer>
        <footer className="h-12 px-4 py-2 border-t border-gray-300">
          <LoaderButton
            className="h-full ml-auto border border-slate-300 rounded-md"
            loading={isLoading}
          >
            Save
          </LoaderButton>
        </footer>
      </form>
    </div>
  );
}

export default Modal;
