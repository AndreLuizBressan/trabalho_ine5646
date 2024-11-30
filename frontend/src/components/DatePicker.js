import React from "react";
import { TextField, Box, Typography } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ptBR } from "date-fns/locale";
import { differenceInDays } from "date-fns";

const DatePickerComp = ({ newItinerary, setNewItinerary }) => {
  //calcula diferenca de dias
  const calculateDays = () => {
    if (newItinerary.startDate && newItinerary.endDate) {
      const days = differenceInDays(new Date(newItinerary.endDate), new Date(newItinerary.startDate));
      return days >= 0 ? days : 0;
    }
    return null; 
  };

  const daysBetween = calculateDays();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBR}>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 3,
        }}
      >
        <DatePicker
          label="Data de início"
          value={newItinerary.startDate}
          onChange={(newValue) =>
            setNewItinerary((prev) => ({ ...prev, startDate: newValue }))
          }
          renderInput={(params) => <TextField fullWidth {...params} />}
        />
        <DatePicker
          label="Data de fim"
          value={newItinerary.endDate}
          onChange={(newValue) =>
            setNewItinerary((prev) => ({ ...prev, endDate: newValue }))
          }
          renderInput={(params) => <TextField fullWidth {...params} />}
        />
      </Box>

      {daysBetween !== null && (
        <Typography variant="body1" color="textSecondary">
          Duração: {daysBetween} {daysBetween === 1 ? "dia" : "dias"}
        </Typography>
      )}
    </LocalizationProvider>
  );
};

export default DatePickerComp;
