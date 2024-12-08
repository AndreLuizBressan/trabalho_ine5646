import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
} from "@mui/material";

const ItineraryModal = ({ open, onClose, itinerary }) => {
  if (!itinerary) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{itinerary.title || "sem titulo"}</DialogTitle>
      <DialogContent dividers>
        <Box>
          <Typography variant="h6" gutterBottom>
            Descrição
          </Typography>
          <Typography variant="body1">
            {itinerary.description || "Sem descricao "}
          </Typography>
        </Box>
        <Box mt={2}>
          <Typography variant="h6" gutterBottom>
            Datas
          </Typography>
          <Typography variant="body1">
            Início: {itinerary.start_date || "N tem"} <br />
            Fim: {itinerary.end_date || "n tem"}
          </Typography>
        </Box>
        <Box mt={2}>
          <Typography variant="h6" gutterBottom>
            Destinos
          </Typography>
          {itinerary.destinations && itinerary.destinations.length > 0 ? (
            itinerary.destinations.map((dest, index) => (
              <Typography key={index} variant="body2" gutterBottom>
                {`Dia ${dest.day}: ${dest.destination} - ${
                  dest.accommodation || "n tem hosp"
                }`}
                <br />
                {`Atividades: ${dest.activities || "n tem atv"}`}
              </Typography>
            ))
          ) : (
            <Typography variant="body2">nenhum destino foi add.</Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ItineraryModal;
