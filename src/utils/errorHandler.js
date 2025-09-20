// Utility function to safely extract error messages from API responses
export const getErrorMessage = (error) => {
    // Check if error has response and data properties
    if (error?.response?.data?.message) {
        return error.response.data.message;
    }
    
    // Check if error has response but no data.message
    if (error?.response?.data) {
        // Sometimes error might be in different format
        if (typeof error.response.data === 'string') {
            return error.response.data;
        }
        
        // Check for other possible error fields
        if (error.response.data.error) {
            return error.response.data.error;
        }
        
        if (error.response.data.errors) {
            // Handle validation errors (array format)
            if (Array.isArray(error.response.data.errors)) {
                return error.response.data.errors.map(err => err.message || err).join(', ');
            }
            return error.response.data.errors;
        }
    }
    
    // Check if error has just a message property
    if (error?.message) {
        return error.message;
    }
    
    // Check for network errors
    if (error?.code === 'NETWORK_ERROR' || error?.code === 'ERR_NETWORK') {
        return 'Network error. Please check your connection and try again.';
    }
    
    // Check for timeout errors
    if (error?.code === 'TIMEOUT' || error?.code === 'ECONNABORTED') {
        return 'Request timeout. Please try again.';
    }
    
    // Fallback for unknown errors
    return 'An unexpected error occurred. Please try again.';
};

// Alternative function for getting the full error object safely
export const getErrorPayload = (error) => {
    // For cases where we need to pass the full error object
    if (error?.response) {
        return {
            message: getErrorMessage(error),
            status: error.response.status,
            data: error.response.data
        };
    }
    
    return {
        message: getErrorMessage(error),
        status: null,
        data: null
    };
};