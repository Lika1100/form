import axios from "axios";
import { useEffect, useState } from "react";

function useFetch<T>(
    url: string,
    query: Record<string, string | number> = {},
) {
    const [product, setProduct] = useState<T | null>(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const queryStr = Object.fromEntries(Object.entries(query).map(([key, value]) => [key, value.toString()]))
        const effectiveUrl = url + "?" + new URLSearchParams(queryStr);
        axios.get<T>(effectiveUrl)
            .then(res => {
                setProduct(res.data)
                setLoading(false)
            })
    }, [url, query])

    return {
        product,
        loading
    }
}

export default useFetch