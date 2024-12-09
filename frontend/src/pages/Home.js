import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import wallpaper from "../images/wallpaper.jpg";

const Main = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/signup");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: "#ffffff",
        overflow: "hidden",
      }}
    >

      <Box
        sx={{
          height: "60vh",
          backgroundImage: `url(${wallpaper})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Box
        sx={{
          textAlign: "center",
          py: 6, 
          backgroundColor: "Quinary",
          color: "#003366",
          flexGrow: 1, 
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
          onClick={handleClick}
          sx={{
            fontSize: "1.2rem",
            padding: "16px 32px",
            minWidth: "250px",
          }}
        >
          Cadastre-se ✈️
        </Button>
      </Box>

      {/* Rodapé fixado no final */}
      <Box
        sx={{
          backgroundColor: "cobalto_claro.main",
          py: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="body2" color="white">
          © 2024 Roteiros Incríveis. Todos os direitos reservados.
        </Typography>
      </Box>
    </div>
  );
};

export default Main;