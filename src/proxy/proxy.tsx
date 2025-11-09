const API_KEY = import.meta.env.TMDB_KEY;

export async function apiGet(path: string) {
    const res = await fetch(`/api${path}${path.includes("?") ? "&" : "?"}api_key=${API_KEY}&language=fr-FR`);
    return res.json();
}
