// src/actions/authActions.js

import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    CLEAR_ERRORS
} from '../constants/authConstants';

import {
    login as loginUser,
    register as registerUser,
    loadUser as loader,
    logout as outer,
    updateProfile as profileUpdater,
    updatePassword as passwordsUpdater,
    forgotPassword as passwordForgetting,
    resetPassword as resetPasswordApi
} from '../api/index';

import { clearCart } from './cartActions';
import { getErrorMessage } from '../utils/errorHandler';

// Login user
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });
        const resp = await loginUser({ email, password });
        const data = (resp && resp.data) ? resp.data : resp;
        if (!data) throw new Error('Empty response from login API');
        if (data.token) localStorage.setItem('token', data.token);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user
        });

    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: getErrorMessage(error)
        });
    }
};

// Register user
export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_REQUEST });
        const resp = await registerUser(userData);
        const data = (resp && resp.data) ? resp.data : resp;
        if (!data) throw new Error('Empty response from register API');
        if (data.token) localStorage.setItem('token', data.token);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: data.user
        });

    } catch (error) {
        dispatch({
            type: REGISTER_FAIL,
            payload: getErrorMessage(error)
        });
    }
};

// Load user
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });

        const resp = await loader();
        const data = (resp && resp.data) ? resp.data : resp;
        if (!data) throw new Error('Empty response from loadUser API');
        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user
        });

    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: getErrorMessage(error)
        });
    }
};

// Logout user
export const logout = () => async (dispatch) => {
    try {
        await outer();
        localStorage.removeItem('token');
        dispatch({
            type: LOGOUT_SUCCESS
        });
        dispatch(clearCart());

    } catch (error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: getErrorMessage(error)
        });
    }
};


// Add these action creators to your existing authActions.js
export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PROFILE_REQUEST });
        const { data } = await profileUpdater(userData);

        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data.success
        });

    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: getErrorMessage(error)
        });
    }
};

export const updatePassword = (passwords) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PASSWORD_REQUEST });

        const { data } = await passwordsUpdater(passwords);

        dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload: data.success
        });

    } catch (error) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: getErrorMessage(error)
        });
    }
};

export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({ type: FORGOT_PASSWORD_REQUEST });

        const { data } = await passwordForgetting({ email });

        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: data.message
        });

    } catch (error) {
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: getErrorMessage(error)
        });
    }
};



export const resetPassword = (token, passwords) => async (dispatch) => {
    try {
        dispatch({ type: 'RESET_PASSWORD_REQUEST' });

        const { data } = await resetPasswordApi(token, passwords);

        dispatch({
            type: 'RESET_PASSWORD_SUCCESS',
            payload: data.success
        });
    } catch (error) {
        dispatch({
            type: 'RESET_PASSWORD_FAIL',
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

