import React, { FC } from 'react';
import { IconName, svgIconConfig } from 'svg-icons';

export const Icon: FC<{
  name: IconName;
  height?: number;
  width?: number;
  className?: string;
}> = ({ name, height, width, className }) => {
  const IconComponent = svgIconConfig[name].component;
  const w = width || svgIconConfig[name].width;
  const h = height || svgIconConfig[name].height;
  return <IconComponent width={w} height={h} className={className} />;
};
