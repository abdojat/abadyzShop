import { useState, useEffect, useRef } from 'react';
import { imageConfig, lazyLoadConfig } from '../config/performance';

export const useImageOptimization = (src, alt, options = {}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [currentSrc, setCurrentSrc] = useState('');
    const imgRef = useRef(null);
    const observerRef = useRef(null);

    const {
        size = 'medium',
        quality = imageConfig.quality,
        format = 'webp',
        lazyLoad = true,
        placeholder = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
    } = options;

    useEffect(() => {
        const optimizeImage = async () => {
            try {
                // If using Cloudinary or similar service
                if (src.includes('cloudinary.com')) {
                    const optimizedSrc = src.replace('/upload/', `/upload/w_${imageConfig.sizes[size]},q_${quality},f_${format}/`);
                    setCurrentSrc(optimizedSrc);
                } else {
                    // For local images, you might want to use a different optimization strategy
                    setCurrentSrc(src);
                }
            } catch (err) {
                setError(err);
                setCurrentSrc(src); // Fallback to original source
            }
        };

        optimizeImage();
    }, [src, size, quality, format]);

    useEffect(() => {
        if (lazyLoad && imgRef.current) {
            observerRef.current = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            img.src = currentSrc;
                            observerRef.current.unobserve(img);
                        }
                    });
                },
                {
                    rootMargin: lazyLoadConfig.rootMargin,
                    threshold: lazyLoadConfig.threshold
                }
            );

            observerRef.current.observe(imgRef.current);
        }

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [lazyLoad, currentSrc]);

    const handleLoad = () => {
        setIsLoaded(true);
    };

    const handleError = (err) => {
        setError(err);
        setIsLoaded(true);
    };

    const imageProps = {
        ref: imgRef,
        src: lazyLoad ? placeholder : currentSrc,
        alt,
        onLoad: handleLoad,
        onError: handleError,
        style: {
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out'
        }
    };

    return {
        imageProps,
        isLoaded,
        error
    };
};

// Example usage:
/*
const MyComponent = () => {
    const { imageProps, isLoaded, error } = useImageOptimization(
        'https://example.com/image.jpg',
        'Description',
        {
            size: 'medium',
            quality: 80,
            format: 'webp',
            lazyLoad: true
        }
    );

    if (error) {
        return <div>Error loading image</div>;
    }

    return (
        <div>
            <img {...imageProps} />
            {!isLoaded && <div>Loading...</div>}
        </div>
    );
};
*/ 