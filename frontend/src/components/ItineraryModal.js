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

// Formatação de data
const formatDate = (dateString) => {
  if (!dateString) return "Não disponível";
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
};
const ItineraryModal = ({ open, onClose, itinerary, details }) => {
  if (!itinerary) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{itinerary.title || "Sem título"}</DialogTitle>
      <DialogContent dividers>
        <Box>
          <Typography variant="h6" gutterBottom>
            Descrição
          </Typography>
          <Typography variant="body1">
            {itinerary.description || "Sem descrição"}
          </Typography>
        </Box>
        <Box mt={2}>
          <Typography variant="h6" gutterBottom>
            Datas
          </Typography>
          <Typography variant="body1">
            Início: {formatDate(itinerary.start_date)} <br />
            Fim: {formatDate(itinerary.end_date)}
          </Typography>
        </Box>
        <Box mt={2}>
          <Typography variant="h6" gutterBottom>
            Destinos
          </Typography>
          {details && details.length > 0 ? (
            details.map((detail) => (
              <Typography key={detail.id} variant="body2" gutterBottom>
                {`Dia ${detail.day}: Destino: ${detail.destination || "Não especificado"}, `}
                {`Hospedagem: ${detail.accommodation || "Sem hospedagem"}, `}
                {`Atividades: ${detail.activities || "Sem atividades"}, `}
                {`Observações: ${detail.actions || "Sem observações"}`}
              </Typography>
            ))
          ) : (
            <Typography variant="body2">Nenhum destino foi adicionado.</Typography>
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
