import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import type { Movie } from "../types/Movie";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function MovieDetail() {
    const { id } = useParams<{ id: string }>();

    const { data, loading } = useFetch<Movie & { credits?: never }>(
        id
            ? `https://api.themoviedb.org/3/movie/${id}?api_key=e73af6fd20ee93da95173006d6e336a8&language=fr-FR&append_to_response=credits`
            : undefined
    );

    if (loading || !data) return <p style={{ padding: "2rem" }}>Chargement...</p>;

    const posterUrl = data.poster_path
        ? `${IMAGE_BASE_URL}${data.poster_path}`
        : "https://via.placeholder.com/300x450?text=No+Image";

    const genres = data.genres?.map(g => g.name).join(", ") || "Non spécifié";

    return (
        <div className="detail-page">
            <div className="detail-content">
                <img className="detail-poster" src={posterUrl} alt={data.title} />

                <div className="detail-info">
                    <h1>{data.title}</h1>

                    <p><strong>Année :</strong> {data.release_date?.slice(0, 4) || "?"}</p>
                    <p><strong>Note :</strong> ⭐ {data.vote_average?.toFixed(1) || "N/A"}/10</p>
                    <p><strong>Durée :</strong> {data.runtime ? `${data.runtime} min` : "Inconnue"}</p>
                    <p><strong>Genres :</strong> {genres}</p>
                    <p><strong>Langue originale :</strong> {data.original_language?.toUpperCase()}</p>

                    <p className="overview">
                        <strong>Synopsis :</strong><br />
                        {data.overview || "Aucun résumé disponible."}
                    </p>

                    {data.homepage && (
                        <a href={data.homepage} target="_blank" className="detail-link">
                            → Site officiel
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
