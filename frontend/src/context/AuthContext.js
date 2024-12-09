import React, { createContext, useContext, useState, useEffect } from "react";


// Contexto de autenticacao de usuarios
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Recupera o token armazenado localmente
    const storedToken = localStorage.getItem("authToken");
    console.log("Token no localStorage:", storedToken);

    // Usuario autentica se o token for encontrado no localStorage
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    }
  }, []);
  
  // Marca usuario como autenticado e guarda o token
  const login = (newToken) => {
    console.log("Novo token recebido no login:", newToken);
    setToken(newToken);
    setIsAuthenticated(true);
    localStorage.setItem("authToken", newToken);
  };

  // Marca usuario como não autenticado e remove o token do estado
  const logout = () => {
    console.log("Usuário fez logout, limpando dados.");
    setIsAuthenticated(false);
    setToken(null);
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
