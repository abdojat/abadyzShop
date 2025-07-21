import React from 'react';
import { useImageOptimization } from '../hooks/useImageOptimization';

export const OptimizedImage = ({
    src,
    alt,
    size = 'medium',
    quality = 80,
    format = 'webp',
    lazyLoad = true,
    className,
    style,
    ...props
}) => {
    const { imageProps, isLoaded, error } = useImageOptimization(src, alt, {
        size,
        quality,
        format,
        lazyLoad
    });

    if (error) {
        return (
            <div className={`image-error ${className || ''}`} style={style}>
                <span>Error loading image</span>
            </div>
        );
    }

    return (
        <div
            className={`optimized-image-container ${className || ''}`}
            style={{
                position: 'relative',
                ...style
            }}
        >
            <img
                {...imageProps}
                {...props}
                className={`optimized-image ${isLoaded ? 'loaded' : 'loading'}`}
                style={{
                    ...imageProps.style,
                    width: '100%',
                    height: 'auto',
                    ...props.style
                }}
            />
            {!isLoaded && (
                <div
                    className="image-placeholder"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#f0f0f0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <span>Loading...</span>
                </div>
            )}
        </div>
    );
};

// Example usage:
/*
<OptimizedImage
    src="https://example.com/image.jpg"
    alt="Product image"
    size="medium"
    quality={80}
    format="webp"
    lazyLoad={true}
    className="product-image"
/>
*/ 