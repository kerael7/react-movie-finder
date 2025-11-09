import { useSearch } from "../context/SearchContext";
import { useFetch } from "../hooks/useFetch";
import MovieCard from "../components/MovieCard";
import type { MovieResponse } from "../types/Movie";

export default function Search() {
    const { query, setQuery, results, setResults } = useSearch();

    const { data, loading } = useFetch<MovieResponse>(
        query.trim().length >= 2
            ? `https://api.themoviedb.org/3/search/movie?api_key=e73af6fd20ee93da95173006d6e336a8&query=${encodeURIComponent(
                query.trim()
            )}`
            : undefined
    );

    if (data && data.results && results !== data.results) {
        setResults(data.results);
    }

    return (
        <div className="search-page">
            <div className="search-bar">
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Cherche un film..." />
            </div>

            {loading && <p>Chargement...</p>}

            <div className="movie-grid">
                {results?.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
}
