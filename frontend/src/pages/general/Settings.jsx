import { Link } from "react-router-dom";
import "./Settings.css";

const Settings = () => (
  <main className="settings-page">
    <header className="settings-header">
      <Link to="/" aria-label="Back to BiteLoop">&#8592; Back to reels</Link>
      <strong>BiteLoop</strong>
    </header>
    <section className="settings-shell">
      <span className="settings-kicker">Preferences</span>
      <h1>Settings</h1>
      <div className="settings-list">
        <div><span>Autoplay reels</span><span className="settings-status">On</span></div>
        <div><span>Account privacy</span><span className="settings-status">Public</span></div>
        <div><span>About BiteLoop</span><span className="settings-status">v1.0</span></div>
      </div>
    </section>
  </main>
);

export default Settings;
