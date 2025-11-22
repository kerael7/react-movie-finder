// src/pages/Search.tsx
import { useSearch } from "../context/SearchContext";
import { useFetch } from "../hooks/useFetch";
import MovieCard from "../components/MovieCard";
import type { GenreResponse, MovieResponse } from "../types/Movie";
import { api } from "../proxy/proxy";
import {useEffect, useMemo, useState} from "react";

export default function Search() {
    const { query, setQuery, results, setResults } = useSearch();

    // Filtres
    const [minYear, setMinYear] = useState("");
    const [minRating, setMinRating] = useState("");
    const [selectedGenre, setSelectedGenre] = useState("");
    const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);

    // Pagination
    const [page, setPage] = useState(1);

    useEffect(() => {
        setPage(1);
    }, [query]);

    // Chargement des genres
    const { data: genreData } = useFetch<GenreResponse>(
        api("/genre/movie/list")
    );

    useEffect(() => {
        if (genreData?.genres) {
            setGenres(genreData.genres);
        }
    }, [genreData]);

    // Recherche films
    const url =
        query.trim().length >= 3
            ? api("/search/movie", { query, page })
            : undefined;

    const { data, loading } = useFetch<MovieResponse>(url);

    useEffect(() => {
        if (data?.results) {
            setResults(data.results);
        }
    }, [data, setResults]);

    // Filtres
    const filteredResults = useMemo(() => {
        return results
            ?.filter(movie => minYear ? Number(movie.release_date?.slice(0, 4)) >= Number(minYear) : true)
            .filter(movie => minRating ? movie.vote_average >= Number(minRating) : true)
            .filter(movie =>
                selectedGenre
                    ? movie.genre_ids?.includes(Number(selectedGenre)) ||
                    movie.genres?.some(g => g.id === Number(selectedGenre))
                    : true
            );
    }, [results, minYear, minRating, selectedGenre]);


    const totalPages = data?.total_pages ?? 0;
    const pagesToShow = Math.min(totalPages, 5);

    return (
        <div className="search-page">
            <div className="search-bar">
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Cherche un film..."
                />
            </div>

            <div className="filters">
                <input
                    type="number"
                    placeholder="Année min"
                    value={minYear}
                    onChange={(e) => setMinYear(e.target.value)}
                    className="filter-input"
                />

                <input
                    type="number"
                    placeholder="Note min /10"
                    value={minRating}
                    onChange={(e) => setMinRating(e.target.value)}
                    className="filter-input"
                />

                <select
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                    className="filter-input"
                >
                    <option value="">Tous genres</option>
                    {genres.map((g) => (
                        <option key={g.id} value={g.id}>
                            {g.name}
                        </option>
                    ))}
                </select>
            </div>

            {loading && query.trim().length >= 3 && <p>Chargement...</p>}

            <div className="movie-grid">
                {filteredResults?.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>

            {pagesToShow > 1 && (
                <div className="pagination">
                    {Array.from({ length: pagesToShow }, (_, i) => {
                        const pageNumber = i + 1;
                        return (
                            <button
                                key={pageNumber}
                                className={`page-btn ${
                                    pageNumber === page ? "active" : ""
                                }`}
                                onClick={() => setPage(pageNumber)}
                                disabled={loading}
                            >
                                {pageNumber}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
