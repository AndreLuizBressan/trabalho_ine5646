import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    const savedToken = localStorage.getItem("authToken");
    console.log("token do localStorage:", savedToken);
    return savedToken;
  });

  const [refreshToken, setRefreshToken] = useState(() => {
    const savedRefreshToken = localStorage.getItem("refreshToken");
    console.log("refreshToken recuperado do localStorage:", savedRefreshToken);
    return savedRefreshToken;
  });

  const login = (tokens) => {
    console.log("login com tokens:", tokens);

    localStorage.setItem("authToken", tokens.access);
    localStorage.setItem("refreshToken", tokens.refresh);
    setToken(tokens.access);
    setRefreshToken(tokens.refresh);
    
    console.log("token access e refresh salvos no localStorage");
  };

  const logout = () => {
    console.log(" fazendo logout"); 
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    setToken(null);
    setRefreshToken(null);
    
    console.log("tokens removidos do localStorage, estado resetado");
  };

  return (
    <AuthContext.Provider value={{ token, refreshToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
