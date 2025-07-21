import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../actions/cartActions';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Divider } from '@mui/material';
import { Remove, Add, Delete } from '@mui/icons-material';
import MetaData from '../layout/MetaData';

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartItems } = useSelector(state => state.cart);
    const { isAuthenticated } = useSelector(state => state.auth);

    const increaseQuantity = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (newQty > stock) return;
        dispatch(addToCart(id, newQty));
    };

    const decreaseQuantity = (id, quantity) => {
        const newQty = quantity - 1;
        if (newQty < 1) return;
        dispatch(addToCart(id, newQty));
    };

    const removeItem = id => {
        dispatch(removeFromCart(id));
    };

    const checkoutHandler = () => {
        navigate('/shipping');
    };

    return (
        <>
            <MetaData title="Your Cart" />
            <Box sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: cartItems.length === 0 ? '80vh' : '100vh',
                textAlign: 'center',
            }}>
                <Typography variant="h4" gutterBottom>
                    Shopping Cart
                </Typography>

                {!isAuthenticated ? (
                    <Box sx={{ textAlign: 'center', mt: 5 }}>
                        <Typography variant="h5">Login to start shopping</Typography>
                        <Button component={Link} to="/login" variant="contained" sx={{ mt: 2 }}>
                            Login
                        </Button>
                    </Box>
                ) : cartItems.length === 0 ? (
                    <Box sx={{ textAlign: 'center', mt: 5 }}>
                        <Typography variant="h5">Your cart is empty</Typography>
                        <Button component={Link} to="/products" variant="contained" sx={{ mt: 2 }}>
                            Continue Shopping
                        </Button>
                    </Box>
                ) : (
                    <>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Product</TableCell>
                                        <TableCell align="right">Quantity</TableCell>
                                        <TableCell align="right">Price</TableCell>
                                        <TableCell align="right">Subtotal</TableCell>
                                        <TableCell align="right">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {cartItems.map(item => (
                                        <TableRow key={item.product}>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <img src={item.image.url} alt={item.name} style={{ width: 50, height: 50, marginRight: 10 }} />
                                                    <Typography>{item.name}</Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                                    <IconButton onClick={() => decreaseQuantity(item.product, item.quantity)}>
                                                        <Remove />
                                                    </IconButton>
                                                    <Typography>{item.quantity}</Typography>
                                                    <IconButton onClick={() => increaseQuantity(item.product, item.quantity, item.stock)}>
                                                        <Add />
                                                    </IconButton>
                                                </Box>
                                            </TableCell>
                                            <TableCell align="right">${item.price}</TableCell>
                                            <TableCell align="right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                                            <TableCell align="right">
                                                <IconButton onClick={() => removeItem(item.product)}>
                                                    <Delete />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                            <Box sx={{ width: 300, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                                <Typography variant="h6" gutterBottom>
                                    Order Summary
                                </Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography>Subtotal:</Typography>
                                    <Typography>
                                        ${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                    <Typography>Shipping:</Typography>
                                    <Typography>$0.00</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                    <Typography variant="h6">Total:</Typography>
                                    <Typography variant="h6">
                                        ${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
                                    </Typography>
                                </Box>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    onClick={checkoutHandler}
                                    disabled={cartItems.length === 0}
                                >
                                    Proceed to Checkout
                                </Button>
                            </Box>
                        </Box>
                    </>
                )}
            </Box>
        </>
    );
};

export default Cart;