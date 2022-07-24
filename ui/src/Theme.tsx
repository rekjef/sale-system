import { createTheme, PaletteColorOptions } from '@mui/material';
import { amber, blue } from '@mui/material/colors';

declare module '@mui/material/styles' {
  interface Palette {
    themeWhite: PaletteColorOptions;
    themeBackground: PaletteColorOptions;
    themeAvatarBackground: PaletteColorOptions;
  }
  interface PaletteOptions {
    themeWhite: PaletteColorOptions;
    themeBackground: PaletteColorOptions;
    themeAvatarBackground: PaletteColorOptions;
  }
}

const primaryColor = blue[800];
const secondaryColor = amber[700];

const { palette } = createTheme();
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: primaryColor,
    },
    secondary: {
      main: secondaryColor,
    },
    themeWhite: palette.augmentColor({ color: { main: '#fff' } }),
    themeBackground: palette.augmentColor({ color: { main: '#f1f1f1' } }),
    themeAvatarBackground: palette.augmentColor({ color: { main: '#282c34' } }),
  },
});

export default theme;
