import Icon from "@/common/components/icon/icon";
import { IconName } from "@/common/components/icon/icon-data";
import React from "react";

interface Props {
  icon: IconName;
  onClick?: () => void;
  iconSize?: number;
}
function IconButton({ icon, onClick, iconSize }: Props) {
  return (
    <button onClick={onClick} className="p-2 border border-black rounded-full">
      <Icon name={icon} size={iconSize} />
    </button>
  );
}

export default IconButton;
