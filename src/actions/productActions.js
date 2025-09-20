import {
    ADMIN_PRODUCTS_REQUEST,
    ADMIN_PRODUCTS_SUCCESS,
    ADMIN_PRODUCTS_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    CLEAR_ERRORS
} from '../constants/productConstants';

import { getProducts as fetchProducts,
    newProduct,
    getProductDetails as detailsGetter,
    updateProduct as updator,
    deleteProduct as deletor,
    getProducts as getterOfAll,
    createReview
} from '../api/index';

import { getErrorMessage } from '../utils/errorHandler';

// Get all products - ADMIN
export const getAdminProducts = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_PRODUCTS_REQUEST });

        const { data } = await getterOfAll();
        dispatch({
            type: ADMIN_PRODUCTS_SUCCESS,
            payload: data.products
        });

    } catch (error) {
        dispatch({
            type: ADMIN_PRODUCTS_FAIL,
            payload: getErrorMessage(error)
        });
    }
};

// Create new product - ADMIN
export const createProduct = (productData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_PRODUCT_REQUEST });

        const { data } = await newProduct(productData);

        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: getErrorMessage(error)
        });
    }
};

// Update product - ADMIN
export const updateProduct = (id, productData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PRODUCT_REQUEST });

        const { data } = await updator(id,productData);

        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: data.success
        });

    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: getErrorMessage(error)
        });
    }
};

// Delete product - ADMIN
export const deleteProduct = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_PRODUCT_REQUEST });

        const { data } = await deletor(id);
        console.log(data);
        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: data.success
        });

    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: getErrorMessage(error)
        });
    }
};

// Get product details
export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });

        const { data } = await detailsGetter(id);

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product
        });

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: getErrorMessage(error)
        });
    }
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    });
};

export const getProducts = (keyword = '', currentPage = 1, price = [0, 1000], category = '', ratings = 0) => async (dispatch) => {
    try {
        dispatch({ type: 'ALL_PRODUCTS_REQUEST' });
        const { data } = await fetchProducts(keyword, currentPage, price, category, ratings);
        
        dispatch({
            type: 'ALL_PRODUCTS_SUCCESS',
            payload: data
        });
    } catch (error) {
        dispatch({
            type: 'ALL_PRODUCTS_FAIL',
            payload: getErrorMessage(error)
        });
    }
};

// Create new review
export const createProductReview = (reviewData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_REVIEW_REQUEST });

        const { data } = await createReview(reviewData);
        
        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.success
        });

    } catch (error) {
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: getErrorMessage(error)
        });
    }
};
