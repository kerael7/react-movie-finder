import MovieCard from "../components/MovieCard";
import { useFetch } from "../hooks/useFetch";
import { api } from "../proxy/proxy";
import type { MovieResponse } from "../types/Movie";
import { useMemo } from "react";

export default function Home() {

    const { data, loading } = useFetch<MovieResponse>(
        api("/trending/movie/week")
    );

    // useMemo pour éviter que la liste soit recalculée à chaque render
    const movieList = useMemo(() => {
        if (!data?.results) return null;
        console.log("Recalcul de la liste");

        return data.results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
        ));
    }, [data?.results]);

    return (
        <div className="home-page">
            <h1 className="main-title">🎬 Tendances de la semaine</h1>
            <p className="subtitle">Découvrez les films les plus populaires du moment.</p>

            {loading && <p>Chargement des films...</p>}

            <div className="movie-grid">{movieList}</div>
        </div>
    );
}
