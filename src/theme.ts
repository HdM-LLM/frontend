import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// A custom theme for this app
const theme = createTheme({
  palette: {
    background: {
      default: '#ffffff',
    },
    grey: {
      100: '#edf0f5',
    },
    primary: {
      main: '#1a1a1a',
    },
    secondary: {
      main: '#80b038',
    },
    error: {
      main: red.A400,
    },
  },
  spacing: 8, // 8 is the default value from MUI
});

export default theme;
