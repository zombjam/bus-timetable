import { extendTheme } from '@chakra-ui/react';

const fonts = {
  body: '"Noto Sans TC", "system-ui", sans-serif',
};

const colors = {
  primary: {
    200: '#EEEAF9',
    300: '#C6B7EA',
    400: '#9D83DB',
    600: '#7550CC',
    700: '#37206D',
    800: '#0D081A',
  },
  gray: {
    100: '#FFFFFF',
    200: '#F5F5F5',
    300: '#EEEFF1',
    400: '#CACCD2',
    500: '#A6AAB4',
    600: '#6F7585',
    700: '#545963',
    800: '#36393F',
    900: '#1F1F1F',
    bg: '#F3F3F3',
    bgDeep: '#E5E5E5',
  },
  secondary: {
    pink: '#FFCCAC',
    blue: '#78CCDE',
    yellow: '#FFF0B7',
  },
  status: {
    error: '#FB5B44',
    warn: '#FB9232',
    success: '#12B76A',
  },
  keyboard: {
    blue: '#448DFB',
    brown: '#D4A274',
    yellow: '#ECC94C',
  },
  gradient: {
    normal: 'linear-gradient(63.44deg, #53389E 16.72%, #7F56D9 83.39%)',
    deep: 'linear-gradient(45deg, #42307D 0%, #7F56D9 100%)',
    dark: 'linear-gradient(60.96deg, #493289 2.55%, #6A45C5 100%)',
  },
};

const shadows = {
  base: '0px 12px 16px -4px rgba(16, 24, 40, 0.1), 0px 4px 6px -2px rgba(16, 24, 40, 0.05)',
};

const theme = extendTheme({
  styles: {
    global: {
      html: {
        w: 'full',
        h: 'full',
      },
      body: {
        w: 'full',
        h: 'full',
        color: 'primary.800',
      },
      '#root': {
        w: 'full',
        h: 'full',
        bg: 'gray.200',
        '> div': {
          bg: 'gray.200',
        },
      },
      // _focus: {
      //   borderColor: '#7550CC !important',
      //   boxShadow: '0 0 0 1px #7550CC !important',
      // },
    },
  },
  fonts,
  colors,
  shadows,
});

export default theme;
