import { useEffect, useState } from "react";

export function useFetch<T>(url?: string) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!url) return;
        setLoading(true);

        fetch(url)
            .then((res) => res.json())
            .then(setData)
            .finally(() => setLoading(false));
    }, [url]);

    return { data, loading };
}
