import Icon from "@/common/components/icon/icon";
import { IconName } from "@/common/components/icon/icon-data";
import React from "react";

interface Props {
  icon: IconName;
  onClick?: () => void;
  iconSize?: number;
  disabled?: boolean;
}
function IconButton({ icon, onClick, iconSize, disabled }: Props) {
  return (
    <button disabled={disabled} onClick={onClick} className="p-2 border border-black rounded-full">
      <Icon name={icon} size={iconSize} />
    </button>
  );
}

export default IconButton;
