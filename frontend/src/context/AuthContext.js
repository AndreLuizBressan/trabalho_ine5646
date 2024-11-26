import React, { createContext, useState, useContext } from "react";

//auth com localstorage
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("user")
  );

  const register = (name, email, password) => {
    const user = { name, email, password };
    localStorage.setItem("user", JSON.stringify(user));
    alert("Cadastro realizado");
  };

  const login = (email, password) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.email === email && user.password === password) {
    setIsAuthenticated(true);
    return true; 
  }
  return false;
 };

  const logout = () => {
    setIsAuthenticated(false);
    alert("Você saiu do sistema.");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
