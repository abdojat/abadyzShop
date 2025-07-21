import { CLEAR_ERRORS } from '../constants/errorConstants';

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    });
};