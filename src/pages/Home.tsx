import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="home-page">
            <h1 className="home-title">🎬 Movie Finder</h1>
            <p className="home-subtitle">
                Découvrez des milliers de films, explorez les titres tendance et enregistrez vos favoris.
            </p>
            <Link to="/search" className="home-btn">
                Commencez à rechercher
            </Link>
        </div>
    );
}
