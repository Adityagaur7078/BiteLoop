import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/theme.css';
import '../../styles/auth.css';
import API_URL from "../../api/api";

const FoodPartnerRegister = () => {

  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();

    const name = e.target.name.value;
    const contactName = e.target.contactName.value;
    const phone = e.target.phone.value;
    const address = e.target.address.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const response = await axios.post(`${API_URL}/api/auth/foodPartner/register`, {
      name,
      contactName,
      phone,
      address,
      email,
      password
    }, { withCredentials: true });

    navigate("/create-food");

  };

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <p className="auth-eyebrow">Food partner</p>
        <h1 className="auth-title">Register your kitchen</h1>
        <p className="auth-subtitle">Showcase your food offerings with a simple profile and start getting discovered.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="name">Business Name</label>
            <input id="name" type="text" placeholder="Spice & Crust" required />
          </div>

          <div className="auth-field">
            <label htmlFor="contactName">Contact Person Name</label>
            <input id="contactName" type="text" placeholder="John Doe" required />
          </div>

          <div className="auth-field">
            <label htmlFor="phone">Phone Number</label>
            <input id="phone" type="tel" placeholder="+1 (555) 000-0000" required />
          </div>

          <div className="auth-field">
            <label htmlFor="address">Address</label>
            <input id="address" type="text" placeholder="123 Main St, City, State" required />
          </div>

          <div className="auth-field">
            <label htmlFor="email">Email Address</label>
            <input id="email" type="email" placeholder="partner@example.com" required />
          </div>

          <div className="auth-field">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" placeholder="Enter a secure password" required />
          </div>

          <button className="auth-button" type="submit">Register partner</button>
        </form>

        <p className="auth-footer">
          Already partnered? <Link to="/food-partner/login">Login</Link>
          <br />
          Want a regular user account? <Link to="/user/register">Register as normal user</Link>
        </p>
      </div>
    </div>
  );
};

export default FoodPartnerRegister;
