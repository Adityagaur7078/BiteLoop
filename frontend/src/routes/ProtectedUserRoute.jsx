import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import "./routes.css";
import API_URL from "../api/api";

const ProtectedUserRoute = ({ children }) => {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        await axios.get(`${API_URL}/api/auth/profile`, {
          withCredentials: true,
        });
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      } finally {
        setIsChecking(false);
      }
    };

    checkUserSession();
  }, []);

  if (isChecking) {
    return <div className="route-loading">Checking your session...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/user/login" replace />;
};

export default ProtectedUserRoute;