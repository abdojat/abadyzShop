import {
    ADD_TO_CART,
    REMOVE_ITEM_FROM_CART,
    SAVE_SHIPPING_INFO,
    CLEAR_CART
} from '../constants/cartConstants';

import {
    getProductDetails
} from '../api/index';

export const addToCart = (id, quantity) => async (dispatch, getState) => {
    const { data } = await getProductDetails(id);
    console.log(data.product);
    dispatch({
        type: ADD_TO_CART,
        payload: {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0],
            stock: data.product.stock,
            quantity
        }
    });

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