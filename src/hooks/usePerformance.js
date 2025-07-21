import { useEffect, useCallback } from 'react';
import { performanceMetrics } from '../config/performance';

export const usePerformance = () => {
    const measurePerformance = useCallback(() => {
        const metrics = {
            fcp: performanceMetrics.fcp(),
            lcp: performanceMetrics.lcp(),
            fid: performanceMetrics.fid(),
            cls: performanceMetrics.cls()
        };

        // Log metrics to console in development
        if (process.env.NODE_ENV === 'development') {
            console.log('Performance Metrics:', metrics);
        }

        // Send metrics to analytics in production
        if (process.env.NODE_ENV === 'production') {
            // TODO: Implement analytics reporting
            // sendToAnalytics(metrics);
        }

        return metrics;
    }, []);

    const measureComponentRender = useCallback((componentName) => {
        const startTime = performance.now();
        return () => {
            const endTime = performance.now();
            const renderTime = endTime - startTime;
            
            if (process.env.NODE_ENV === 'development') {
                console.log(`${componentName} render time:`, renderTime, 'ms');
            }

            // Log slow renders
            if (renderTime > 16) { // 60fps threshold
                console.warn(`${componentName} took ${renderTime}ms to render`);
            }
        };
    }, []);

    const measureApiCall = useCallback((endpoint) => {
        const startTime = performance.now();
        return () => {
            const endTime = performance.now();
            const duration = endTime - startTime;
            
            if (process.env.NODE_ENV === 'development') {
                console.log(`${endpoint} API call duration:`, duration, 'ms');
            }

            // Log slow API calls
            if (duration > 1000) { // 1 second threshold
                console.warn(`${endpoint} API call took ${duration}ms`);
            }
        };
    }, []);

    const measureResourceLoad = useCallback((resourceUrl) => {
        const startTime = performance.now();
        return () => {
            const endTime = performance.now();
            const loadTime = endTime - startTime;
            
            if (process.env.NODE_ENV === 'development') {
                console.log(`${resourceUrl} load time:`, loadTime, 'ms');
            }

            // Log slow resource loads
            if (loadTime > 1000) { // 1 second threshold
                console.warn(`${resourceUrl} took ${loadTime}ms to load`);
            }
        };
    }, []);

    useEffect(() => {
        // Measure initial page load performance
        const initialMetrics = measurePerformance();

        // Set up performance observer for long tasks
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.duration > 50) { // 50ms threshold
                    console.warn('Long task detected:', entry);
                }
            }
        });

        observer.observe({ entryTypes: ['longtask'] });

        return () => {
            observer.disconnect();
        };
    }, [measurePerformance]);

    return {
        measurePerformance,
        measureComponentRender,
        measureApiCall,
        measureResourceLoad
    };
}; 