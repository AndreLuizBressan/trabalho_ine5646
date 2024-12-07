import { createTheme } from "@mui/material/styles";
import "@fontsource/quicksand";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFFFF",
    },
    secondary: {
      main: "#0047AB",
    },
    background: {
      default: "#FFF8F2",
    },
    text: {
      primary: "#0047AB", // texto azul
      secondary: "#0047AB", // 
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
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          transition: "transform 0.3s ease",  // Suaviza o efeito de transformação
          "&:hover": {
            transform: "scale(1.1)",  // Aumenta o botão em 10% ao passar o mouse
          },
        },
      },
    },
  },
});

export default theme;
