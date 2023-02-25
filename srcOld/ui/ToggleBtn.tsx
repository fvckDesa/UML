import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";

interface IProps {
  active: boolean;
  icon: FontAwesomeIconProps["icon"];
  onClick: () => void;
}

function ToggleBtn({ active, icon, onClick }: IProps) {
  return (
    <button
      className={`btnAction w-8 h-8 ${
        active
          ? "bg-blue-500 text-white hover:opacity-100 hover:bg-blue-700"
          : ""
      } transition-colors`}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={icon} />
    </button>
  );
}

export default ToggleBtn;
