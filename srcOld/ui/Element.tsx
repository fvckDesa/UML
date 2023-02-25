interface IProps {
  active?: boolean;
  children: string;
  onClick?: () => void;
}

function Element({ active = false, children, onClick = () => {} }: IProps) {
  return (
    <div
      className={`px-4 py-2 border-2 ${
        active ? "border-blue-500 bg-blue-500 text-white" : "border-transparent"
      } cursor-pointer hover:border-blue-500`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export default Element;
