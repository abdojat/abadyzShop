// Image optimization configuration
export const imageConfig = {
    quality: 80,
    formats: ['webp', 'avif'],
    sizes: {
        thumbnail: 150,
        small: 300,
        medium: 600,
        large: 1200
    }
};

// Lazy loading configuration
export const lazyLoadConfig = {
    rootMargin: '50px 0px',
    threshold: 0.1
};

// Service Worker configuration
export const serviceWorkerConfig = {
    cacheName: 'ecommerce-cache-v1',
    urlsToCache: [
        '/',
        '/index.html',
        '/static/js/main.chunk.js',
        '/static/js/0.chunk.js',
        '/static/js/bundle.js',
        '/manifest.json',
        '/favicon.ico'
    ]
};

// Performance monitoring
export const performanceMetrics = {
    // First Contentful Paint (FCP)
    fcp: () => {
        const fcp = performance.getEntriesByName('first-contentful-paint')[0];
        return fcp ? fcp.startTime : null;
    },
    // Largest Contentful Paint (LCP)
    lcp: () => {
        const lcp = performance.getEntriesByName('largest-contentful-paint')[0];
        return lcp ? lcp.startTime : null;
    },
    // First Input Delay (FID)
    fid: () => {
        const fid = performance.getEntriesByName('first-input-delay')[0];
        return fid ? fid.duration : null;
    },
    // Cumulative Layout Shift (CLS)
    cls: () => {
        const cls = performance.getEntriesByName('cumulative-layout-shift')[0];
        return cls ? cls.value : null;
    }
};

// Resource hints
export const resourceHints = {
    preconnect: [
        process.env.REACT_APP_API_URL,
        'https://res.cloudinary.com',
        'https://js.stripe.com',
        'https://www.paypal.com'
    ],
    prefetch: [
        '/products',
        '/cart',
        '/profile'
    ],
    preload: [
        '/fonts/main-font.woff2',
        '/images/logo.svg'
    ]
};

// Code splitting configuration
export const codeSplittingConfig = {
    chunks: {
        vendor: [
            'react',
            'react-dom',
            'react-router-dom',
            '@mui/material',
            '@mui/icons-material'
        ],
        payment: [
            '@stripe/stripe-js',
            '@paypal/react-paypal-js'
        ]
    }
};

// Cache configuration
export const cacheConfig = {
    api: {
        maxAge: 5 * 60 * 1000, // 5 minutes
        staleWhileRevalidate: true
    },
    static: {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        staleWhileRevalidate: true
    }
};

// Performance monitoring setup
export const setupPerformanceMonitoring = () => {
    // Report Web Vitals
    if (typeof window !== 'undefined') {
        import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
            getCLS(console.log);
            getFID(console.log);
            getFCP(console.log);
            getLCP(console.log);
            getTTFB(console.log);
        });
    }
};

// Error boundary configuration
export const errorBoundaryConfig = {
    fallback: <div>Something went wrong. Please try again.</div>,
    onError: (error, errorInfo) => {
        console.error('Error caught by boundary:', error, errorInfo);
        // Report to error tracking service
    }
}; 