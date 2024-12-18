import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ItineraryModal from "../components/ItineraryModal";

const Main = () => {
  const navigate = useNavigate();
  const { token, logout } = useAuth();
  
  // Definicao de estados locais
  const [itineraries, setItineraries] = useState([]);
  const [selectedItinerary, setSelectedItinerary] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [itineraryDetails, setItineraryDetails] = useState([]);

  // Buscar itinerários
  const searchItineraries = async () => {
    setLoading(true);
    setError(null);

    try {
      // Req GET para obter dados do itinerário
      const response = await fetch(
        "http://ec2-18-212-51-108.compute-1.amazonaws.com:8000/travel_itinerary/my_itineraries/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // token para autorização
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Erro no servidor:", errorText);
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      // Armazena itinerarios no estado
      const data = await response.json();
      setItineraries(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Erro ao buscar itinerários:", err);
      setError(err.message || "Erro ao buscar itinerários. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  // Excluir itinerário
  const handleDeleteItinerary = async (itineraryId) => {
    //Validação do token
    if (!token) {
      alert("Token inválido ou sessão expirada");
      logout();
      navigate("/login");
      return;
    }

    try {
      //  Req DELETE para excluir itinerario 
      const response = await fetch(
        `http://ec2-18-212-51-108.compute-1.amazonaws.com:8000/travel_itinerary/my_itineraries/${itineraryId}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Erro ao excluir itinerário:", errorText);
        throw new Error("Falha ao excluir o itinerário. Tente novamente.");
      }

      // Atualiza a lista local de itinerários
      setItineraries((prevItineraries) =>
        prevItineraries.filter((item) => item.id !== itineraryId)
      );

      alert("Itinerário excluído com sucesso!");
    } catch (err) {
      console.error("Erro ao excluir itinerário:", err.message || err);
      setError(err.message || "Erro ao excluir itinerário. Tente novamente.");
    }
  };

  // Buscar dados da parte 1 do itinerário
  const fetchItineraryDetails = async (id) => {
    // Validação do token
    if (!token) {
      alert("Token inválido ou sessão expirada");
      logout();
      navigate("/login");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Req GET para obter dados
      const response = await fetch(
        `http://ec2-18-212-51-108.compute-1.amazonaws.com:8000/travel_itinerary/my_itineraries/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Erro ao buscar detalhes do itinerário:", errorText);
        throw new Error("Erro ao buscar detalhes do itinerário.");
      }
      // Armazena e chama os dados da parte 2 e abre o modal
      const data = await response.json();
      setSelectedItinerary(data);
      fetchAdditionalItineraryDetails(id); 
      setModalOpen(true);
    } catch (err) {
      console.error("Erro ao buscar itinerário:", err);
      setError(err.message || "Erro ao buscar detalhes do itinerário.");
    } finally {
      setLoading(false);
    }
  };

  // Buscar dados da parte 2 do itinerário
  const fetchAdditionalItineraryDetails = async (itineraryId) => {
    try {
      // Req GET para obter dados
      const response = await fetch(
        `http://ec2-18-212-51-108.compute-1.amazonaws.com:8000/travel_itinerary/itinerary_items/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Erro ao buscar itens do itinerário:", errorText);
        throw new Error("Erro ao buscar itens do itinerário.");
      }

      const data = await response.json();

      // Filtra os itens correspondentes ao itinerário selecionado
      const filteredItems = data.filter(
        (item) => item.itinerary === itineraryId
      );

      setItineraryDetails(filteredItems);
    } catch (err) {
      console.error("Erro ao buscar itens do itinerário:", err);
      setError(err.message || "Erro ao buscar itens do itinerário.");
    }
  };

  // Carregar itinerários quando o componente for montado
  useEffect(() => {
    searchItineraries();
  }, []);

  // Abrir modal
  const handleOpenModal = (itinerary) => {
    fetchItineraryDetails(itinerary.id);
  };

  // Fechar modal
  const handleCloseModal = () => {
    setSelectedItinerary(null);
    setModalOpen(false);
    setItineraryDetails([]);
  };

  // Interface
  return (
    <Box sx={{ bgcolor: "#f9f9f9", minHeight: "100vh" }}>
      <Box
        sx={{
          textAlign: "center",
          py: 8,
          bgcolor: "cobalto_claro.main",
          color: "text.white",
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
          sx={{ mb: 4, width: "300px", height: "30px", fontSize: "1.2rem" }}
        >
          Criar Novo Roteiro
        </Button>

        {loading ? (
          <Typography variant="h6" color="textsecondary">
            Carregando...
          </Typography>
        ) : error ? (
          <Typography variant="h6" color="error">
            {error}
          </Typography>
        ) : itineraries.length === 0 ? (
          <Typography variant="h6" color="textsecondary">
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
                    maxWidth: "600px",
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
                    sx={{
                      flexGrow: 1,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.description || "Sem descrição"}
                  </Typography>
                  <Box mt={2} display="flex" justifyContent="flex-end">
                    <IconButton
                      color="secondary"
                      onClick={() => handleOpenModal(item)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteItinerary(item.id)}
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
        details={itineraryDetails}
      />
    </Box>
  );
};

export default Main;


