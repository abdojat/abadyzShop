import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, Typography, Button, Paper, Grid, Divider } from '@mui/material';
import MetaData from '../layout/MetaData';

const ConfirmOrder = () => {
    const { shippingInfo, cartItems } = useSelector(state => state.cart);
    const { user } = useSelector(state => state.auth);
    const navigate = useNavigate();

    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );
    const shippingPrice = subtotal > 100 ? 0 : 10;
    const taxPrice = Number((0.05 * subtotal).toFixed(2));
    const totalPrice = (subtotal + shippingPrice + taxPrice).toFixed(2);

    
    useEffect(() => {
        if (!shippingInfo) {
            navigate('/shipping');
        }
    }, [shippingInfo, navigate]);

    const proceedToPayment = () => {
        navigate('/process/payment');
    };

    return (
        <>
            <MetaData title="Confirm Order" />
            <Box sx={{ p: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Confirm Order
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Shipping Info
                            </Typography>
                            <Typography>
                                <strong>Name:</strong> {user?.name}
                            </Typography>
                            <Typography>
                                <strong>Phone:</strong> {shippingInfo?.phoneNo}
                            </Typography>
                            <Typography>
                                <strong>Address:</strong> {shippingInfo?.address}, {shippingInfo?.city}, {shippingInfo?.postalCode}, {shippingInfo?.country}
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Order Summary
                            </Typography>
                            {cartItems.map(item => (
                                <Box key={item.product} sx={{ mb: 2 }}>
                                    <Typography>
                                        {item.name} × {item.quantity}
                                    </Typography>
                                    <Typography>
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </Typography>
                                </Box>
                            ))}
                            <Divider sx={{ my: 2 }} />
                            <Typography>
                                <strong>Subtotal:</strong> ${subtotal.toFixed(2)}
                            </Typography>
                            <Typography>
                                <strong>Shipping:</strong> ${shippingPrice.toFixed(2)}
                            </Typography>
                            <Typography>
                                <strong>Tax:</strong> ${taxPrice}
                            </Typography>
                            <Typography variant="h6" sx={{ mt: 1 }}>
                                <strong>Total:</strong> ${totalPrice}
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                    <Button
                        variant="contained"
                        onClick={proceedToPayment}
                        disabled={cartItems.length === 0}
                    >
                        Proceed to Payment
                    </Button>
                </Box>
            </Box>
        </>
    );
};

export default ConfirmOrder;