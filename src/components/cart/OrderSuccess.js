import { useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../actions/cartActions';
import MetaData from '../layout/MetaData';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const OrderSuccess = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearCart());
    }, [dispatch]);

    return (
        <>
            <MetaData title="Order Success" />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '70vh',
                    textAlign: 'center',
                }}
            >
                <CheckCircleIcon sx={{ fontSize: '5rem', color: 'success.main', mb: 2 }} />
                <Typography variant="h3" gutterBottom>
                    Your Order has been placed successfully
                </Typography>
                <Typography variant="h5" sx={{ mb: 3 }}>
                    Thank you for shopping with us!
                </Typography>
                <Button
                    component={Link}
                    to="/orders"
                    variant="contained"
                    size="large"
                >
                    View Orders
                </Button>
            </Box>
        </>
    );
};

export default OrderSuccess;