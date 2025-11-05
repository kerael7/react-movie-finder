import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import type { MovieResponse } from "../types/Movie";
import MovieCard from "../components/MovieCard";

export default function Search() {
    const [query, setQuery] = useState("");

    const url =
        query.trim().length >= 3
            ? `https://api.themoviedb.org/3/search/movie?api_key=e73af6fd20ee93da95173006d6e336a8&query=${encodeURIComponent(
                query.trim()
            )}`
            : undefined;

    const { data, loading } = useFetch<MovieResponse>(url);

    return (
        <div className="search-page">
            <div className="search-bar">
                <p>Recherche de films :</p>
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button> Rechercher </button>
            </div>

            {loading && <p>Chargement...</p>}

            <div className="movie-grid">
                {data?.results?.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
}
