import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails, updateOrder } from '../../actions/orderActions';
import { Box, Typography, Button, Paper, Container, Grid, TextField, MenuItem } from '@mui/material';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';
import Sidebar from './Sidebar';

const ProcessOrder = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, order } = useSelector(state => state.orderDetails);
    const { loading: updateLoading, isUpdated } = useSelector(state => state.order);

    const [status, setStatus] = useState('');

    useEffect(() => {
        dispatch(getOrderDetails(id));

        if (isUpdated) {
            navigate('/admin/orders');
        }
    }, [dispatch, id, isUpdated, navigate]);

    useEffect(() => {
        if (order) {
            setStatus(order.orderStatus);
        }
    }, [order]);

    const updateOrderHandler = (e) => {
        e.preventDefault();
        dispatch(updateOrder(id, {status}));
    };

    const orderStatusOptions = [
        'Processing',
        'Shipped',
        'Delivered'
    ];

    return (
        <>
            <MetaData title="Process Order - Admin" />
            <Box sx={{ display: 'flex' }}>
                <Sidebar />
                <Container maxWidth="md" sx={{ mt: 4 }}>
                    {loading ? (
                        <Loader />
                    ) : (
                        <Paper sx={{ p: 3 }}>
                            <Typography variant="h4" gutterBottom>
                                Process Order #{order?._id}
                            </Typography>

                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="h6" gutterBottom>
                                        Shipping Info
                                    </Typography>
                                    <Typography>
                                        <strong>Name:</strong> {order?.user?.name}
                                    </Typography>
                                    <Typography>
                                        <strong>Phone:</strong> {order?.shippingInfo?.phoneNo}
                                    </Typography>
                                    <Typography>
                                        <strong>Address:</strong> {order?.shippingInfo?.address}, {order?.shippingInfo?.city}, {order?.shippingInfo?.postalCode}, {order?.shippingInfo?.country}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <Typography variant="h6" gutterBottom>
                                        Order Summary
                                    </Typography>
                                    <Typography>
                                        <strong>Status:</strong> {order?.orderStatus}
                                    </Typography>
                                    <Typography>
                                        <strong>Items:</strong> {order?.orderItems?.length}
                                    </Typography>
                                    <Typography>
                                        <strong>Total:</strong> ${order?.totalPrice}
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Box sx={{ mt: 3 }}>
                                <Typography variant="h6" gutterBottom>
                                    Update Status
                                </Typography>
                                <TextField
                                    select
                                    fullWidth
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    variant="outlined"
                                >
                                    {orderStatusOptions.map(option => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <Button
                                    variant="contained"
                                    onClick={updateOrderHandler}
                                    sx={{ mt: 2 }}
                                    disabled={updateLoading}
                                >
                                    {updateLoading ? 'Updating...' : 'Update Status'}
                                </Button>
                            </Box>
                        </Paper>
                    )}
                </Container>
            </Box>
        </>
    );
};

export default ProcessOrder;