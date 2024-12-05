import React from "react";
import { Box, Container, Typography, Button, Grid } from "@mui/material";
import DestinationCard from "../components/DestinationCard";
import sea from '../images/sea.jpg';
import trip from '../images/trip.jpg';
import sf from '../images/sanFrancisco.jpg';
import { useNavigate } from "react-router-dom"; // Importar o hook useNavigate

const Main = () => {
  const navigate = useNavigate(); // Inicializando o hook de navegação

  const handleClick = () => {
    navigate("/signup"); // Redireciona para a página de cadastro
  };

  const destinations = [
    {
      title: "Caribe",
      image: sea,
      description: "Praias paradisíacas e águas cristalinas.",
    },
    {
      title: "Costa Rica",
      image: trip,
      description: "Praias deslumbrantes e natureza rica.",
    },
    {
      title: "USA",
      image: sf,
      description: "Modernidade e experiências inesquecíveis.",
    },
  ];

  return (
    <div>
      <Box
        sx={{
          textAlign: "center",
          py: 8,
          backgroundColor: "text.secondary",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#fff",
        }}
      >
        <Typography variant="h3" gutterBottom>
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
        >
          Cadastre-se e descubra o mundo ✈️
        </Button>
      </Box>

      <Container sx={{ py: 5 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Destinos Populares
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {destinations.map((dest, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <DestinationCard
                title={dest.title}
                image={dest.image}
                description={dest.description}
              />
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box sx={{ py: 5, textAlign: "center", bgcolor: "#f5f5f5" }}>
        <Typography variant="h4" gutterBottom>
          Depoimentos
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontStyle: "italic",
            marginBottom: 1,
            maxWidth: 600,
            marginX: "auto",
          }}
        >
          "Foi uma experiência incrível!"
        </Typography>
        <Typography variant="body2" color="text.secondary">
          - Gisele Bundchen
        </Typography>
      </Box>
    </div>
  );
};

export default Main;
