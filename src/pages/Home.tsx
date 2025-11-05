import MovieCard from "../components/MovieCard";
import { useFetch } from "../hooks/useFetch";
import type { MovieResponse } from "../types/Movie";

export default function Home() {
    const { data, loading } = useFetch<MovieResponse>(
        "https://api.themoviedb.org/3/trending/movie/week?api_key=e73af6fd20ee93da95173006d6e336a8"
    );

    return (
        <div className="home-page">

            <h1 className="main-title">🎬 Tendances de la semaine</h1>
            <p className="subtitle">Découvrez les films les plus populaires du moment.</p>

            {loading && <p>Chargement des films...</p>}

            <div className="movie-grid">
                {data?.results?.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
}
