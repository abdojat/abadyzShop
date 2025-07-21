import { Alert as MuiAlert, Snackbar } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors } from '../../actions/errorActions';

const Alert = () => {
    const dispatch = useDispatch();
    const errorState = useSelector(state => state.error); 
    const error = errorState?.error;

    const handleClose = () => {
        dispatch(clearErrors());
    };

    return (
        <Snackbar
            open={Boolean(error)}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <MuiAlert onClose={handleClose} severity="error" elevation={6} variant="filled">
                {error}
            </MuiAlert>
        </Snackbar>
    );
};

export default Alert;
