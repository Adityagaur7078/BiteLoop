import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./FoodCollection.css";
import API_URL from "../../api/api";

const FoodCollection = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const [foods, setFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const storageKey = type === "liked" ? "biteloop-liked" : "biteloop-saved";
  const title = type === "liked" ? "Liked foods" : "Saved foods";
  const icon = type === "liked" ? "♥" : "▣";

  useEffect(() => {
    const loadCollection = async () => {
      try {
        const ids = JSON.parse(localStorage.getItem(storageKey) || "[]");
        const response = await axios.get(`${API_URL}/api/food`, { withCredentials: true });
        setFoods((response.data.foodItems || []).filter((food) => ids.includes(food._id)));
      } catch {
        setFoods([]);
      } finally {
        setIsLoading(false);
      }
    };
    loadCollection();
  }, [storageKey]);

  return (
    <main className="collection-page">
      <header className="collection-header">
        <Link className="collection-back" to="/"><span aria-hidden="true">←</span> Back to reels</Link>
        <span className="collection-brand">BiteLoop</span>
      </header>
      <section className="collection-shell">
        <span className="collection-kicker">Your collection</span>
        <h1><span>{icon}</span> {title}</h1>
        <p className="collection-intro">A quiet place for the meals that made you stop scrolling.</p>
        {isLoading ? <div className="collection-loading">Loading your collection...</div> : foods.length ? (
          <div className="collection-grid">
            {foods.map((food) => <button className="collection-tile" type="button" key={food._id} onClick={() => navigate("/")}><video src={food.video} muted playsInline preload="metadata" /><span>{food.name}</span></button>)}
          </div>
        ) : <div className="collection-empty"><strong>Nothing here yet.</strong><span>When a meal catches your eye, it will appear here.</span><Link to="/">Explore the feed</Link></div>}
      </section>
    </main>
  );
};

export default FoodCollection;
