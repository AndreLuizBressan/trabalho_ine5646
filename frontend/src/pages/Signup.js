import React, { useState } from "react";
import { Container, Typography, TextField, Button, Box, Paper, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); 

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (confirmPassword && e.target.value !== confirmPassword) {
      setError("As senhas não coincidem");
    } else {
      setError("");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (password && e.target.value !== password) {
      setError("As senhas não coincidem");
    } else {
      setError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!error && password && confirmPassword) {
      alert("Conta criada com sucesso");
      navigate("/home");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 5 }}>
        <Box textAlign="center" marginBottom={2}>
          <Typography variant="h4" gutterBottom>
            Crie sua Conta
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Para criar roteiros incríveis, preencha o formulário a seguir com as informações corretas.
          </Typography>
        </Box>
        <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', gap: 2, margin: 'normal' }}>
            <TextField
              label="Nome"
              variant="outlined"
              margin="normal"
              fullWidth
              required
            />
            <TextField
              label="Sobrenome"
              variant="outlined"
              margin="normal"
              fullWidth
              required
            />
          </Box>

          <TextField
            label="E-mail"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label="Senha"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            value={password}
            onChange={handlePasswordChange}
          />
          <TextField
            label="Confirmar senha"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            error={!!error}
            helperText={error}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
            disabled={!!error || !password || !confirmPassword}
          >
            Cadastre-se
          </Button>
          </Box>
          <Box textAlign="center" sx={{ marginTop: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Você já tem uma conta?{" "}
              <Link href="/login" underline="hover">
                Faça login
              </Link>
            </Typography>
         </Box>
      </Paper>
    </Container>
  );
};

export default Signup;
