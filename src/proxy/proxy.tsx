const API_KEY = import.meta.env.VITE_TMDB_KEY;
const BASE = "/api";

export function api(path: string, params: Record<string, string | number> = {}) {
    const query = new URLSearchParams({
        api_key: API_KEY,
        language: "fr-FR",
        ...params
    });

    return `${BASE}${path}?${query.toString()}`;
}
