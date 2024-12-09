import React, { useState } from "react";
import { Container, Typography, TextField, Button, Box, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SignupUpdate = () => {
  const { isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    oldPassword: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Atualização do formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Verificação de coincidencia das senhas
  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (formData.password && value !== formData.password) {
      setError("As senhas não coincidem");
    } else {
      setError("");
    }
  };

  // Envio de dados atualizados para o servidor
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password && formData.password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      // Preparacao de dados para envio ao servidor
      const payload = {
        name: formData.name || undefined, 
        old_password: formData.oldPassword || undefined, 
        new_password: formData.password || undefined,
      };

      // Req PATCH para atualização de dados de cadastro
      const response = await fetch(
        "http://ec2-18-212-51-108.compute-1.amazonaws.com:8000/users/update/",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Resposta inesperada do servidor:", errorText);
        throw new Error(`Erro do servidor: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      alert("Dados atualizados com sucesso!");
      navigate("/main");
    } catch (err) {
      console.error("Erro no fetch:", err.message);
      alert("Erro ao atualizar cadastro: " + err.message);
    }
  };

  // Interface
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 5 }}>
        <Box textAlign="center" marginBottom={2}>
          <Typography variant="h4" gutterBottom>
            Atualize seu Cadastro
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Atualize suas informações de cadastro abaixo.
          </Typography>
        </Box>
        <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            label="Nome"
            variant="outlined"
            margin="normal"
            fullWidth
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            label="Senha antiga"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleChange}
          />
          <TextField
            label="Nova senha"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            label="Confirmar nova senha"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            error={!!error}
            helperText={error}
          />
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Atualizar
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignupUpdate;