import React from 'react';
import { IconName, svgIconConfig } from 'svg-icons';

interface IIcon {
  name: IconName;
  height?: number;
  width?: number;
  className?: string;
}

export const Icon = ({ name, height, width, className }: IIcon) => {
  const IconComponent = svgIconConfig[name].component;
  const w = width || svgIconConfig[name].width;
  const h = height || svgIconConfig[name].height;
  return <IconComponent width={w} height={h} className={className} />;
};
