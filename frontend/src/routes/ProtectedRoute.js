import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  // Remover autenticação temporariamente
  return children;
};

export default ProtectedRoute;
