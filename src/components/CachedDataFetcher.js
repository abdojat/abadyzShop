import React from 'react';
import { useApiCache } from '../hooks/useApiCache';

export const CachedDataFetcher = ({
    url,
    options = {},
    children,
    loadingComponent = <div>Loading...</div>,
    errorComponent = (error) => <div>Error: {error.message}</div>
}) => {
    const {
        data,
        error,
        loading,
        refetch,
        invalidateCache,
        updateCache
    } = useApiCache(url, options);

    if (loading) {
        return loadingComponent;
    }

    if (error) {
        return errorComponent(error);
    }

    return children({
        data,
        refetch,
        invalidateCache,
        updateCache
    });
};

// Example usage:
/*
<CachedDataFetcher
    url="/api/products"
    options={{
        cacheTime: 5 * 60 * 1000,
        staleWhileRevalidate: true
    }}
    loadingComponent={<div>Loading products...</div>}
    errorComponent={(error) => <div>Error loading products: {error.message}</div>}
>
    {({ data, refetch }) => (
        <div>
            <h1>Products</h1>
            <button onClick={refetch}>Refresh</button>
            <ul>
                {data.map(product => (
                    <li key={product.id}>{product.name}</li>
                ))}
            </ul>
        </div>
    )}
</CachedDataFetcher>
*/ 