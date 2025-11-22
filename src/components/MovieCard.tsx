import { memo, useCallback } from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import type { Movie } from "../types/Movie";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

type Props = {
    movie: Movie;
};

function MovieCard({ movie }: Props) {
    const { favorites, toggleFavorite } = useFavorites();
    const isFavorite = favorites.some((m) => m.id === movie.id);

    const posterUrl = `${IMAGE_BASE_URL}${movie.poster_path}`;

    const handleFavoriteClick = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(movie);
    }, [toggleFavorite, movie]);

    return (
        <Link to={`/movie/${movie.id}`} className="movie-card-link">
            <div className="movie-card">
                <img src={posterUrl} alt={movie.title} />

                <div className="movie-info">
                    <h4>{movie.title}</h4>
                    <p>{movie.release_date?.slice(0, 4)}</p>

                    <button onClick={handleFavoriteClick} className="fav-btn">
                        {isFavorite ? "💔 Retirer" : "❤️ Sauvegarder"}
                    </button>
                </div>
            </div>
        </Link>
    );
}

export default memo(MovieCard);
