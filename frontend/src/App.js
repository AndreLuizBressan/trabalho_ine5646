import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { ThemeProvider, CssBaseline } from "@mui/material"; 
import theme from "./theme"; 
import { AuthProvider } from "./context/AuthContext";
import { ItineraryProvider } from "./context/ItineraryContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import Main from "./pages/Main";
import SignupUpdate from "./pages/SignUpUpdate";
import CreateItinerary from "./pages/CreateItinerary";

function App() {
  return (
    <ItineraryProvider>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
            <Router>
              <Header />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/signupupdate" element={<SignupUpdate />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/main"
                        element={
                          <ProtectedRoute>
                            <Main />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                          path="/create"
                          element={
                            <ProtectedRoute>
                              <CreateItinerary />
                            </ProtectedRoute>
                          }
                        />
                      {/* <Route path="/create" element={<CreateItinerary />} /> */}
                    <Route path="*" element={<Navigate to="/" />} />
                  </Routes>
            </Router>
          </ThemeProvider>
        </AuthProvider>
    </ItineraryProvider>
  );
}

export default App;
