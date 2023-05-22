import { colors, createTheme } from '@mui/material';
import createTypography from '@mui/material/styles/createTypography';
import createPalette from '@mui/material/styles/createPalette';

export const typographyConstants = {
  fontFamily: '"proxima-nova", "Helvetica Neue", Arial, Helvetica, sans-serif',
  fontSize: 12,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500
};
const palette = createPalette({ mode: 'light' });

const typography = createTypography(palette, typographyConstants);

const themeOptions = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          padding: 0
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: 'white'
        }
      }
    }
  },
  typography,
  palette: {
    background: {
      default: '#a6a6a6',
      paper: colors.common.white,
      gradient:
        'linear-gradient(90deg, rgba(29,53,134,1) 0%, rgba(123,103,246,1) 50%, rgba(0,238,145,1) 100%)'
    },
    primary: {
      main: '#188CFB'
    },
    secondary: {
      main: '#00ee91',
      contrastText: '#1d3586'
    },
    success: {
      main: '#00ee91'
    },
    error: {
      main: '#ff0019'
    },
    text: {
      primary: colors.common.black
    }
  }
});

export { themeOptions };
