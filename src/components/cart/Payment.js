import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../../actions/orderActions';
import { Box, Typography, Button, Paper, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import MetaData from '../layout/MetaData';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { payWithStripe } from '../../api/index';

const Payment = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [paymentMethod, setPaymentMethod] = useState('PayPal');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { shippingInfo, cartItems } = useSelector(state => state.cart);

    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );
    const shippingPrice = subtotal > 100 ? 0 : 10;
    const taxPrice = Number((0.05 * subtotal).toFixed(2));
    const totalPrice = (subtotal + shippingPrice + taxPrice).toFixed(2);
    console.log('cartItems in payment', cartItems);
    const orderBase = {
        orderItems: cartItems,
        shippingInfo,
        itemsPrice: subtotal,
        taxPrice,
        shippingPrice,
        totalPrice,
    };

    const handleStripeSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await payWithStripe(totalPrice)

            const result = await stripe.confirmCardPayment(data.client_secret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });
            console.log(result);
            if (result.error) {
                console.log(result.error.message);
            } else {
                if (result.paymentIntent.status === 'succeeded') {
                    dispatch(createOrder({
                        ...orderBase,
                        paymentInfo: {
                            id: result.paymentIntent.id,
                            status: result.paymentIntent.status
                        }
                    }));

                    navigate('/success');
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handlePaypalApprove = async (data, actions) => {
        const details = await actions.order.capture();

        dispatch(createOrder({
            ...orderBase,
            paymentInfo: {
                id: details.id,
                status: details.status
            }
        }));

        navigate('/success');
    };

    return (
        <>
            <MetaData title="Payment Method" />
            <Box sx={{ p: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Payment Method
                </Typography>

                <Paper sx={{ p: 3, maxWidth: 600 }}>
                    <form onSubmit={handleStripeSubmit}>
                        <Typography variant="h6" gutterBottom>
                            Select Method
                        </Typography>

                        <RadioGroup
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                            <FormControlLabel
                                value="PayPal"
                                control={<Radio />}
                                label="PayPal or Credit Card"
                            />
                            <FormControlLabel
                                value="Stripe"
                                control={<Radio />}
                                label="Stripe"
                            />
                        </RadioGroup>

                        {paymentMethod === 'Stripe' && (
                            <Box sx={{ mt: 2 }}>
                                <CardElement />
                            </Box>
                        )}

                        {paymentMethod === 'PayPal' && (
                            <Box sx={{ mt: 2 }}>
                                <PayPalScriptProvider options={{ "client-id": "your_paypal_client_id" }}>
                                    <PayPalButtons
                                        createOrder={(data, actions) => {
                                            return actions.order.create({
                                                purchase_units: [{
                                                    amount: { value: totalPrice }
                                                }]
                                            });
                                        }}
                                        onApprove={handlePaypalApprove}
                                    />
                                </PayPalScriptProvider>
                            </Box>
                        )}

                        {paymentMethod === 'Stripe' && (
                            <Box sx={{ mt: 3 }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                >
                                    Pay with Stripe
                                </Button>
                            </Box>
                        )}
                    </form>
                </Paper>
            </Box>
        </>
    );
};

export default Payment;
