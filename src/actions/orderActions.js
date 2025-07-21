import axios from 'axios';
import {
    ALL_ORDERS_REQUEST,
    ALL_ORDERS_SUCCESS,
    ALL_ORDERS_FAIL,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_FAIL,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    CLEAR_ERRORS
} from '../constants/orderConstants';


import { createOrder as creator, myOrders as mine } from '../api/index';
import {
    getAllOrders as getterOfAll,
    updateOrder as updator,
    deleteOrder as deleter,
    getOrderDetails as getterById,
} from '../api/index'
// Get all orders - ADMIN
export const getAllOrders = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_ORDERS_REQUEST });

        const { data } = await getterOfAll();

        dispatch({
            type: ALL_ORDERS_SUCCESS,
            payload: data.orders
        });

    } catch (error) {
        dispatch({
            type: ALL_ORDERS_FAIL,
            payload: error.response.data.message
        });
    }
};

// Update order - ADMIN
export const updateOrder = (id, orderData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_ORDER_REQUEST });

        const { data } = await updator(id, orderData);

        dispatch({
            type: UPDATE_ORDER_SUCCESS,
            payload: data.success
        });

    } catch (error) {
        dispatch({
            type: UPDATE_ORDER_FAIL,
            payload: error.response.data.message
        });
    }
};

// Delete order - ADMIN
export const deleteOrder = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_ORDER_REQUEST });

        const { data } = await deleter(id);

        dispatch({
            type: DELETE_ORDER_SUCCESS,
            payload: data.success
        });

    } catch (error) {
        dispatch({
            type: DELETE_ORDER_FAIL,
            payload: error.response.data.message
        });
    }
};

// Get order details
export const getOrderDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST });

        const { data } = await getterById(id);

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data.order
        });

    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response.data.message
        });
    }
};



export const createOrder = (orderData) => async (dispatch) => {
    try {
        const { data } = await creator(orderData);
        dispatch({ type: 'CREATE_ORDER_SUCCESS', payload: data });
    } catch (error) {
        dispatch({ type: 'CREATE_ORDER_FAIL', payload: error.response.data.message });
    }
};

export const myOrders = () => async (dispatch) => {
    try {
        const { data } = await mine();
        dispatch({ type: 'MY_ORDERS_SUCCESS', payload: data.orders });
    } catch (error) {
        dispatch({ type: 'MY_ORDERS_FAIL', payload: error.response.data.message });
    }
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    });
};