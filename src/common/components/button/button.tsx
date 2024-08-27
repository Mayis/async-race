import React, { PropsWithChildren } from "react";

interface Props {
  onClick?: () => void;
  style?: React.CSSProperties;
}
function Button({ onClick, style, children }: PropsWithChildren<Props>) {
  return (
    <button
      onClick={onClick}
      style={style}
      className="py-2 px-3 border border-black rounded-md bg-white hover:bg-gray-100"
    >
      {children}
    </button>
  );
}

export default Button;
