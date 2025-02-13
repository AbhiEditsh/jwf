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
    darkGrey: {
      main: "#e1e1e1",
    },
    red:{
      main:"#FF0000"
    }
  },
});

export default theme;
