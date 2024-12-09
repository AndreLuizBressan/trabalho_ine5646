import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

const DeleteConfirmationModal = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="delete-dialog-title">
      <DialogTitle id="delete-dialog-title">Confirmar Exclusão</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Tem certeza de que deseja excluir este item?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationModal;