import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2e007f',
    },
    secondary: {
      main: '#ffffff',
    },
    background: {
      default: '#2e007f',
      paper: '#ffffff',
    },
    text: {
      primary: '#ffffff',
      secondary: '#2e007f',
    },
  },
  typography: {
    fontFamily: [
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontFamily: 'Dharma Gothic E, Arial, sans-serif',
      fontSize: '3.5rem',
    },
    h2: {
      fontFamily: 'Eurostile Extended, Arial, sans-serif',
      fontSize: '1.2rem',
    },
    body1: {
      fontFamily: 'Nudista, Arial, sans-serif',
    },
    button: {
      fontFamily: 'Euro Style, Arial, sans-serif',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '5px',
          textTransform: 'none',
          padding: '15px 30px',
          fontSize: '1.2rem',
          transition: 'background-color 0.3s ease, transform 0.3s ease',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
          },
        },
      },
    },
  },
});

export default theme;