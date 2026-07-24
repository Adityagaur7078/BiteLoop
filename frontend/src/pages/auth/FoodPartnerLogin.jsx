import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/theme.css';
import '../../styles/auth.css';
import API_URL from "../../api/api";

const FoodPartnerLogin = () => {

  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();
    
    const email = e.target.email.value;
    const password = e.target.password.value;

    const response = await axios.post(`${API_URL}/api/auth/foodPartner/login`, {
      email,
      password
    }, { withCredentials: true })

    navigate("/create-food");

  }

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <p className="auth-eyebrow">Partner access</p>
        <h1 className="auth-title">Login as a food partner</h1>
        <p className="auth-subtitle">Manage your listing and connect with hungry customers effortlessly.</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <label htmlFor="email">Email address</label>
            <input id="email" type="email" placeholder="partner@example.com" />
          </div>

          <div className="auth-field">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" placeholder="Enter your password" />
          </div>

          <button className="auth-button" type="submit">Login</button>
        </form>

        <p className="auth-footer">
          New partner? <Link to="/food-partner/register">Register</Link>
          <br />
          Need a normal user account? <Link to="/user/login">Login as normal user</Link>
        </p>
      </div>
    </div>
  );
};

export default FoodPartnerLogin;
