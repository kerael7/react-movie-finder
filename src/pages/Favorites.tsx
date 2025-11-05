import { useFavorites } from "../context/FavoritesContext";
import MovieCard from "../components/MovieCard";

export default function Favorites() {
    const { favorites } = useFavorites();

    if (favorites.length === 0)
        return <p style={{ textAlign: "center" }}>Aucun favori pour le moment</p>;

    return (
        <div className="favorites-page">
            <h2>Mes favoris</h2>
            <div className="movie-grid">
                {favorites.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
}
