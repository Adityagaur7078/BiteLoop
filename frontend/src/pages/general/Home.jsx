import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Home.css";

const iconPaths = {
  heart: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z",
  bookmark: "M6 3.75A1.75 1.75 0 0 1 7.75 2h8.5A1.75 1.75 0 0 1 18 3.75V22l-6-3.75L6 22V3.75Z",
  user: "M20 21a8 8 0 0 0-16 0M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z",
  settings: "M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-1.8 1.8-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V20h-2.54v-.1a1.7 1.7 0 0 0-1.03-1.56 1.7 1.7 0 0 0-1.88.34l-.06.06-1.8-1.8.06-.06A1.7 1.7 0 0 0 8.1 15a1.7 1.7 0 0 0-1.56-1.03h-.1v-2.54h.1A1.7 1.7 0 0 0 8.1 10a1.7 1.7 0 0 0-.34-1.88L7.7 8.06l1.8-1.8.06.06A1.7 1.7 0 0 0 11.44 6a1.7 1.7 0 0 0 1.03-1.56V4h2.54v.1A1.7 1.7 0 0 0 16.04 5.66a1.7 1.7 0 0 0 1.88-.34l.06-.06 1.8 1.8-.06.06A1.7 1.7 0 0 0 19.4 9a1.7 1.7 0 0 0 1.56 1.03h.1v2.54h-.1A1.7 1.7 0 0 0 19.4 15Z",
  logout: "M10 17l5-5-5-5M15 12H3M21 19V5a2 2 0 0 0-2-2h-4",
  close: "M18 6 6 18M6 6l12 12",
  chevron: "M6 9l6 6 6-6",
};

const Icon = ({ name, size = 20, filled = false }) => (
  <svg aria-hidden="true" className={`icon icon--${name}`} fill={filled ? "currentColor" : "none"} height={size} viewBox="0 0 24 24" width={size}>
    <path d={iconPaths[name]} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
  </svg>
);

const formatCount = (value) => value >= 1000 ? `${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}K` : value;

const getStoredSet = (key) => {
  try {
    return new Set(JSON.parse(localStorage.getItem(key) || "[]"));
  } catch {
    return new Set();
  }
};

const ReelAction = ({ active, count, icon, label, onClick }) => (
  <button className={`reel-action${active ? " is-active" : ""}`} type="button" onClick={onClick} aria-label={label}>
    <span className="reel-action__icon"><Icon name={icon} size={21} filled={active} /></span>
    {count !== undefined && <span className="reel-action__count">{formatCount(count)}</span>}
  </button>
);

const ProfileMenu = ({ onLogout }) => (
  <div className="profile-menu" role="menu">
    <Link to="/profile" role="menuitem"><Icon name="user" size={18} /> Profile</Link>
    <Link to="/collection/liked" role="menuitem"><Icon name="heart" size={18} /> Liked foods</Link>
    <Link to="/collection/saved" role="menuitem"><Icon name="bookmark" size={18} /> Saved foods</Link>
    <Link to="/settings" role="menuitem"><Icon name="settings" size={18} /> Settings</Link>
    <button className="profile-menu__logout" type="button" onClick={onLogout} role="menuitem"><Icon name="logout" size={18} /> Logout</button>
  </div>
);

const LogoutModal = ({ onCancel, onConfirm }) => (
  <div className="modal-backdrop" role="presentation" onClick={onCancel}>
    <section className="logout-modal" role="dialog" aria-modal="true" aria-labelledby="logout-title" onClick={(event) => event.stopPropagation()}>
      <button className="modal-close" type="button" onClick={onCancel} aria-label="Close dialog"><Icon name="close" /></button>
      <span className="modal-kicker">Session</span>
      <h2 id="logout-title">Leave BiteLoop?</h2>
      <p>You can come back anytime to find your next favorite meal.</p>
      <div className="modal-actions">
        <button className="modal-button modal-button--quiet" type="button" onClick={onCancel}>Stay</button>
        <button className="modal-button modal-button--danger" type="button" onClick={onConfirm}>Log out</button>
      </div>
    </section>
  </div>
);

