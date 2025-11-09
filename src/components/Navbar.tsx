import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeProvider";

export default function Navbar() {
    const location = useLocation();
    const { theme, setTheme } = useTheme();

    return (
        <header className="navbar">
            <div className="navbar-left">
                <nav>
                    <Link
                        to="/"
                        className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
                    >
                        Accueil
                    </Link>
                    <Link
                        to="/search"
                        className={`nav-link ${location.pathname === "/search" ? "active" : ""}`}
                    >
                        Recherche
                    </Link>
                    <Link
                        to="/favorites"
                        className={`nav-link ${location.pathname === "/favorites" ? "active" : ""}`}
                    >
                        Favoris
                    </Link>
                </nav>
            </div>

            {/* Toggle placé à droite */}
            <div className="navbar-right">
                <label className="theme-switch">
                    <input
                        type="checkbox"
                        checked={theme === "dark"}
                        onChange={() => setTheme(theme === "light" ? "dark" : "light")}
                    />
                    <span className="slider"></span>
                </label>
            </div>
        </header>
    );
}
