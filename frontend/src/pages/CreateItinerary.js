import React, { useState, useEffect } from "react";
import { Box, Container, Typography, TextField, Button, Alert, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useItinerary } from "../context/ItineraryContext";
import DatePickerComp from "../components/DatePicker";
import ItineraryTable from "../components/ItineraryTable";
import { differenceInDays } from "date-fns";
import { useAuth } from "../context/AuthContext";

const CreateItinerary = () => {
  const { token, logout } = useAuth();
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
    actions: "",
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
        actions: "",
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
    const authToken = token || localStorage.getItem("authToken");

    if (!authToken) {
      alert("Token inválido ou sessão expirada");
      logout();
      navigate("/login");
      return;
    }

    setLoading(true);

    const startDateFormatted = newItinerary.startDate.toISOString().split("T")[0];
    const endDateFormatted = newItinerary.endDate.toISOString().split("T")[0];

    try {
      const itineraryResponse = await fetch(
        "http://ec2-18-212-51-108.compute-1.amazonaws.com:8000/travel_itinerary/my_itineraries/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            title: newItinerary.title,
            description: newItinerary.description,
            start_date: startDateFormatted,
            end_date: endDateFormatted,
          }),
        }
      );

      if (itineraryResponse.status === 401) {
        alert("Sessão expirada. Faça login de novo.");
        logout();
        navigate("/login");
        return;
      }

      if (!itineraryResponse.ok) {
        const errorText = await itineraryResponse.text();
        console.error("Resposta do servidor:", errorText);
        throw new Error("Erro ao criar o itinerário.");
      }

      const itineraryData = await itineraryResponse.json();
      const itineraryId = itineraryData.id;

      console.log("Itinerário criado com sucesso:", itineraryData);

      const saveDestinations = destinations.map(async (destination) => {
        const destinationResponse = await fetch(
          "http://ec2-18-212-51-108.compute-1.amazonaws.com:8000/travel_itinerary/itinerary_items/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({
              day: destination.day,
              destination: destination.destination,
              accommodation: destination.accommodation,
              activities: destination.activities,
              actions: destination.actions || "No actions provided",
              itinerary: itineraryId,
            }),
          }
        );

        if (!destinationResponse.ok) {
          const errorText = await destinationResponse.text();
          console.error("Erro ao salvar destino:", errorText);
          throw new Error("Erro ao salvar os destinos no itinerário.");
        }

        console.log("Destino salvo com sucesso:", await destinationResponse.json());
      });

      await Promise.all(saveDestinations);

      navigate("/main");
    } catch (err) {
      console.error("Erro:", err);
      setError(err.message || "Erro ao criar itinerário. Tente novamente.");
    } finally {
      setLoading(false);
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

        <Typography variant="h4" gutterBottom>
          Criar Novo Roteiro
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Typography variant="body2" sx={{ mb: 1 }}>
          Título do Roteiro
        </Typography>
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

        <Typography variant="body2" sx={{ mb: 1 }}>
          Descrição da viagem
        </Typography>
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
          color="secondary"
          fullWidth
          onClick={handleSavePart1}
          sx={{ mb: 3 }}
        >
          Salvar
        </Button>

        <Divider sx={{ my: 3 }} />

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
                    color="secondary"
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

            <Typography variant="body2" sx={{ mb: 1 }}>
              Dia
            </Typography>
            <TextField
              value={newDestination.day}
              fullWidth
              sx={{ mb: 2 }}
              disabled
            />

            <Typography variant="body2" sx={{ mb: 1 }}>
              Destino
            </Typography>
            <TextField
              value={newDestination.destination}
              onChange={(e) =>
                setNewDestination((prev) => ({ ...prev, destination: e.target.value }))
              }
              fullWidth
              sx={{ mb: 2 }}
              disabled={!partOneCompleted}
            />

            <Typography variant="body2" sx={{ mb: 1 }}>
              Hospedagem
            </Typography>
            <TextField
              value={newDestination.accommodation}
              onChange={(e) =>
                setNewDestination((prev) => ({ ...prev, accommodation: e.target.value }))
              }
              fullWidth
              sx={{ mb: 2 }}
              disabled={!partOneCompleted}
            />

            <Typography variant="body2" sx={{ mb: 1 }}>
              Atividades
            </Typography>
            <TextField
              value={newDestination.activities}
              onChange={(e) =>
                setNewDestination((prev) => ({ ...prev, activities: e.target.value }))
              }
              fullWidth
              sx={{ mb: 2 }}
              disabled={!partOneCompleted}
            />
            <Typography variant="body2" sx={{ mb: 1 }}>
              Observações importantes
            </Typography>
            <TextField
              value={newDestination.actions}
              onChange={(e) =>
                setNewDestination((prev) => ({ ...prev, actions: e.target.value }))
              }
              fullWidth
              sx={{ mb: 2 }}
              disabled={!partOneCompleted}
            />
            <Button
              variant="contained"
              color="secondary"
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
              color="secondary"
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
