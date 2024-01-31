import React from 'react';
import { Chip, ChipProps } from '@mui/material';

const generateChipColor = (name: string) => {
  const truncatedName = name.slice(0, 2);
  const hash = truncatedName
    .split('')
    .reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) & 0xFFFFF, 0);
  const color = `#${hash.toString(16)}`;
  return color;
};

const getContrastText = (backgroundColor: string) => {
  // Calculate the relative luminance of the color
  const hexColor = backgroundColor.substring(1); // Remove the leading '#'
  const rgb = parseInt(hexColor, 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >>  8) & 0xff;
  const b = (rgb >>  0) & 0xff;

  const luminance = 0.2126 * (r) +
                    0.7152 * (g) +
                    0.0722 * (b);
                    
  // Use black text for light backgrounds and white text for dark backgrounds
  return luminance > 20 ? 'black' : 'white';
};

interface ColoredChipProps {
  label: string;
}

const ColoredChip: React.FC<ColoredChipProps & ChipProps> = ({ label, ...props }) => {
  const chipColor = generateChipColor(label);
  const contrastTextColor = getContrastText(chipColor);

  return <Chip label={label} sx={{ backgroundColor: chipColor, color: contrastTextColor }} {...props} />;
};

export default ColoredChip;
