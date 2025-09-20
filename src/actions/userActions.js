import {
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    CLEAR_ERRORS
} from '../constants/userConstants';

// Get all users - ADMIN

import { getAllUsers as getterOfAll } from '../api/index';
import { getUserDetails as getter, updateUser as updater } from '../api/index';
import { getErrorMessage } from '../utils/errorHandler';

export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_USERS_REQUEST });

        const { data } = await getterOfAll();

        dispatch({
            type: ALL_USERS_SUCCESS,
            payload: data.users
        });

    } catch (error) {
        dispatch({
            type: ALL_USERS_FAIL,
            payload: getErrorMessage(error)
        });
    }
};

// ADD these missing exports

export const getUserDetails = (id) => async (dispatch) => {
    try {
        const { data } = await getter(id);
        dispatch({ type: 'USER_DETAILS_SUCCESS', payload: data.user });
    } catch (error) {
        dispatch({ type: 'USER_DETAILS_FAIL', payload: getErrorMessage(error) });
    }
};

export const updateUser = (id, userData) => async (dispatch) => {
    try {
        dispatch({ type: 'UPDATE_USER_REQUEST' });
        const { data } = await updater(id, userData);
        dispatch({ type: 'UPDATE_USER_SUCCESS', payload: data.success });
    } catch (error) {
        dispatch({ type: 'UPDATE_USER_FAIL', payload: getErrorMessage(error) });
    }
};


// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    });
};
