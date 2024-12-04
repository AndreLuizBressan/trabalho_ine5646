import React, { useState } from "react";
import { Container, Typography, TextField, Button, Box, Paper, Link } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await login(credentials.email, credentials.password);
      if (success) {
        navigate("/main");
      } else {
        setError("E-mail ou senha inválidos.");
      }
    } catch (err) {
      setError("Erro ao realizar login. Tente novamente.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 5 }}>
        <Box textAlign="center" marginBottom={2}>
          <Typography variant="h4" gutterBottom>
            Login
          </Typography>
        </Box>
        <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            label="E-mail"
            name="email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={handleChange}
            error={!!error}
          />
          <TextField
            label="Senha"
            name="password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={handleChange}
            error={!!error}
          />
          {error && (
            <Typography color="error" variant="body2" sx={{ marginTop: 1 }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Entrar
          </Button>
        </Box>
        <Box textAlign="center" sx={{ marginTop: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Não tem uma conta?{" "}
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
