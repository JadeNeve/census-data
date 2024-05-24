import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    background: {
      main: '#F8F8F8',
    },
    text: {
      main: '#273757',
      white: '#FFFFFF',
      black: '#000000',
      disabled: '#9699A5',
    },
    button: {
      main: '#273757',
      disabled: '#ECECED'
    },
    input: {
      borderColor: '#BABAC1',
      placeholder: '#9699A5',
      text: '#273757'
    }
  },
  typography: {
    fontFamily: '"Karla", sans-serif',
    fontWeightExtraBold: 700,
    fontWeightBold: 500,
    fontWeightLight: 100,
    fontWeightRegular: 400,
    fontSize: {
      mainHeader: '34px',
      subHeader: '24px',
      largeText: '20px',
      midText: '18px',
      regularText: '16px',
      tinyText: '14px',
    },
  },
});

export default theme;
