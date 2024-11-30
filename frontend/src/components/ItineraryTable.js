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
} from "@mui/material";

const ItineraryTable = ({ destinations, onRemoveDestination }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Dia</TableCell>
            <TableCell>Destino</TableCell>
            <TableCell>Hospedagem</TableCell>
            <TableCell>Atividades</TableCell>
            <TableCell>Remover</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {destinations.map((destination, index) => (
            <TableRow key={index}>
              <TableCell>{destination.day}</TableCell>
              <TableCell>{destination.destination}</TableCell>
              <TableCell>{destination.accommodation}</TableCell>
              <TableCell>{destination.activities}</TableCell>
              <TableCell>
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
