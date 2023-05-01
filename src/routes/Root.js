import "../css/root.css"
import { Link, Outlet, useLocation } from "react-router-dom"

export default function App() {
  const location = useLocation();

  return (
    <>
      <nav>
        <ul>
          <li><Link to="/pokedex" className={location.pathname.includes("pokedex")  ? "active" : ""}>Pokedex</Link></li>
          <li><Link to="/quiz" className={location.pathname.includes("pokedex")  ? "active" : ""}>Quiz</Link></li>
        </ul>
      </nav>
      <Outlet/>
    
    </>
  );
}