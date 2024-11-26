// src/pages/Login.js
import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Paper,
} from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    //autenticação
    console.log("Email:", email, "Senha:", password);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 5 }}>
        <Box textAlign="center" marginBottom={2}>
          <Typography variant="h4" gutterBottom>
            Bem-vindo!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Faça login para continuar
          </Typography>
        </Box>

        <Box component="form" noValidate autoComplete="off">
          <TextField
            label="E-mail"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Senha"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
          onClick={handleLogin}
        >
          Entrar
        </Button>

        <Box textAlign="center" marginTop={2}>
          <Typography variant="body2">
            Ainda não tem uma conta?{" "}
            <Link href="/signup" underline="hover">
              Cadastre-se
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
