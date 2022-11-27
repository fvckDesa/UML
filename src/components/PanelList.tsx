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
  isClose: boolean;
  data?: T;
  index?: number;
}

function PanelList<ListType extends { name: string; isStatic: boolean }>({
  listData = [],
  ModalComponent,
  formatData,
  name,
  onCreate,
  onUpdate,
  onRemove,
}: IProps<ListType>) {
  const [modal, setModal] = useState<ModalState<ListType>>({
    isClose: true,
  });

  function handlerClose() {
    setModal({ isClose: true });
  }

  function handlerOpen(index?: number) {
    setModal({
      isClose: false,
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
            key={data.name + i}
            onSliders={handlerOpen.bind(null, i)}
            onDelete={() => onRemove(i)}
            textClass={data.isStatic ? "underline" : ""}
          >
            {formatData(data)}
          </PanelElement>
        ))}
      </ul>
      <ModalComponent
        close={modal.isClose}
        onClose={handlerClose}
        onSave={handlerSave}
        data={modal?.data}
      />
    </div>
  );
}

export default PanelList;
