import React, { useState, useEffect } from "react";
import { Box, Container, Typography, TextField, Button, Alert, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useItinerary } from "../context/ItineraryContext";
import DatePickerComp from "../components/DatePicker";
import ItineraryTable from "../components/ItineraryTable";
import { differenceInDays } from "date-fns"; // Importação da função

const CreateItinerary = () => {
  const [newItinerary, setNewItinerary] = useState({
    title: "",
    description: "",
    startDate: null,
    endDate: null,
    destinations: [],
  });
  const [destinations, setDestinations] = useState([]);
  const [newDestination, setNewDestination] = useState({
    day: "",
    destination: "",
    accommodation: "",
    activities: "",
  });
  const [editIndex, setEditIndex] = useState(null); // Novo estado para controlar edição
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { addItinerary } = useItinerary();

  // Função para calcular os dias
  const calculateDays = () => {
    if (newItinerary.startDate && newItinerary.endDate) {
      const days = differenceInDays(new Date(newItinerary.endDate), new Date(newItinerary.startDate));
      return days >= 0 ? days : 0;
    }
    return null;
  };

  const daysBetween = calculateDays();

  // Limitar o número de destinos com base na quantidade de dias
  useEffect(() => {
    if (daysBetween !== null && daysBetween > 0) {
      setNewDestination((prev) => ({
        ...prev,
        day: 1, // Começar o preenchimento com o primeiro dia
      }));
    }
  }, [daysBetween]);

  const handleAddDestination = () => {
    if (newDestination.day && newDestination.destination) {
      if (editIndex !== null) {
        // Atualizar destino em vez de adicionar
        setDestinations((prev) => prev.map((dest, index) => (index === editIndex ? newDestination : dest)));
        setEditIndex(null);
      } else if (destinations.length < daysBetween) { // Limita o número de destinos aos dias da viagem
        setDestinations((prev) => [...prev, newDestination]);
      } else {
        alert("Não é possível adicionar mais destinos. O número máximo de dias foi atingido.");
      }

      // Resetar campos
      setNewDestination({
        day: destinations.length + 1,
        destination: "",
        accommodation: "",
        activities: "",
      });
    } else {
      alert("Preencha os campos");
    }
  };

  const handleEditDestination = (index) => {
    setNewDestination(destinations[index]);
    setEditIndex(index);
  };

  const handleRemoveDestination = (index) => {
    setDestinations((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (newItinerary?.title?.trim() && newItinerary?.description?.trim()) {
      addItinerary(newItinerary);
      navigate("/main");
    } else {
      alert("Preencha todos os campos");
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box
        sx={{
          bgcolor: "#FFF",
          p: 4,
          boxShadow: 2,
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Criar Novo Roteiro
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          label="Título do Roteiro"
          variant="outlined"
          fullWidth
          value={newItinerary.title}
          onChange={(e) =>
            setNewItinerary((prev) => ({ ...prev, title: e.target.value }))
          }
          sx={{ mb: 3 }}
        />

        <TextField
          label="Descrição da viagem"
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          value={newItinerary.description}
          onChange={(e) =>
            setNewItinerary((prev) => ({ ...prev, description: e.target.value }))
          }
          sx={{ mb: 3 }}
        />

        <DatePickerComp
          newItinerary={newItinerary}
          setNewItinerary={setNewItinerary}
        />

        <Divider sx={{ my: 3 }} />

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Roteiro por dia
          </Typography>

          <TextField
            label="Dia"
            value={newDestination.day}
            onChange={(e) => setNewDestination((prev) => ({ ...prev, day: e.target.value }))}
            halfWidth
            sx={{ mb: 2 }}
            disabled // Desabilita para impedir alteração manual
          />
          <TextField
            label="Destino"
            value={newDestination.destination}
            onChange={(e) => setNewDestination((prev) => ({ ...prev, destination: e.target.value }))}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Hospedagem"
            value={newDestination.accommodation}
            onChange={(e) =>
              setNewDestination((prev) => ({ ...prev, accommodation: e.target.value }))
            }
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Atividades"
            value={newDestination.activities}
            onChange={(e) =>
              setNewDestination((prev) => ({ ...prev, activities: e.target.value }))
            }
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button variant="contained" onClick={handleAddDestination} sx={{ mb: 3 }}>
            {editIndex !== null ? "Salvar Alterações" : "Adicionar Destino"}
          </Button>

          <ItineraryTable
            destinations={destinations}
            onEditDestination={handleEditDestination}
            onRemoveDestination={handleRemoveDestination}
          />
        </Box>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? "Salvando..." : "Salvar"}
        </Button>
      </Box>
    </Container>
  );
};

export default CreateItinerary;
