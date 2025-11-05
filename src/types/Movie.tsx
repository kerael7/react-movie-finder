export type Movie = {
    id: number;
    title: string;
    poster_path: string | null;
    release_date?: string;
    overview?: string;
    vote_average?: number;
    runtime?: number;
    original_language?: string;
    homepage?: string;
    genres?: { id: number; name: string }[];
    credits?: {
        cast?: {
            id: number;
            name: string;
            character?: string;
            profile_path?: string | null;
        }[];
    };
};


export type MovieResponse = {
    page: number;
    results: Movie[];
    total_results: number;
    total_pages: number;
};
