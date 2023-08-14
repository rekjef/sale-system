import { createTheme, PaletteColor, PaletteColorOptions } from "@mui/material";

// Extend the PaletteOptions interface to include btnGrey
declare module "@mui/material/styles" {
  interface Palette {
    btnGrey: PaletteColor;
  }
  interface PaletteOptions {
    themeWhite: PaletteColorOptions;
    themeBackground: PaletteColorOptions;
    themeAvatarBackground: PaletteColorOptions;
    btnGrey: PaletteColorOptions;
  }
}

const { palette } = createTheme();
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#FFA451",
    },
    secondary: {
      main: "#253036",
    },
    info: {
      main: "#4CAF50",
    },
    btnGrey: {
      main: "#b9b9b9",
      contrastText: "#253036",
    },
    themeWhite: palette.augmentColor({ color: { main: "#fff" } }),
    themeBackground: palette.augmentColor({ color: { main: "#f1f1f1" } }),
    themeAvatarBackground: palette.augmentColor({ color: { main: "#282c34" } }),
  },
});

export default theme;
