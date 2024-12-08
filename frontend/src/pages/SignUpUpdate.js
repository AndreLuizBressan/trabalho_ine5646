import React, { useState, useEffect } from "react";
import { Container, Typography, TextField, Button, Box, Paper, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 

const SignupUpdate = () => {
  const { isAuthenticated } = useAuth(); 
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState("");


  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (formData.password && value !== formData.password) {
      setError("As senhas não coincidem");
    } else {
      setError("");
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch("", { //endpoint
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar dados");
        }

        const data = await response.json();
        setFormData({
          name: data.name || "",
          password: data.password || "",
        });
      } catch (err) {
        console.error(err.message);
        alert("Erro ao carregar os dados do usuário: " + err.message);
      }
    };

    fetchUserData();
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("", { //endpoint
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar os dados.");
      }

      const data = await response.json();
      alert("Dados atualizados com sucesso!");
      navigate("/main");
    } catch (err) {
      console.error(err.message);
      alert("Erro ao atualizar cadastro: " + err.message);
    }
  };

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
            required
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            label="Senha"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            name="Senha"
            value={formData.password}
            onChange={handleChange}
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
