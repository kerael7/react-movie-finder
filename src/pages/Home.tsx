import MovieCard from "../components/MovieCard";
import { useFetch } from "../hooks/useFetch";
import type { MovieResponse } from "../types/Movie";
import {useMemo} from "react";


export default function Home() {
    const { data, loading } = useFetch<MovieResponse>(
        "https://api.themoviedb.org/3/trending/movie/week?api_key=e73af6fd20ee93da95173006d6e336a8"
    );

    // ✅ useMemo pour éviter recalcul de la liste quand rien n'a changé
    const movieList = useMemo(() => {
        console.log("🎞️ Recalcul de la liste (useMemo)");
        return data?.results?.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
        ));
    }, [data?.results]); // ✅ recalcul seulement quand les résultats changent

    return (
        <div className="home-page">

            <h1 className="main-title">🎬 Tendances de la semaine</h1>
            <p className="subtitle">Découvrez les films les plus populaires du moment.</p>

            {loading && <p>Chargement des films...</p>}

            <div className="movie-grid">
                {movieList}
            </div>
        </div>
    );
}
