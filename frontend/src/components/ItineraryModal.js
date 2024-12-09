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
            Início: {itinerary.start_date || "Não disponível"} <br />
            Fim: {itinerary.end_date || "Não disponível"}
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
                {`Ações: ${detail.actions || "Sem ações"}`}
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
