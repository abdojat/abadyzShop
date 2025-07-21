import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../actions/productActions';
import { Box, Grid, Typography, Slider, Checkbox, FormControlLabel, Pagination, Stack } from '@mui/material';
import ProductCard from './ProductCard';
import Loader from '../layout/Loader';
import MetaData from '../layout/MetaData';

const categories = [
    'Electronics',
    'Cameras',
    'Laptops',
    'Accessories',
    'Headphones',
    'Food',
    'Books',
    'Clothes/Shoes',
    'Beauty/Health',
    'Sports',
    'Outdoor',
    'Home'
];

const Products = () => {
    const dispatch = useDispatch();
    const { keyword } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 1000]);
    const [category, setCategory] = useState('');
    const [ratings, setRatings] = useState(0);
    const { products } = useSelector(state => state.products);
    const productsCount = products?.length;
    const resPerPage = 10;
    const loading = useSelector(state => state.auth.loading);

    useEffect(() => {
        dispatch(getProducts(keyword, currentPage, price, category, ratings));
    }, [dispatch, keyword, currentPage, price, category, ratings]);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    };

    return (
        <>
            <MetaData title="Products" />
            {loading ? (
                <Loader />
            ) : (
                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    {/* Sidebar - Fixed to the left */}
                    <Box
                        sx={{
                            width: '20%',
                            minWidth: '250px',
                            p: 2,
                            borderRight: '1px solid #e0e0e0',
                            bgcolor: 'background.paper'
                        }}
                    >
                        <Typography variant="h6" gutterBottom>
                            Price Range
                        </Typography>
                        <Slider
                            value={price}
                            onChange={priceHandler}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                            min={0}
                            max={1000}
                        />

                        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                            Categories
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            {categories?.map(cat => (
                                <FormControlLabel
                                    key={cat}
                                    control={
                                        <Checkbox
                                            checked={category === cat}
                                            onChange={() => setCategory(category === cat ? '' : cat)}
                                        />
                                    }
                                    label={cat}
                                />
                            ))}
                        </Box>

                        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                            Ratings
                        </Typography>
                        <Slider
                            value={ratings}
                            onChange={(e, newValue) => setRatings(newValue)}
                            aria-labelledby="continuous-slider"
                            min={0}
                            max={5}
                        />
                    </Box>

                    {/* Main Content - Push it to the right */}
                    <Box sx={{ flex: 1, p: 3 }}>
                        <Typography variant="h4" gutterBottom>
                            Products
                        </Typography>

                        <Grid container spacing={1}>
                            {products?.products?.map(product => (
                                <Grid item xs={12} sm={6} md={4} key={product._id}>
                                    <Box sx={{ height: '100%'}}>
                                        <ProductCard product={product} />
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>

                        {resPerPage <= productsCount && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                                <Pagination
                                    count={Math.ceil(productsCount / resPerPage)}
                                    page={currentPage}
                                    onChange={handlePageChange}
                                    color="primary"
                                />
                            </Box>
                        )}
                    </Box>

                </Box>
            )}
        </>
    );
};

export default Products;