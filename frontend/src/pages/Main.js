import React from "react";
import { Box, Container, Typography, Button, Grid, Paper, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useItinerary } from "../context/ItineraryContext";
import DeleteIcon from "@mui/icons-material/Delete";

const Main = () => {
  const navigate = useNavigate();
  const { itineraries, deleteItinerary } = useItinerary();

  return (
    <Box sx={{ bgcolor: "#f9f9f9", minHeight: "100vh" }}>
      <Box
        sx={{
          textAlign: "center",
          py: 8,
          bgcolor: "#FFB6C1",
          color: "#FFF",
        }}
      >
        <Typography variant="h3" gutterBottom>
          Meus Roteiros
        </Typography>
      </Box>
      <Container sx={{ my: 4 }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/create")}
          sx={{ mb: 4 }}
        >
          Criar Novo Roteiro
        </Button>
          {itineraries.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {/* Acesse as propriedades corretamente */}
              <Typography variant="h6" gutterBottom>
                {item.title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {item.description || "Sem descrição"}
              </Typography>
              <Box mt={2} display="flex" justifyContent="flex-end">
                <IconButton
                  color="error"
                  onClick={() => deleteItinerary(item.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Container>
    </Box>
  );
};

export default Main;
