import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// no redux selector needed; we'll fetch products directly
// We'll call the API directly to fetch all pages so we can filter locally
import { getProducts as fetchProductsApi } from '../../api/index';
import { Box, Grid, Typography, Slider, Checkbox, FormControlLabel, Pagination } from '@mui/material';
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
    const { keyword } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 1000]);
    const [category, setCategory] = useState('');
    const [ratings, setRatings] = useState(0);
    // local store of all products fetched from backend
    const [allProducts, setAllProducts] = useState([]);
    const [localLoading, setLocalLoading] = useState(false);

    // we fetch and manage products locally in this component

    const resPerPage = 10;

    // Fetch all products from backend (page-by-page) once and store locally.
    useEffect(() => {
        let cancelled = false;

        const fetchAll = async () => {
            try {
                setLocalLoading(true);
                let page = 1;
                let gathered = [];

                // first request to get counts and resPerPage
                const firstResp = await fetchProductsApi('', page, [0, 1000000], undefined, 0);
                const firstData = (firstResp && firstResp.data) ? firstResp.data : firstResp;

                if (!firstData) {
                    throw new Error('Empty response from products API');
                }

                gathered = gathered.concat(firstData.products || []);

                const totalCount = firstData.productsCount || gathered.length;
                const serverResPerPage = firstData.resPerPage || gathered.length || 1;
                const totalPages = Math.ceil(totalCount / serverResPerPage);

                // fetch remaining pages (if any)
                while (page < totalPages) {
                    page += 1;
                    const resp = await fetchProductsApi('', page, [0, 1000000], undefined, 0);
                    const pageData = (resp && resp.data) ? resp.data : resp;
                    if (pageData && pageData.products) {
                        gathered = gathered.concat(pageData.products);
                    }
                }

                if (!cancelled) {
                    setAllProducts(gathered);
                }
            } catch (err) {
                // keep it simple: log error and keep allProducts empty
                // In a real app, surface this to the user
                // eslint-disable-next-line no-console
                console.error('Failed to fetch products for local filtering', err);
            } finally {
                if (!cancelled) setLocalLoading(false);
            }
        };

        fetchAll();

        return () => { cancelled = true; };
    }, []); // fetch once on mount

    // reset to first page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [price, category, ratings, keyword]);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    };

    // apply local filtering on the fetched products
    const filteredProducts = allProducts.filter(p => {
        const inPrice = p.price >= price[0] && p.price <= price[1];
        const inCategory = category ? p.category === category : true;
        const inRatings = p.ratings >= ratings;
        const inKeyword = keyword
            ? (p.name && p.name.toLowerCase().includes(keyword.toLowerCase())) || (p.description && p.description.toLowerCase().includes(keyword.toLowerCase()))
            : true;
        return inPrice && inCategory && inRatings && inKeyword;
    });

    const productsCount = filteredProducts.length;
    const displayedProducts = filteredProducts.slice((currentPage - 1) * resPerPage, currentPage * resPerPage);

    return (
        <>
            <MetaData title="Products" />
            {localLoading ? (
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
                            {displayedProducts.map(product => (
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