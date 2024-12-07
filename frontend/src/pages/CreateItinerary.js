import React, { useState, useEffect } from "react";
import { Box, Container, Typography, TextField, Button, Alert, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useItinerary } from "../context/ItineraryContext";
import DatePickerComp from "../components/DatePicker";
import ItineraryTable from "../components/ItineraryTable";
import { differenceInDays } from "date-fns";
import { useAuth } from "../context/AuthContext";

const CreateItinerary = () => {
  const { token } = useAuth();
  const [newItinerary, setNewItinerary] = useState({
    title: "",
    description: "",
    startDate: null,
    endDate: null,
    destinations: [],
    day: "",
  });

  const [destinations, setDestinations] = useState([]);
  const [newDestination, setNewDestination] = useState({
    day: "",
    destination: "",
    accommodation: "",
    activities: "",
  });

  const [lastDestination, setLastDestination] = useState({
    destination: "",
    accommodation: "",
  });

  const [usedDays, setUsedDays] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [partOneCompleted, setPartOneCompleted] = useState(false);

  const navigate = useNavigate();
  const { addItinerary } = useItinerary();

  const calculateDays = () => {
    if (newItinerary.startDate && newItinerary.endDate) {
      const days = differenceInDays(
        new Date(newItinerary.endDate),
        new Date(newItinerary.startDate)
      );
      return days >= 0 ? days + 1 : 0;
    }
    return 0;
  };

  const daysBetween = calculateDays();

  useEffect(() => {
    setNewDestination((prev) => ({
      ...prev,
      day: newItinerary.day || "",
    }));
  }, [newItinerary.day]);

  useEffect(() => {
    if (newItinerary.day && !editIndex) {
      setNewDestination((prev) => ({
        ...prev,
        day: newItinerary.day,
        destination: lastDestination.destination,
        accommodation: lastDestination.accommodation,
      }));
    }
  }, [newItinerary.day]);

  const handleAddDestination = () => {
    if (newDestination.day && newDestination.destination) {
      if (editIndex !== null) {
        setDestinations((prev) =>
          prev.map((dest, index) => (index === editIndex ? newDestination : dest))
        );
        setEditIndex(null);
      } else if (daysBetween && destinations.length < daysBetween) {
        setDestinations((prev) => [...prev, newDestination]);
      } else {
        alert("Não é possível adicionar mais destinos. O número máximo de dias foi atingido.");
      }

      if (!usedDays.includes(newDestination.day)) {
        setUsedDays((prev) => [...prev, newDestination.day]);
      }

      setLastDestination({
        destination: newDestination.destination,
        accommodation: newDestination.accommodation,
      });

      setNewDestination({
        day: "",
        destination: "",
        accommodation: "",
        activities: "",
      });
    } else {
      alert("Preencha os campos e selecione um dia.");
    }
  };

  const handleEditDestination = (index) => {
    setNewDestination(destinations[index]);
    setEditIndex(index);
  };

  const handleRemoveDestination = (index) => {
    const dayRemoved = destinations[index].day;
    setDestinations((prev) => prev.filter((_, i) => i !== index));
    setUsedDays((prev) => prev.filter((d) => d !== dayRemoved));
  };

  const handleSavePart1 = () => {
    if (
      newItinerary.title.trim() &&
      newItinerary.description.trim() &&
      newItinerary.startDate &&
      newItinerary.endDate &&
      daysBetween > 0
    ) {
      setPartOneCompleted(true);
    } else {
      alert("Preencha todos os campos");
    }
  };

  const handleSaveFinal = async () => {
    if (token && newItinerary?.title?.trim() && newItinerary?.description?.trim()) {
      setLoading(true);
      const startDateFormatted = newItinerary.startDate.toISOString().split('T')[0];
      const endDateFormatted = newItinerary.endDate.toISOString().split('T')[0];

      try {
        const response = await fetch("http://ec2-18-204-194-234.compute-1.amazonaws.com:8000/travel_itinerary/my_itineraries", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: newItinerary.title,
            description: newItinerary.description,
            start_date: startDateFormatted,
            end_date: endDateFormatted,
          }),
        });
        console.log({
          title: newItinerary.title,
          description: newItinerary.description,
          start_date: startDateFormatted,
          end_date: endDateFormatted,
        });

        if (!response.ok) {
          throw new Error("Erro ao criar o itinerário.");
        }

        const data = await response.json();
        console.log("Itinerário criado com sucesso:", data);
        navigate("/main");
      } catch (err) {
        setError(err.message || "Erro ao criar itinerário. Tente novamente.");
      } finally {
        setLoading(false);
      }
    } else {
      alert("Preencha todos os campos ou faça login.");
    }
  };


  const handleBack = () => {
    navigate(-1);
  };

  const availableDays = Array.from({ length: daysBetween }, (_, i) => i + 1);
  const filteredDays = availableDays.filter((d) => !usedDays.includes(d));

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box
        sx={{
          bgcolor: "#FFF",
          p: 4,
          boxShadow: 2,
          borderRadius: 2,
          position: "relative",
        }}
      > 

        <Button
          variant="contained"
          color="secondary"
          onClick={handleBack}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            zIndex: 10,
          }}
        >
          Voltar
        </Button>

        {/* PARTE 1 */}
        <Typography variant="h4" gutterBottom>
          Criar Novo Roteiro
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Typography variant="body2" sx={{ mb: 1 }}>Título do Roteiro</Typography>
        <TextField
          variant="outlined"
          fullWidth
          name="title"
          value={newItinerary.title}
          onChange={(e) =>
            setNewItinerary((prev) => ({ ...prev, title: e.target.value }))
          }
          sx={{ mb: 3 }}
