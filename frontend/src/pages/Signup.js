import React, { useState } from "react";
import { Container, Typography, TextField, Button, Box, Paper, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); 
  const { login } = useAuth()


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedFormData = { ...prev, [name]: value };
      console.log("Atualização do formulário:", updatedFormData);
      return updatedFormData;
    });
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (formData.password && value !== formData.password) {
      setError("As senhas não coincidem");
    } else {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!error && formData.password && confirmPassword) {
      try {
        console.log("JSON enviado para o backend:", JSON.stringify(formData));
        const response = await fetch("http://ec2-18-206-124-104.compute-1.amazonaws.com:8000/users/register/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error("Erro ao cadastrar. Tente novamente.");
        }

        const data = await response.json();
        login(data);
        navigate("/login");
      } catch (err) {
        console.error(err.message);
        alert("Erro ao cadastrar: " + err.message);
      }
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
              name="name"
              value={formData.firstName}
              onChange={handleChange}
            />
          </Box>
          <TextField
            label="E-mail"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <TextField
            label="Senha"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            name="password"
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
            disabled={!!error || !formData.password || !confirmPassword}
          >
            Cadastre-se
          </Button>
          </Box>
          <Box textAlign="center" sx={{ marginTop: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Você já tem uma conta?{" "}
              <Link href="/login" underline="hover" color="roxo">
                Faça login
              </Link>
            </Typography>
         </Box>
      </Paper>
    </Container>
  );
};

export default Signup;

