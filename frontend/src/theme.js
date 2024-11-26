import { createTheme } from "@mui/material/styles";
import "@fontsource/quicksand";


const theme = createTheme({
  palette: {
    primary: {
      main: "#FFB6C1",
    },
    secondary: {
      main: "#FFDEE9",
    },
    background: {
      default: "#FFF8F2",
    },
    text: {
      primary: "#444444", //texto escuro
      secondary: "#B39DDB", //roxinho
    },
  },
  typography: {
    fontFamily: "'Quicksand', sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
    },
    body1: {
      fontSize: "1rem",
      color: "#555555",
    },
  },
});

export default theme;