/>

        <Typography variant="body2" sx={{ mb: 1 }}>Descrição da viagem</Typography>
        <TextField
          variant="outlined"
          fullWidth
          multiline
          name="description"
          rows={3}
          value={newItinerary.description}
          onChange={(e) =>
            setNewItinerary((prev) => ({ ...prev, description: e.target.value }))
          }
          sx={{ mb: 3 }}
        />

        <DatePickerComp newItinerary={newItinerary} setNewItinerary={setNewItinerary} />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSavePart1}
          sx={{ mb: 3 }}
        >
          Salvar
        </Button>

        <Divider sx={{ my: 3 }} />

        {/* PARTE 2 */}
        {partOneCompleted && (
          <>
            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
              Escolha um dia:
            </Typography>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 3 }}>
              {filteredDays.length > 0 ? (
                filteredDays.map((day) => (
                  <Button
                    key={day}
                    variant={newItinerary.day === day ? "contained" : "outlined"}
                    onClick={() =>
                      setNewItinerary((prev) => ({ ...prev, day }))
                    }
                  >
                    Dia {day}
                  </Button>
                ))
              ) : (
                <Typography variant="body2">
                  Todos os dias já foram adicionados.
                </Typography>
              )}
            </Box>

            <Typography variant="h6" gutterBottom>
              Roteiro por dia
            </Typography>

            <Typography variant="body2" sx={{ mb: 1 }}>Dia</Typography>
            <TextField
              value={newDestination.day}
              fullWidth
              sx={{ mb: 2 }}
              disabled
            />

            <Typography variant="body2" sx={{ mb: 1 }}>Destino</Typography>
            <TextField
              value={newDestination.destination}
              onChange={(e) =>
                setNewDestination((prev) => ({ ...prev, destination: e.target.value }))
              }
              fullWidth
              sx={{ mb: 2 }}
              disabled={!partOneCompleted}
            />

            <Typography variant="body2" sx={{ mb: 1 }}>Hospedagem</Typography>
            <TextField
              value={newDestination.accommodation}
              onChange={(e) =>
                setNewDestination((prev) => ({ ...prev, accommodation: e.target.value }))
              }
              fullWidth
              sx={{ mb: 2 }}
              disabled={!partOneCompleted}
            />

            <Typography variant="body2" sx={{ mb: 1 }}>Atividades</Typography>
            <TextField
              value={newDestination.activities}
              onChange={(e) =>
                setNewDestination((prev) => ({ ...prev, activities: e.target.value }))
              }
              fullWidth
              sx={{ mb: 2 }}
              disabled={!partOneCompleted}
            />

            <Button
              variant="contained"
              onClick={handleAddDestination}
              sx={{ mb: 3 }}
              disabled={!partOneCompleted}
            >
              Adicionar Destino
            </Button>

            <Typography variant="h6" gutterBottom>
              Lista de dias
            </Typography>

            <ItineraryTable
              destinations={destinations}
              onEditDestination={handleEditDestination}
              onRemoveDestination={handleRemoveDestination}
            />

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSaveFinal}
              disabled={!partOneCompleted || loading}
              sx={{ mt: 3 }}
            >
              {loading ? "Salvando..." : "Salvar"}
            </Button>
          </>
        )}
      </Box>
    </Container>
  );
};

export default CreateItinerary;