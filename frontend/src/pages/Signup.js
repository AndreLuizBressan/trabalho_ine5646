import React from "react";
import { Container, Typography, TextField, Button, Box, Paper } from "@mui/material";

const Signup = () => {
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 5 }}>
        <Box textAlign="center" marginBottom={2}>
          <Typography variant="h4" gutterBottom>
            Crie sua Conta
          </Typography>
        </Box>

        <Box component="form" noValidate autoComplete="off">
          <TextField
            label="Nome"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="E-mail"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Senha"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
          />
        </Box>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
        >
          Cadastrar
        </Button>
      </Paper>
    </Container>
  );
};

export default Signup;
