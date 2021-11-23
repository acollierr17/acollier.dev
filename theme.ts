import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const theme = extendTheme({
  fonts: {
    heading: 'Raleway',
    body: 'Mulish',
  },
  config: {
    initialColorMode: 'system',
    useSystemColorMode: true,
  },
  colors: {
    brand: {
      main: '#dd9323',
      50: '#fff3de',
      100: '#f8deb8',
      200: '#efc98e',
      300: '#e7b363',
      400: '#e09d38',
      500: '#c7841f',
      600: '#9b6716',
      700: '#6f490e',
      800: '#432c03',
      900: '#1b0e00',
    },
    github: {
      main: '#c9510c',
      50: '#ffedde',
      100: '#ffcfb2',
      200: '#faaf85',
      300: '#f69056',
      400: '#f27126',
      500: '#d9570d',
      600: '#a94408',
      700: '#792f04',
      800: '#4a1b00',
      900: '#1f0700',
    },
    discord: {
      main: '#7289da',
      50: '#e8eeff',
      100: '#c0ccf3',
      200: '#99aae5',
      300: '#7289da',
      400: '#4a67ce',
      500: '#314db5',
      600: '#253c8d',
      700: '#1a2b66',
      800: '#0d1a40',
      900: '#01091b',
    },
    youtube: {
      main: '#ff0000',
      50: '#ffe1e1',
      100: '#ffb1b1',
      200: '#ff7f7f',
      300: '#ff4c4c',
      400: '#ff1a1a',
      500: '#e60000',
      600: '#b40000',
      700: '#810000',
      800: '#500000',
      900: '#210000',
    },
  },
  styles: {
    global: (props) => ({
      body: {
        bg: mode('white', '#111111')(props),
      },
    }),
  },
});

export default theme;
