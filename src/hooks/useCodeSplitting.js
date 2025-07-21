import { useState, useEffect, useCallback } from 'react';
import { codeSplittingConfig } from '../config/performance';

const loadedChunks = new Set();

export const useCodeSplitting = (importFn, options = {}) => {
    const [Component, setComponent] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const {
        fallback = <div>Loading...</div>,
        onError = (err) => console.error('Error loading chunk:', err),
        chunkName,
        preload = false
    } = options;

    const loadChunk = useCallback(async () => {
        try {
            const module = await importFn();
            const component = module.default || module;
            setComponent(() => component);
            setError(null);

            if (chunkName) {
                loadedChunks.add(chunkName);
            }

            return component;
        } catch (err) {
            setError(err);
            onError(err);
            return null;
        } finally {
            setLoading(false);
        }
    }, [importFn, chunkName, onError]);

    useEffect(() => {
        if (preload && !Component && !loading) {
            loadChunk();
        }
    }, [preload, Component, loading, loadChunk]);

    const preloadChunk = useCallback(() => {
        if (!Component && !loading) {
            loadChunk();
        }
    }, [Component, loading, loadChunk]);

    const isChunkLoaded = useCallback((name) => {
        return loadedChunks.has(name);
    }, []);

    const getLoadedChunks = useCallback(() => {
        return Array.from(loadedChunks);
    }, []);

    return {
        Component: Component || fallback,
        error,
        loading,
        preloadChunk,
        isChunkLoaded,
        getLoadedChunks
    };
};

// Example usage:
/*
const MyComponent = () => {
    const { Component, loading, error } = useCodeSplitting(
        () => import('./HeavyComponent'),
        {
            chunkName: 'heavy-component',
            fallback: <div>Loading heavy component...</div>,
            preload: true
        }
    );

    if (error) return <div>Error loading component</div>;

    return (
        <div>
            {loading ? <div>Loading...</div> : <Component />}
        </div>
    );
};

// Preload multiple chunks
const preloadChunks = () => {
    const chunks = [
        { importFn: () => import('./ComponentA'), name: 'component-a' },
        { importFn: () => import('./ComponentB'), name: 'component-b' }
    ];

    chunks.forEach(({ importFn, name }) => {
        useCodeSplitting(importFn, { chunkName: name, preload: true });
    });
};
*/ 