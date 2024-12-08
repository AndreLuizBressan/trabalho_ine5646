import { createTheme } from "@mui/material/styles";
import "@fontsource/quicksand";
import { fontWeight } from "@mui/system";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFFFFF",
    },
    secondary: {
      main: "#0047AB",
    },
    terciary: {
      main: "#99B8E4",
    },
    cobalto_claro: {
      main: "#6692D1"
    },
    background: {
      default: "#FFF8F2",
    },
    text: {
      primary: "#0047AB", // texto azul
      secondary: "#0047AB",
      terciary: "#000000",
      white: "#FFFFFF",
      cinza: "#808080",
      roxo: "#9966CC",
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
    impacto: {
        fontSize: "3rem",
        fontWeight: "bold",
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          transition: "transform 0.3s ease", // Suaviza o efeito de transformação
          "&:hover": {
            transform: "scale(1.1)", // Aumenta o botão em 10% ao passar o mouse
          },
        },
      },
    },
  },
});

export default theme;