import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HTMLAttributes } from "react";

interface IErrorMessage extends HTMLAttributes<HTMLDivElement> {
  children: string | null | undefined;
}

function ErrorMessage({ children, className, ...other }: IErrorMessage) {
  if (!children) return null;

  return (
    <div
      className={`flex items-center gap-2 px-1 text-center text-red-500 ${className}`}
      {...other}
    >
      <FontAwesomeIcon className="fill-red-500" icon={faTriangleExclamation} />
      <span>{children}</span>
    </div>
  );
}

export default ErrorMessage;
