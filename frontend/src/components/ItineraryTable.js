import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography
} from "@mui/material";

// tabela com a descricao do itinerario 
const ItineraryTable = ({ destinations, onRemoveDestination, onEditDestination }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
      <TableHead>
      <TableRow sx={{ '& > th': { color: 'text.terciary' } }}>
        <TableCell>Dia</TableCell>
        <TableCell>Destino</TableCell>
        <TableCell>Hospedagem</TableCell>
        <TableCell>Atividades</TableCell>
        <TableCell>Observações</TableCell>
        <TableCell align="center">Ações</TableCell>
      </TableRow>
      </TableHead>
        <TableBody>
          {destinations.map((destination, index) => (
            <TableRow key={index}>
              <TableCell>{destination.day}</TableCell>
              <TableCell>{destination.destination}</TableCell>
              <TableCell>{destination.accommodation}</TableCell>
              <TableCell>{destination.activities}</TableCell>
              <TableCell>{destination.actions}</TableCell>
              <TableCell align="center">
                <Button
                  color="inherit" // Cor cinza
                  onClick={() => onEditDestination(index)}
                  sx={{ mr: 1 }}
                >
                  Editar
                </Button>
                <Button
                  color="error"
                  onClick={() => onRemoveDestination(index)}
                >
                  Remover
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ItineraryTable;
