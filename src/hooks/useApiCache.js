import { useState, useEffect, useCallback } from 'react';
import { cacheConfig } from '../config/performance';

const cache = new Map();

export const useApiCache = (url, options = {}) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const {
        method = 'GET',
        body,
        headers = {},
        cacheTime = cacheConfig.api.maxAge,
        staleWhileRevalidate = cacheConfig.api.staleWhileRevalidate,
        dependencies = []
    } = options;

    const fetchData = useCallback(async (isRevalidate = false) => {
        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    ...headers
                },
                body: body ? JSON.stringify(body) : undefined
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            
            if (!isRevalidate) {
                setData(result);
                setError(null);
            }

            // Cache the response
            cache.set(url, {
                data: result,
                timestamp: Date.now()
            });

            return result;
        } catch (err) {
            if (!isRevalidate) {
                setError(err);
                setData(null);
            }
            throw err;
        } finally {
            if (!isRevalidate) {
                setLoading(false);
            }
        }
    }, [url, method, body, headers]);

    useEffect(() => {
        const cachedData = cache.get(url);
        const now = Date.now();

        if (cachedData && now - cachedData.timestamp < cacheTime) {
            // Use cached data if it's still fresh
            setData(cachedData.data);
            setLoading(false);

            // Revalidate in the background if enabled
            if (staleWhileRevalidate) {
                fetchData(true).catch(console.error);
            }
        } else {
            // Fetch fresh data
            fetchData().catch(console.error);
        }
    }, [url, cacheTime, staleWhileRevalidate, fetchData, ...dependencies]);

    const invalidateCache = useCallback(() => {
        cache.delete(url);
    }, [url]);

    const updateCache = useCallback((newData) => {
        cache.set(url, {
            data: newData,
            timestamp: Date.now()
        });
        setData(newData);
    }, [url]);

    return {
        data,
        error,
        loading,
        invalidateCache,
        updateCache,
        refetch: () => fetchData()
    };
};

// Example usage:
/*
const MyComponent = () => {
    const { data, error, loading, refetch } = useApiCache(
        'https://api.example.com/data',
        {
            cacheTime: 5 * 60 * 1000, // 5 minutes
            staleWhileRevalidate: true,
            dependencies: [someState] // Refetch when someState changes
        }
    );

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <pre>{JSON.stringify(data, null, 2)}</pre>
            <button onClick={refetch}>Refresh</button>
        </div>
    );
};
*/ 