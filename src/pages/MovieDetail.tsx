// src/pages/MovieDetail.tsx
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import type { Movie } from "../types/Movie";
import { api } from "../proxy/proxy";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function MovieDetail() {
    const { id } = useParams<{ id: string }>();

    const url = id
        ? api(`/movie/${id}`, { append_to_response: "credits" })
        : undefined;

    const { data, loading } = useFetch<Movie>(url);

    if (loading || !data) {
        return <p style={{ padding: "2rem" }}>Chargement...</p>;
    }

    const posterUrl = `${IMAGE_BASE_URL}${data.poster_path}`;

    const genres =
        data.genres?.map((g) => g.name).join(", ") || "Non spécifié";

    const cast =
        data.credits?.cast
            ?.slice(0, 5)
            .map((a) => a.name)
            .join(", ") || "Non disponible";

    return (
        <div className="detail-page">
            <div className="detail-content">
                <img className="detail-poster" src={posterUrl} alt={data.title} />

                <div className="detail-info">
                    <h1>{data.title}</h1>

                    <p>
                        <strong>Année :</strong>{" "}
                        {data.release_date?.slice(0, 4) || "?"}
                    </p>
                    <p>
                        <strong>Note :</strong>{" "}
                        ⭐ {data.vote_average?.toFixed(1) || "N/A"}/10
                    </p>
                    <p>
                        <strong>Durée :</strong>{" "}
                        {data.runtime ? `${data.runtime} min` : "Inconnue"}
                    </p>
                    <p>
                        <strong>Genres :</strong> {genres}
                    </p>
                    <p>
                        <strong>Langue :</strong>{" "}
                        {data.original_language?.toUpperCase()}
                    </p>

                    <p className="overview">
                        <strong>Synopsis :</strong>
                        <br />
                        {data.overview || "Aucun résumé disponible."}
                    </p>

                    <p>
                        <strong>Acteurs principaux :</strong> {cast}
                    </p>

                    {data.homepage && (
                        <a
                            href={data.homepage}
                            target="_blank"
                            rel="noreferrer"
                            className="detail-link"
                        >
                            → Site officiel
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
