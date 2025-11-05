import { useFavorites } from "../context/FavoritesContext";
import type {Movie} from "../types/Movie.tsx";

type Props = {
    movie: Movie;
};

export default function MovieCard({ movie }: Props) {
    const { favorites, toggleFavorite } = useFavorites();
    const isFavorite = favorites.some((m) => m.id === movie.id);

    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "https://via.placeholder.com/200x300?text=No+Poster";

    return (
        <div className="movie-card">
            <img src={posterUrl} alt={movie.title} />
            <div className="movie-info">
                <h4>{movie.title}</h4>
                <p>{movie.release_date?.slice(0, 4)}</p>
                <button onClick={() => toggleFavorite(movie)} className="fav-btn">
                    {isFavorite ? "💔 Retirer" : "❤️ Sauvegarder"}
                </button>
            </div>
        </div>
    );
}
