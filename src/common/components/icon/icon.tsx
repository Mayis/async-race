import React from "react";
import { ICONS, type IconName } from "@/common/components/icon/icon-data";
import Image from "next/image";

interface Props {
  name: IconName;
  size?: number;
  width?: number;
  height?: number;
}
function Icon({ name, width: widthFromProps, height: heightFromProps, size = 24 }: Props) {
  const width = widthFromProps || size;
  const height = heightFromProps || size;

  return <Image alt={name} src={ICONS[name]} width={width} height={height} />;
}

export default Icon;
