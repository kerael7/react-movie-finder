import { useFavorites } from "../context/FavoritesContext";
import MovieCard from "../components/MovieCard";

export default function Favorites() {
    const { favorites } = useFavorites();

    return (
        <div className="search-page">
            <h1 className="main-title">❤️ Mes favoris</h1>
            {favorites.length === 0 && <p>Aucun favori pour le moment 🥲</p>}

            <div className="movie-grid">
                {favorites.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
}
