import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserRegister from '../pages/auth/UserRegister';
import UserLogin from '../pages/auth/UserLogin';
import FoodPartnerRegister from '../pages/auth/FoodPartnerRegister';
import FoodPartnerLogin from '../pages/auth/FoodPartnerLogin';
import Home from '../pages/general/Home';
import CreateFoodPartner from '../pages/food-partner/CreateFoodPartner';
import Profile from '../pages/food-partner/Profile';
import ProtectedFoodPartnerRoute from './ProtectedFoodPartnerRoute';
import ProtectedUserRoute from './ProtectedUserRoute';
import FoodCollection from '../pages/general/FoodCollection';
import NotFound from '../pages/general/NotFound';
import Settings from '../pages/general/Settings';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
        <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
        <Route path="/foodPartner/register" element={<FoodPartnerRegister />} />
        <Route path="/foodPartner/login" element={<FoodPartnerLogin />} />
        <Route
          path="/"
          element={
            <ProtectedUserRoute>
              <Home />
            </ProtectedUserRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedUserRoute>
              <Profile />
            </ProtectedUserRoute>
          }
        />
        <Route
          path="/collection/:type"
          element={
            <ProtectedUserRoute>
              <FoodCollection />
            </ProtectedUserRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedUserRoute>
              <Settings />
            </ProtectedUserRoute>
          }
        />
        <Route
          path="/create-food"
          element={
            <ProtectedFoodPartnerRoute>
              <CreateFoodPartner />
            </ProtectedFoodPartnerRoute>
          }
        />
        <Route path="/food-partner/:id" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;