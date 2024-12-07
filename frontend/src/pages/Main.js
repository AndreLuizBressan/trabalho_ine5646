import React, {useState, useEffect} from "react";
import { Box, Container, Typography, Button, Grid, Paper, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useItinerary } from "../context/ItineraryContext";
import DeleteIcon from "@mui/icons-material/Delete";
import ItineraryModal from "../components/ItineraryModal";
import VisibilityIcon from '@mui/icons-material/Visibility';

const Main = () => {
  const navigate = useNavigate();
  const { itineraries, searchItineraries, deleteItinerary } = useItinerary();

  // modal
  const [selectedItinerary, setSelectedItinerary] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    searchItineraries();
  }, [searchItineraries]);

  const handleOpenModal = (itinerary) => {
    setSelectedItinerary(itinerary);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedItinerary(null);
    setModalOpen(false);
  };
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


        {itineraries.length === 0 ? (
          <Typography variant="h6" color="textSecondary">
            Não há roteiros criados ainda. Comece criando um novo!
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {itineraries.map((item) => (
              <Grid item xs={12} sm={8} md={6} key={item.id}>
                <Paper
                  elevation={4}
                  sx={{
                    p: 4,
                    width:"100%px",
                    maxWidth: "500px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "left",
                  }}
                >
                  <Typography variant="h4" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography 
                    variant="h6" 
                    color="textSecondary"
                    sx={{ flexGrow: 1, overflow: "hidden", textOverflow: "ellipsis" }}
                    >
                     {item.description || "Sem descrição"}
                  </Typography>
                  <Box mt={2} display="flex" justifyContent="flex-end">
                  <IconButton
                      color="primary"
                      onClick={() => handleOpenModal(item)}
                    >
                      <VisibilityIcon />
                    </IconButton>
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
          </Grid>
        )}
      </Container>

      <ItineraryModal
        open={modalOpen}
        onClose={handleCloseModal}
        itinerary={selectedItinerary}
      />
      
    </Box>
  );
};

export default Main;
