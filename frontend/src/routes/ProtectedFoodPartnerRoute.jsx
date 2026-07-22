import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import "./routes.css";

const ProtectedFoodPartnerRoute = ({ children }) => {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkPartnerSession = async () => {
      try {
        await axios.get("http://localhost:3000/api/auth/foodPartner/me", {
          withCredentials: true,
        });
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      } finally {
        setIsChecking(false);
      }
    };

    checkPartnerSession();
  }, []);

  if (isChecking) {
    return <div className="route-loading">Checking your partner session...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/food-partner/login" replace />;
};

export default ProtectedFoodPartnerRoute;
