import { Link, useNavigate } from 'react-router-dom';
import '../../styles/theme.css';
import '../../styles/auth.css';
import axios from 'axios';
import API_URL from "../../api/api";

const UserLogin = () => {

  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const response = await axios.post(`${API_URL}/api/auth/user/login`, {
      email,
      password
    },{ withCredentials: true });

    navigate("/");

  }

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <p className="auth-eyebrow">Welcome back</p>
        <h1 className="auth-title">Login to your account</h1>
        <p className="auth-subtitle">Pick your next meal with a smooth and minimal flow.</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <label htmlFor="email">Email address</label>
            <input id="email" type="email" placeholder="you@example.com" />
          </div>

          <div className="auth-field">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" placeholder="Enter your password" />
          </div>

          <button className="auth-button" type="submit">Login</button>
        </form>

        <p className="auth-footer">
          New here? <Link to="/user/register">Create account</Link>
          <br />
          Looking for partner access? <Link to="/food-partner/login">Login as food partner</Link>
        </p>
      </div>
    </div>
  );
};

export default UserLogin;
