import { createContext, useContext, useState, useCallback } from "react";
import type { Movie } from "../types/Movie";
import * as React from "react";

type SearchContextType = {
    query: string;
    setQuery: (q: string) => void;
    results: Movie[];
    setResults: (movies: Movie[]) => void;
    clearSearch: () => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Movie[]>([]);

    const clearSearch = useCallback(() => {
        setQuery("");
        setResults([]);
    }, []);

    return (
        <SearchContext.Provider value={{ query, setQuery, results, setResults, clearSearch }}>
            {children}
        </SearchContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSearch() {
    const ctx = useContext(SearchContext);
    if (!ctx) throw new Error("useSearch must be used within SearchProvider");
    return ctx;
}
