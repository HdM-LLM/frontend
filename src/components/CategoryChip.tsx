import React from 'react';
import { Chip, ChipProps } from '@mui/material';

/**
 * Generates a color based on the hash value of the first two characters of a given string.
 * @param {string} name - The input string from which to generate the chip color.
 * @returns {string} The generated hexadecimal color code.
 */
const generateChipColor = (name: string) => {
  const truncatedName = name.slice(0, 2);
  const hash = truncatedName
    .split('')
    .reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) & 0xfffff, 0);
  const color = `#${hash.toString(16)}`;
  return color;
};

/**
 * Determines the appropriate text color (black or white) for given background color to ensure adequate contrast.
 * @param {string} backgroundColor - The hexadecimal color code of the background.
 * @returns {string} The color code ('black' or 'white') that ensures the best contrast.
 */
const getContrastText = (backgroundColor: string) => {
  // Calculate the relative luminance of the color
  const hexColor = backgroundColor.substring(1); // Remove the leading '#'
  const rgb = parseInt(hexColor, 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;

  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  // Use black text for light backgrounds and white text for dark backgrounds
  return luminance > 20 ? 'black' : 'white';
};

interface ColoredChipProps {
  label: string;
}

/**
 * Functional component that renders a Material UI Chip with dynamically generated background and text colors.
 * @param {ColoredChipProps & ChipProps} props - Props including `label` for the chip's display text and additional `ChipProps`.
 * @returns {JSX.Element} A Material UI Chip component with customized styling.
 */
const ColoredChip: React.FC<ColoredChipProps & ChipProps> = ({ label, ...props }) => {
  const chipColor = generateChipColor(label);
  const contrastTextColor = getContrastText(chipColor);

  return (
    <Chip label={label} sx={{ backgroundColor: chipColor, color: contrastTextColor }} {...props} />
  );
};

export default ColoredChip;
