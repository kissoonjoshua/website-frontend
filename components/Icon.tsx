import React from "react";

interface IconProps {
  Svg: any;
  height?: number;
  width?: number;
}

export default function Icon({ Svg, height = 24, width = 24 }: IconProps) {
  return <Svg height={height} width={width} />;
}
