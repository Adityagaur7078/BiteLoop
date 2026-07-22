import { Link, useNavigate } from 'react-router-dom';
import '../../styles/theme.css';
import '../../styles/auth.css';
import axios from 'axios';
import API_URL from "../../api/api";

const UserRegister = () => {

  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();

    const fullName = e.target.fullName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const response = await axios.post(`${API_URL}/api/auth/user/register`, {
      fullName,
      email,
      password,
    }, { withCredentials: true });

    console.log(response.data);

    navigate("/");

  };

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <p className="auth-eyebrow">Modern Food Reels</p>
        <h1 className="auth-title">Create your user account</h1>
        <p className="auth-subtitle">
          Join to explore fresh food picks and nearby restaurants with a calm,
          simple experience.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="fullName">Full name</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Ava Sharma"
            />
          </div>

          <div className="auth-field">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
            />
          </div>

          <div className="auth-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Create a password"
            />
          </div>

          <button className="auth-button" type="submit">
            Create account
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/user/login">Login</Link>
          <br />
          Want to list your kitchen?{" "}
          <Link to="/food-partner/register">
            Register as food partner
          </Link>
        </p>
      </div>
    </div>
  );
};

export default UserRegister;
