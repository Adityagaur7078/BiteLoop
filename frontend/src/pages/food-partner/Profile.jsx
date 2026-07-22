import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Profile.css";
import API_URL from "../../api/api";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/auth/profile`,
          {
            withCredentials: true,
          }
        );

        setUser(response.data.user);
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    };

    fetchProfile();
  }, []);

  return (
    <main className="partner-profile">
      <header className="partner-profile__topbar">
        <Link
          className="partner-profile__back"
          to="/"
          aria-label="Back to reels"
        >
          <span aria-hidden="true">&#8592;</span>
          <span>Back to reels</span>
        </Link>

        <span className="partner-profile__brand">
          BiteLoop
        </span>
      </header>

      <section className="partner-profile__intro">
        <div
          className="partner-profile__avatar"
          aria-hidden="true"
        >
          {user?.fullName?.charAt(0).toUpperCase() || "U"}
        </div>

        <div className="partner-profile__identity">
          <h1>{user?.fullName || "Loading..."}</h1>

          <p>{user?.email || "Loading..."}</p>
        </div>

        <div className="partner-profile__actions">
          <Link
            to="/collection/liked"
            className="partner-profile__button"
          >
            ❤️ Liked Foods
          </Link>

          <Link
            to="/collection/saved"
            className="partner-profile__button partner-profile__button--quiet"
          >
            🔖 Saved Foods
          </Link>
        </div>
      </section>

      <section
        className="partner-profile__stats"
        aria-label="User information"
      >
        <div>
          <strong>User</strong>
          <span>Account Type</span>
        </div>

        <div>
          <strong>
            {user?.createdAt
              ? new Date(user.createdAt).toLocaleDateString()
              : "--"}
          </strong>

          <span>Member Since</span>
        </div>
      </section>

      <section className="partner-profile__gallery">
        <p className="partner-profile__empty">
          Welcome back,{" "}
          <strong>{user?.fullName || "User"}</strong>.
          <br />
          Use the buttons above to view your liked and saved foods.
        </p>
      </section>
    </main>
  );
};

export default Profile;