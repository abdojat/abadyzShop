import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders } from '../../actions/orderActions';
import { getAllUsers } from '../../actions/userActions';
import { Box, Typography, Grid, Paper } from '@mui/material';
import {
    AttachMoney as AttachMoneyIcon,
    ShoppingCart as ShoppingCartIcon,
    People as PeopleIcon,
    Done as DoneIcon
} from '@mui/icons-material';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';
import Sidebar from './Sidebar';

const Dashboard = () => {
    const dispatch = useDispatch();
    const { orders } = useSelector(state => state.allOrders);
    const { users } = useSelector(state => state.allUsers);
    const { loading } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getAllOrders());
        dispatch(getAllUsers());
    }, [dispatch]);

    let totalAmount = 0;
    orders?.forEach(order => {
        totalAmount += order.totalPrice;
    });

    return (
        <>
            <MetaData title="Admin Dashboard" />
            {loading ? (
                <Loader />
            ) : (
                <Box sx={{ display: 'flex' }}>
                    <Sidebar />
                    <Box sx={{ flexGrow: 1, p: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center', }}>

                        <Typography variant="h4" gutterBottom>
                            Dashboard
                        </Typography>

                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6} md={3}>
                                <Paper sx={{ p: 2, textAlign: 'center' }}>
                                    <AttachMoneyIcon color="primary" sx={{ fontSize: 40 }} />
                                    <Typography variant="h6">Total Sales</Typography>
                                    <Typography variant="h4">${totalAmount.toFixed(2)}</Typography>
                                </Paper>
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <Paper sx={{ p: 2, textAlign: 'center' }}>
                                    <ShoppingCartIcon color="primary" sx={{ fontSize: 40 }} />
                                    <Typography variant="h6">Total Orders</Typography>
                                    <Typography variant="h4">{orders?.length}</Typography>
                                </Paper>
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <Paper sx={{ p: 2, textAlign: 'center' }}>
                                    <PeopleIcon color="primary" sx={{ fontSize: 40 }} />
                                    <Typography variant="h6">Total Users</Typography>
                                    <Typography variant="h4">{users?.length}</Typography>
                                </Paper>
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <Paper sx={{ p: 2, textAlign: 'center' }}>
                                    <DoneIcon color="primary" sx={{ fontSize: 40 }} />
                                    <Typography variant="h6">Completed Orders</Typography>
                                    <Typography variant="h4">
                                        {orders?.filter(order => order.orderStatus === 'Delivered').length}
                                    </Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            )}
        </>
    );
};

export default Dashboard;