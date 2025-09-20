import {
    ADD_TO_CART,
    REMOVE_ITEM_FROM_CART,
    SAVE_SHIPPING_INFO,
    CLEAR_CART
} from '../constants/cartConstants';

import {
    getProductDetails
} from '../api/index';

import { getErrorMessage } from '../utils/errorHandler';

export const addToCart = (id, quantity) => async (dispatch, getState) => {
    try {
        const { data } = await getProductDetails(id);
        console.log(data.product);
        
        // Add safety check for product data
        if (!data || !data.product) {
            throw new Error('Product data not found');
        }
        
        dispatch({
            type: ADD_TO_CART,
            payload: {
                product: data.product._id,
                name: data.product.name,
                price: data.product.price,
                image: data.product.images?.[0] || { url: '' },
                stock: data.product.stock,
                quantity
            }
        });
    } catch (error) {
        console.error('Add to cart error:', getErrorMessage(error));
        // You might want to dispatch an error action here if you have one
        throw error; // Re-throw so UI can handle it
    }
};

export const removeFromCart = (id) => async (dispatch, getState) => {
    dispatch({
        type: REMOVE_ITEM_FROM_CART,
        payload: id
    });

};

export const saveShippingInfo = (data) => async (dispatch) => {
    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data
    });
};

export const clearCart = () => async (dispatch) => {
    dispatch({
        type: CLEAR_CART
    });
};