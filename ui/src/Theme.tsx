import { createTheme, PaletteColorOptions } from "@mui/material";

declare module "@mui/material/styles" {
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

const { palette } = createTheme();
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#F39C12",
    },
    secondary: {
      main: "#3a4e58",
    },
    info: {
      main: "#4CAF50",
    },
    themeWhite: palette.augmentColor({ color: { main: "#fff" } }),
    themeBackground: palette.augmentColor({ color: { main: "#f1f1f1" } }),
    themeAvatarBackground: palette.augmentColor({ color: { main: "#282c34" } }),
  },
});

export default theme;