const Home = () => {
  const reelRefs = useRef([]);
  const videoRefs = useRef([]);
  const clickTimer = useRef(null);
  const navigate = useNavigate();
  const [foods, setFoods] = useState([]);
  const [activeReel, setActiveReel] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [liked, setLiked] = useState(() => getStoredSet("biteloop-liked"));
  const [saved, setSaved] = useState(() => getStoredSet("biteloop-saved"));
  const [profileOpen, setProfileOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [heartBurst, setHeartBurst] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/food", { withCredentials: true });
        setFoods(response.data.foodItems || []);
      } catch (error) {
        setLoadError(error.response?.data?.message || "Your food feed is taking a moment to load.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchFoods();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) setActiveReel(Number(entry.target.dataset.index));
    }), { threshold: 0.7 });
    reelRefs.current.forEach((reel) => reel && observer.observe(reel));
    return () => observer.disconnect();
  }, [foods]);

  useEffect(() => setIsPlaying(true), [activeReel]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === activeReel && isPlaying) video.play().catch(() => {});
      else video.pause();
      if (index !== activeReel) video.currentTime = 0;
    });
  }, [activeReel, foods, isPlaying]);

  useEffect(() => localStorage.setItem("biteloop-liked", JSON.stringify([...liked])), [liked]);
  useEffect(() => localStorage.setItem("biteloop-saved", JSON.stringify([...saved])), [saved]);

  const toggleSetValue = (setValue, foodId, storageSetter) => {
    const next = new Set(setValue);
    if (next.has(foodId)) next.delete(foodId);
    else next.add(foodId);
    storageSetter(next);
  };

  const likeFood = (food, showBurst = false) => {
    toggleSetValue(liked, food._id, setLiked);
    if (showBurst) {
      setHeartBurst(food._id);
      window.setTimeout(() => setHeartBurst(null), 850);
    }
  };

  const handleReelClick = (index) => {
    if (index !== activeReel) return;
    window.clearTimeout(clickTimer.current);
    clickTimer.current = window.setTimeout(() => setIsPlaying((current) => !current), 220);
  };

  const handleDoubleClick = (event, food) => {
    event.preventDefault();
    window.clearTimeout(clickTimer.current);
    if (!liked.has(food._id)) likeFood(food, true);
    else {
      setHeartBurst(food._id);
      window.setTimeout(() => setHeartBurst(null), 850);
    }
  };

  const handleLogout = async () => {
    await axios.get("http://localhost:3000/api/auth/user/logout", { withCredentials: true }).catch(() => {});
    setLogoutOpen(false);
    navigate("/user/login");
  };

  return (
    <main className="biteloop-app">
      <header className="biteloop-header">
        <Link className="biteloop-brand" to="/" aria-label="BiteLoop home">
          <span className="biteloop-brand__mark" aria-hidden="true"><span /><span /><span /></span>
          <span>BiteLoop</span>
        </Link>
        <div className="feed-counter" aria-label="Current reel"><span>{foods.length ? String(activeReel + 1).padStart(2, "0") : "--"}</span><i>/</i><span>{foods.length ? String(foods.length).padStart(2, "0") : "--"}</span></div>
        <div className="profile-control">
          <button className="profile-trigger" type="button" aria-label="Open profile menu" aria-expanded={profileOpen} onClick={() => setProfileOpen((current) => !current)}><span className="profile-avatar">B</span><Icon name="chevron" size={15} /></button>
          {profileOpen && <ProfileMenu onLogout={() => { setProfileOpen(false); setLogoutOpen(true); }} />}
        </div>
      </header>

      {isLoading && <div className="feed-skeleton" aria-label="Loading food reels"><span /><span /><span /></div>}
      {!isLoading && loadError && <div className="feed-empty"><span className="feed-empty__eyebrow">BiteLoop kitchen</span><h1>Something tasty is on its way.</h1><p>{loadError}</p></div>}
      {!isLoading && !loadError && foods.length === 0 && <div className="feed-empty"><span className="feed-empty__eyebrow">A fresh start</span><h1>No reels yet.</h1><p>When food partners share their first meal, it will land here.</p></div>}

      {foods.length > 0 && <section className="reels-feed" aria-label="Food reels">
        {foods.map((food, index) => {
          const isLiked = liked.has(food._id);
          const isSaved = saved.has(food._id);
          return (
            <article className="reel" key={food._id} data-index={index} ref={(element) => { reelRefs.current[index] = element; }} onClick={() => handleReelClick(index)} onDoubleClick={(event) => handleDoubleClick(event, food)}>
              <video className="reel__backdrop-video" src={food.video} autoPlay loop muted playsInline aria-hidden="true" />
              <video ref={(element) => { videoRefs.current[index] = element; }} className="reel__video" autoPlay={index === 0} loop muted playsInline src={food.video} preload="metadata" />
              <div className="reel__shade" />
              {heartBurst === food._id && <div className="heart-burst" aria-hidden="true"><Icon name="heart" size={88} filled /></div>}
              {!isPlaying && index === activeReel && <button className="play-overlay" type="button" aria-label="Play video" onClick={(event) => { event.stopPropagation(); setIsPlaying(true); }}><span>▶</span></button>}
              <div className="reel__content">
                <div className="reel__copy">
                  <p className="reel__partner"><span className="partner-dot" />{food.foodPartner?.name || "Featured kitchen"}</p>
                  <h1>{food.name}</h1>
                  <p className="reel__description">{food.description}</p>
                  <Link className="store-button" to={`/food-partner/${food.foodPartner?._id}`} onClick={(event) => event.stopPropagation()}>Visit Store <span>↗</span></Link>
                </div>
                <aside className="reel-actions" aria-label={`${food.name} actions`} onClick={(event) => event.stopPropagation()}>
                  <ReelAction active={isLiked} count={isLiked ? 1801 : 1800} icon="heart" label={isLiked ? "Unlike food" : "Like food"} onClick={() => likeFood(food)} />
                  <ReelAction active={isSaved} count={isSaved ? 941 : 940} icon="bookmark" label={isSaved ? "Remove saved food" : "Save food"} onClick={() => toggleSetValue(saved, food._id, setSaved)} />
                </aside>
              </div>
            </article>
          );
        })}
      </section>}
      {logoutOpen && <LogoutModal onCancel={() => setLogoutOpen(false)} onConfirm={handleLogout} />}
    </main>
  );
};

export default Home;
