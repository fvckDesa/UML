// components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// icons
import { faSliders, faTrashCan } from "@fortawesome/free-solid-svg-icons";

interface IProps {
  children: string;
  onSliders: () => void;
  onDelete: () => void;
  textClass?: string;
}

function PanelElement({
  children,
  onSliders,
  onDelete,
  textClass = "",
}: IProps) {
  return (
    <li className="flex gap-2">
      <span className={`${textClass} flex-1`}>{children}</span>
      <button
        type="button"
        className="btnAction w-6 h-6"
        onClick={() => onSliders()}
      >
        <FontAwesomeIcon icon={faSliders} />
      </button>
      <button
        type="button"
        className="btnAction w-6 h-6"
        onClick={() => onDelete()}
      >
        <FontAwesomeIcon icon={faTrashCan} />
      </button>
    </li>
  );
}

export default PanelElement;
