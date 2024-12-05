import React, { useState, useEffect } from "react";
import { TextField, Box, Typography, Button } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ptBR } from "date-fns/locale";
import { differenceInDays } from "date-fns";

const DatePickerComp = ({ newItinerary, setNewItinerary }) => {
  const [destinations, setDestinations] = useState([]);

  // Calcula diferença de dias
  const calculateDays = () => {
    if (newItinerary.startDate && newItinerary.endDate) {
      const days = differenceInDays(new Date(newItinerary.endDate), new Date(newItinerary.startDate));
      return days >= 0 ? days + 1 : 0; // Inclui o último dia
    }
    return 0;
  };

  const daysBetween = calculateDays();

  // Atualiza automaticamente os dias assim que as datas são calculadas
  useEffect(() => {
    if (daysBetween > 0) {
      const daysArray = Array.from({ length: daysBetween }, (_, i) => ({
        day: i + 1,
      }));
      setDestinations(daysArray);
    } else {
      setDestinations([]);
    }
  }, [daysBetween]);

  // Função para preencher o campo "Dia"
  const handleDaySelection = (day) => {
    setNewItinerary((prev) => ({ ...prev, day }));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBR}>
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <DatePicker
          label="Data de início"
          value={newItinerary.startDate}
          onChange={(newValue) =>
            setNewItinerary((prev) => ({ ...prev, startDate: newValue }))
          }
          renderInput={(params) => <TextField fullWidth {...params} />}
          format="dd/MM/yyyy" // Define o formato da data
        />
        <DatePicker
          label="Data de fim"
          value={newItinerary.endDate}
          onChange={(newValue) =>
            setNewItinerary((prev) => ({ ...prev, endDate: newValue }))
          }
          renderInput={(params) => <TextField fullWidth {...params} />}
          format="dd/MM/yyyy" // Define o formato da data
        />
      </Box>

      {daysBetween > 0 && (
        <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
          Duração: {daysBetween} {daysBetween === 1 ? "dia" : "dias"}
        </Typography>
      )}

      {/* Renderiza os botões para cada dia */}
      {destinations.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">Escolha um dia:</Typography>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 1 }}>
            {destinations.map((dest) => (
              <Button
                key={dest.day}
                variant={newItinerary.day === dest.day ? "contained" : "outlined"}
                onClick={() => handleDaySelection(dest.day)}
              >
                Dia {dest.day}
              </Button>
            ))}
          </Box>
        </Box>
      )}
    </LocalizationProvider>
  );
};

export default DatePickerComp;