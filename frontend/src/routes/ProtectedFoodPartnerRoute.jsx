import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import "./routes.css";
import API_URL from "../api/api";
import { clearSessionHint, hasSessionHint } from "../auth/sessionHint";

const ProtectedFoodPartnerRoute = ({ children }) => {
  const hasCachedSession = hasSessionHint("foodPartner");
  const [isChecking, setIsChecking] = useState(hasCachedSession);
  const [isAuthenticated, setIsAuthenticated] = useState(hasCachedSession);

  useEffect(() => {
    if (!hasCachedSession) return;

    const checkPartnerSession = async () => {
      try {
        await axios.get(`${API_URL}/api/auth/foodPartner/me`, {
          withCredentials: true,
        });
        setIsAuthenticated(true);
      } catch {
        clearSessionHint("foodPartner");
        setIsAuthenticated(false);
      } finally {
        setIsChecking(false);
      }
    };

    checkPartnerSession();
  }, [hasCachedSession]);

  if (isChecking) {
    return <div className="route-loading">Checking your partner session...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/food-partner/login" replace />;
};

export default ProtectedFoodPartnerRoute;
