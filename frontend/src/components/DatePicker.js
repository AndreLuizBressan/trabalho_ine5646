import React from "react";
import { TextField, Box, Typography } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ptBR } from "date-fns/locale";
import { differenceInDays } from "date-fns";

const DatePickerComp = ({ newItinerary, setNewItinerary }) => {
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

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBR}>
      <Box sx={{ display: "flex", gap: 2, mb: 3, alignItems: "flex-end" }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>Data de início</Typography>
          <DatePicker
            label=""
            value={newItinerary.startDate}
            onChange={(newValue) =>
              setNewItinerary((prev) => ({ ...prev, startDate: newValue }))
            }
            renderInput={(params) => <TextField fullWidth {...params} />}
            format="dd/MM/yyyy"
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>Data de fim</Typography>
          <DatePicker
            label=""
            value={newItinerary.endDate}
            onChange={(newValue) =>
              setNewItinerary((prev) => ({ ...prev, endDate: newValue }))
            }
            renderInput={(params) => <TextField fullWidth {...params} />}
            format="dd/MM/yyyy"
          />
        </Box>
      </Box>

      {daysBetween > 0 && (
        <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
          Duração: {daysBetween} {daysBetween === 1 ? "dia" : "dias"}
        </Typography>
      )}
    </LocalizationProvider>
  );
};

export default DatePickerComp;