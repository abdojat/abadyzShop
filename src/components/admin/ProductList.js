import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminProducts } from '../../actions/productActions';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import Sidebar from './Sidebar';
import ProductRow from './ProductRow';

const ProductList = () => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.auth.loading);
    const products = useSelector(state => state.products);

    useEffect(() => {
        dispatch(getAdminProducts());
    }, [dispatch]);

    return (
        <>
            <MetaData title="All Products - Admin" />
            <Box sx={{ display: 'flex' }}>
                <Sidebar />
                <Box sx={{
                    flexGrow: 1, p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: '80vh',
                    textAlign: 'center',
                }}>
                    <Typography variant="h4" gutterBottom>
                        All Products
                    </Typography>

                    {loading ? (
                        <Loader />
                    ) : (
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Price</TableCell>
                                        <TableCell>Stock</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {products?.products?.map(product => (
                                        <ProductRow product={product} key={product._id} />
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Box>
                <Link
                    to="/admin/product"
                    style={{
                        position: 'fixed',
                        bottom: 24,
                        right: 24,
                        backgroundColor: '#1976d2',
                        color: '#fff',
                        borderRadius: '50%',
                        width: 56,
                        height: 56,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textDecoration: 'none',
                        boxShadow: '0px 4px 10px rgba(0,0,0,0.3)',
                        zIndex: 1000,
                    }}
                >
                    <AddIcon />
                </Link>
            </Box>
        </>
    );
};

export default ProductList;