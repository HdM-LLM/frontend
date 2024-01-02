import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// A custom theme for this app
const theme = createTheme({
  palette: {
    background: {
      default: '#ffffff',
    },
    grey: {
      100: '#f5f5f5',
    },
    primary: {
      main: '#4d4d4d',
    },
    secondary: {
      main: '#B4CD93',
    },
    error: {
      main: red.A400,
    },
  },
  spacing: 8, // 8 is the default value from MUI
});

export default theme;
