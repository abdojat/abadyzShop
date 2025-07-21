import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails } from '../../actions/orderActions';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid } from '@mui/material';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';

const OrderDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { loading, order } = useSelector(state => state.orderDetails);

    useEffect(() => {
        dispatch(getOrderDetails(id));
    }, [dispatch, id]);
    return (
        <>
            <MetaData title="Order Details" />
            {loading ? (
                <Loader />
            ) : (
                <Box sx={{ p: 3 }}>
                    <Typography variant="h4" gutterBottom>
                        Order #{order?._id}
                    </Typography>

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Paper sx={{ p: 2 }}>
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
                                <Typography sx={{ mt: 2 }}>
                                    <strong>Status:</strong> {order?.orderStatus}
                                </Typography>
                            </Paper>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Paper sx={{ p: 2 }}>
                                <Typography variant="h6" gutterBottom>
                                    Payment Info
                                </Typography>
                                <Typography>
                                    <strong>Method:</strong> {order?.paymentInfo?.type}
                                </Typography>
                                <Typography>
                                    <strong>Status:</strong> {order?.paymentInfo?.status}
                                </Typography>
                                <Typography sx={{ mt: 2 }}>
                                    <strong>Amount Paid:</strong> ${order?.totalPrice}
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>

                    <TableContainer component={Paper} sx={{ mt: 3 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Product</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Subtotal</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {order?.orderItems?.map(item => (
                                    <TableRow key={item._id}>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <img
                                                    src={item.image.url}
                                                    alt={item.name}
                                                    style={{ width: 50, height: 50, marginRight: 10 }}
                                                />
                                                <Typography>{item.name}</Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>${item.price}</TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            )}
        </>
    );
};

export default OrderDetails;