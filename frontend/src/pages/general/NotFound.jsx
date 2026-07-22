import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => (
  <main className="not-found-page">
    <span className="not-found-mark">404</span>
    <span className="not-found-kicker">Wrong turn</span>
    <h1>This page didn&apos;t make the cut.</h1>
    <p>Let&apos;s get you back to the good stuff.</p>
    <Link to="/">Return to BiteLoop <span>↗</span></Link>
  </main>
);

export default NotFound;
