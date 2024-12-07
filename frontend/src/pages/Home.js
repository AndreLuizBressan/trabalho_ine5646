import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom"; // use navigate
import wallpaper from "../images/wallpaper.jpg";
const Main = () => {
  const navigate = useNavigate(); // inicializa o hook de navegação

  const handleClick = () => {
    navigate("/signup"); // redireciona p pág de cadastro
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", 
        backgroundColor: "#ffffff", // branco
      }}
    >
      {/* Imagem como banner */}
      <Box
        sx={{
          height: "60vh",
          backgroundImage: `url(${wallpaper})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Box logo abaixo da imagem */}
      <Box
        sx={{
          textAlign: "center",
          py: 8,
          backgroundColor: "#FAF9F6", 
          color: "#003366", 
        }}
      >
        <Typography variant="h4" gutterBottom>
          Explore o Mundo com Roteiros Incríveis
        </Typography>
        <Typography variant="h6" gutterBottom>
          Descubra os melhores destinos e crie memórias para a vida!
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={handleClick} // Chama a função de navegação ao clicar
          sx={{
            fontSize: '1.2rem', 
            padding: '16px 32px',
            minWidth: '250px',
          }}
        >
          Cadastre-se ✈️
        </Button>

      </Box>
    </div>
  );
};

export default Main;
