import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders } from '../../actions/orderActions';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

const OrderList = () => {
    const dispatch = useDispatch();
    const { loading, orders } = useSelector(state => state.allOrders);

    useEffect(() => {
        dispatch(getAllOrders());
    }, [dispatch]);

    return (
        <>
            <MetaData title="All Orders - Admin" />
            <Box sx={{ display: 'flex' }}>
                <Sidebar />
                <Box sx={{
                    flexGrow: 1,
                     p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: '80vh',
                    textAlign: 'center',
                }}>
                    <Typography variant="h4" gutterBottom>
                        All Orders
                    </Typography>

                    {loading ? (
                        <Loader />
                    ) : (
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Order ID</TableCell>
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
                                            <TableCell>{order.orderStatus}</TableCell>
                                            <TableCell>{order.orderItems.length}</TableCell>
                                            <TableCell>${order.totalPrice}</TableCell>
                                            <TableCell>
                                                <Button
                                                    component={Link}
                                                    to={`/admin/order/${order._id}`}
                                                    variant="contained"
                                                    size="small"
                                                >
                                                    Process
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Box>
            </Box>
        </>
    );
};

export default OrderList;