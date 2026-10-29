import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import "./routes.css";
import API_URL from "../api/api";
import { clearSessionHint, hasSessionHint } from "../auth/sessionHint";

const ProtectedUserRoute = ({ children }) => {
  const hasCachedSession = hasSessionHint("user");
  const [isChecking, setIsChecking] = useState(hasCachedSession);
  const [isAuthenticated, setIsAuthenticated] = useState(hasCachedSession);

  useEffect(() => {
    if (!hasCachedSession) return;

    const checkUserSession = async () => {
      try {
        await axios.get(`${API_URL}/api/auth/profile`, {
          withCredentials: true,
        });
        setIsAuthenticated(true);
      } catch {
        clearSessionHint("user");
        setIsAuthenticated(false);
      } finally {
        setIsChecking(false);
      }
    };

    checkUserSession();
  }, [hasCachedSession]);

  if (isChecking) {
    return <div className="route-loading">Checking your session...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/user/login" replace />;
};

export default ProtectedUserRoute;