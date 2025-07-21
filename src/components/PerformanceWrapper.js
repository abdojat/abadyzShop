import React, { useEffect } from 'react';
import { usePerformance } from '../hooks/usePerformance';

export const PerformanceWrapper = ({ children, componentName }) => {
    const { measureComponentRender } = usePerformance();

    useEffect(() => {
        const cleanup = measureComponentRender(componentName);
        return cleanup;
    }, [componentName, measureComponentRender]);

    return children;
};

// Example usage:
/*
<PerformanceWrapper componentName="ProductList">
    <ProductList products={products} />
</PerformanceWrapper>
*/ 