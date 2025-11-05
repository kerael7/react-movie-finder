import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
    const location = useLocation();

    return (
        <header className="navbar">
            <div className="navbar-left">
                {/*<span className="logo">🎬 Movie Finder</span>*/}
                <nav>
                    <Link
                        to="/"
                        className={`nav-link ${
                            location.pathname === "/" ? "active" : ""
                        }`}
                    >
                        Accueil
                    </Link>
                    <Link
                        to="/search"
                        className={`nav-link ${
                            location.pathname === "/search" ? "active" : ""
                        }`}
                    >
                        Recherche
                    </Link>
                    <Link
                        to="/favorites"
                        className={`nav-link ${
                            location.pathname === "/favorites" ? "active" : ""
                        }`}
                    >
                        Favoris
                    </Link>
                </nav>
            </div>
        </header>
    );
}
