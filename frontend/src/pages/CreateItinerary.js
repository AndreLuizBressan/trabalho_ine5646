import React, { useState } from "react";
import { Box, Container, Typography, TextField, Button, Alert, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useItinerary } from "../context/ItineraryContext"
import DatePickerComp from "../components/DatePicker";
import ItineraryTable from "../components/ItineraryTable";

const CreateItinerary = () => {
  const [newItinerary, setNewItinerary] = useState({ 
    title: "", 
    description: "",
    startDate: null,
    destinations: [],
  });
  const [destinations, setDestinations] = useState([]);
  const [newDestination, setNewDestination] = useState({
    day: "",
    destination: "",
    accommodation: "",
    activities: "",
  });

  // const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { addItinerary } = useItinerary();

  //table
  const handleAddDestination = () => {
    if (newDestination.day && newDestination.destination) {
      setDestinations((prev) => [...prev, newDestination]);
      setNewDestination({ day: "", destination: "", accommodation: "", activities: "" });
    } else {
      alert("Preencha os campos");
    }
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
          error={!!error && !newItinerary.trim()}
          helperText={!!error && !newItinerary.trim() ? "Por favor, insira um título." : ""}
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
        />
        <TextField
          label="Destino"
          value={newDestination.destination}
          onChange={(e) => setNewDestination((prev) => ({ ...prev, destination: e.target.value }))}
          fullWidth
          halfWidth
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
          Adicionar Destino
        </Button>

        <ItineraryTable
          destinations={destinations}
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
