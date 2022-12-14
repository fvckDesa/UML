// types
import type { ModalComponent } from "@src/types/modal";
// components
import { PanelElement } from "@src/ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// hooks
import { useState } from "react";
// icons
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface IProps<T> {
  listData: T[];
  ModalComponent: ModalComponent<T>;
  formatData: (data: T) => string;
  name: string;
  onCreate: (data: T) => void;
  onUpdate: (data: T, index: number) => void;
  onRemove: (index: number) => void;
}

interface ModalState<T> {
  isOpen: boolean;
  data?: T;
  index?: number;
}

function PanelList<ListType>({
  listData = [],
  ModalComponent,
  formatData,
  name,
  onCreate,
  onUpdate,
  onRemove,
}: IProps<ListType>) {
  const [modal, setModal] = useState<ModalState<ListType>>({
    isOpen: false,
  });

  function handlerClose() {
    setModal({ isOpen: false });
  }

  function handlerOpen(index?: number) {
    setModal({
      isOpen: true,
      data: index != undefined ? listData[index] : undefined,
      index,
    });
  }

  function handlerSave(data: ListType) {
    if (modal.data != undefined && modal.index != undefined) {
      onUpdate(data, modal.index);
    } else {
      onCreate(data);
    }
  }

  return (
    <div className="px-4 py-2 border-t border-gray-300">
      <header className="flex justify-between items-center">
        <h1 className="first-letter:uppercase">{name}</h1>
        <button
          className="btnAction w-6 h-6"
          type="button"
          onClick={() => handlerOpen()}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </header>
      <ul className="pl-1 mt-3">
        {listData.map((data, i) => (
          <PanelElement
            key={i}
            onSliders={handlerOpen.bind(null, i)}
            onDelete={() => onRemove(i)}
          >
            {formatData(data)}
          </PanelElement>
        ))}
      </ul>
      {modal.isOpen && (
        <ModalComponent
          onClose={handlerClose}
          onSave={handlerSave}
          data={modal?.data}
        />
      )}
    </div>
  );
}

export default PanelList;
