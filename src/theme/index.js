import { createTheme } from '@material-ui/core/styles';

const palette = {
  primary: { main: '#FFFFFF' },
  secondary: { main: '#FFFFFF' },
  ui: { main: '#FFFFFF' },
  contrastThreshold: 3,
  tonalOffset: 0.2,
};

const typography = {
  useNextVariants: true
};

export default createTheme({ palette, typography });
