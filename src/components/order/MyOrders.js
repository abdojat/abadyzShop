import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { myOrders } from '../../actions/orderActions';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';
import { Link } from 'react-router-dom';

const MyOrders = () => {
    const dispatch = useDispatch();
    const { loading, orders } = useSelector(state => state.myOrders);

    useEffect(() => {
        dispatch(myOrders());
    }, [dispatch]);

    return (
        <>
            <MetaData title="My Orders" />
            <Box sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '80vh',
                textAlign: 'center',
            }}>
                <Typography variant="h4" gutterBottom>
                    My Orders
                </Typography>

                {loading ? (
                    <Loader />
                ) : (
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Order ID</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Items Qty</TableCell>
                                    <TableCell>Amount</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders?.map(order => (
                                    <TableRow key={order._id}>
                                        <TableCell>{order._id}</TableCell>
                                        <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                                        <TableCell>{order.orderStatus}</TableCell>
                                        <TableCell>{order.orderItems.length}</TableCell>
                                        <TableCell>${order.totalPrice}</TableCell>
                                        <TableCell>
                                            <Button
                                                component={Link}
                                                to={`/order/${order._id}`}
                                                variant="contained"
                                                size="small"
                                            >
                                                Details
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Box>
        </>
    );
};

export default MyOrders;