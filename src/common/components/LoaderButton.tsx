import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ILoaderButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading: boolean;
  children?: ReactNode;
}

function LoaderButton({
  loading,
  children = "button",
  className = "",
  ...btnProps
}: ILoaderButton) {
  return (
    <button
      className={`flex justify-center items-center px-5 py-1 ${className}`}
      {...btnProps}
    >
      {loading ? (
        <div className="w-6 h-6 rounded-full border-4 border-gray-400 border-t-white animate-spin" />
      ) : (
        children
      )}
    </button>
  );
}

export default LoaderButton;
