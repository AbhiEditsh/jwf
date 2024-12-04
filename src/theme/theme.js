import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Outfit, sans-serif",
  },
  palette: {
    primary: {
      main: "#d2b955",
    },
    secondary: {
      main: "#EEE2B5",
    },
    black: {
      main: "#000",
    },
    white: {
      main: "#fff",
    },
    grey: {
      main: "#808080",
    },
    lightgrey: {
      main: "#f4f6f6",
    },
  },
});

export default theme;
