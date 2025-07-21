import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails, createProductReview } from '../../actions/productActions';
import { Box, Typography, Button, Rating, Divider, CircularProgress, CardMedia } from '@mui/material';
import MetaData from '../layout/MetaData';
import { addToCart } from '../../actions/cartActions';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { TextField, Snackbar, Alert } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';


const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { loading, product } = useSelector(state => state.productDetails);
    const [quantity, setQuantity] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const { user } = useSelector((state) => state.auth);
    const hasReviewed = product?.reviews?.some(
        (r) => r.user === user?._id
    );
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getProductDetails(id));
    }, [dispatch, id]);

    const addToCartHandler = () => {
        dispatch(addToCart(product._id, quantity));
    };

    const increaseQuantity = () => {
        if (quantity >= product.stock) return;
        setQuantity(quantity + 1);
    };

    const decreaseQuantity = () => {
        if (quantity <= 1) return;
        setQuantity(quantity - 1);
    };

    const handleReviewSubmit = () => {
        try {
            const reviewData = {
                rating,
                comment,
                productId: product._id,
            };
            dispatch(createProductReview(reviewData));
            setSnackbarOpen(true);
            setSnackbarMessage('Review submitted successfully');
            setRating(0);
            setComment('');
        } catch (error) {
            setSnackbarOpen(true);
            setSnackbarMessage('Error submitting review');
        }
    };

    const sliderSettings = {
        dots: true,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <Box sx={{ right: 10, zIndex: 1, '&:before': { color: 'black' } }} />,
        prevArrow: <Box sx={{ left: 10, zIndex: 1, '&:before': { color: 'black' } }} />,
        adaptiveHeight: true,
        swipeToSlide: true,
        touchThreshold: 10,
    };

    return (
        <>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    <MetaData title={product.name} />
                    <Box sx={{ p: { xs: 1, sm: 3 } }}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: { xs: 'column', md: 'row' },
                                width: '100%',
                                gap: 3,
                            }}
                        >
                            {/* Image Slider */}
                            <Box
                                sx={{
                                    width: { xs: '100%', md: '65%' },
                                    height: { xs: '300px', sm: '400px', md: '500px' },
                                    position: 'relative',
                                    backgroundColor: '#f5f5f5',
                                    borderRadius: 2,
                                    overflow: 'hidden',
                                }}
                            >
                                {product.images?.length > 1 ? (
                                    <Slider {...sliderSettings}>
                                        {product.images.map((img, index) => (
                                            <CardMedia
                                                key={index}
                                                component="img"
                                                height="100%"
                                                image={img.url}
                                                alt={`${product.name}-${index}`}
                                                sx={{ 
                                                    objectFit: 'contain', 
                                                    p: 1,
                                                    height: { xs: '300px', sm: '400px', md: '500px' }
                                                }}
                                            />
                                        ))}
                                    </Slider>
                                ) : (
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            height: '100%',
                                        }}
                                    >
                                        <img
                                            src={product.images?.[0]?.url}
                                            alt={product.name}
                                            style={{
                                                maxWidth: '100%',
                                                maxHeight: '100%',
                                                objectFit: 'contain',
                                                padding: '1rem',
                                            }}
                                        />
                                    </Box>
                                )}
                            </Box>

                            {/* Product Details */}
                            <Box
                                sx={{
                                    width: { xs: '100%', md: '30%' },
                                    position: 'relative',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 2,
                                }}
                            >
                                <Typography 
                                    variant="h4" 
                                    gutterBottom
                                    sx={{ 
                                        fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' }
                                    }}
                                >
                                    {product.name}
                                </Typography>
                                <Typography 
                                    variant="h5" 
                                    color="text.secondary" 
                                    gutterBottom
                                    sx={{ 
                                        fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' }
                                    }}
                                >
                                    ${product.price}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <Rating 
                                        value={product.ratings} 
                                        precision={0.5} 
                                        readOnly 
                                        size={isMobile ? "small" : "medium"}
                                    />
                                    <Typography variant="body2" sx={{ ml: 1 }}>
                                        ({product.numOfReviews} reviews)
                                    </Typography>
                                </Box>
                                <Divider sx={{ my: 2 }} />
                                <Typography 
                                    variant="body1" 
                                    paragraph 
                                    sx={{ 
                                        mb: 2,
                                        fontSize: { xs: '0.875rem', sm: '1rem' }
                                    }}
                                >
                                    {product.description}
                                </Typography>
                                <Typography 
                                    variant="h6" 
                                    gutterBottom
                                    sx={{ 
                                        fontSize: { xs: '1rem', sm: '1.25rem' }
                                    }}
                                >
                                    Status: {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                </Typography>
                                {product.stock > 0 && (
                                    <>
                                        <Box 
                                            sx={{ 
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                mb: 2,
                                                gap: 1
                                            }}
                                        >
                                            <Button 
                                                onClick={decreaseQuantity}
                                                sx={{ 
                                                    minWidth: '44px',
                                                    minHeight: '44px'
                                                }}
                                                disabled={!user}
                                            >
                                                -
                                            </Button>
                                            <Typography sx={{ mx: 2 }}>{quantity}</Typography>
                                            <Button 
                                                onClick={increaseQuantity}
                                                sx={{ 
                                                    minWidth: '44px',
                                                    minHeight: '44px'
                                                }}
                                                disabled={!user}
                                            >
                                                +
                                            </Button>
                                        </Box>
                                        <Button 
                                            variant="contained" 
                                            size="large" 
                                            onClick={user ? addToCartHandler : () => navigate('/login')}
                                            fullWidth
                                            sx={{ 
                                                minHeight: '44px',
                                                mb: 2
                                            }}
                                        >
                                            {user ? 'Add to Cart' : 'Login to purchase'}
                                        </Button>
                                    </>
                                )}

                                {/* Reviews Section */}
                                <Box sx={{ mt: 4 }}>
                                    <Typography 
                                        variant="h5" 
                                        gutterBottom
                                        sx={{ 
                                            fontSize: { xs: '1.25rem', sm: '1.5rem' }
                                        }}
                                    >
                                        Reviews
                                    </Typography>
                                    
                                    {/* Review Form */}
                                    {!user ? (
                                        <Box sx={{ mb: 4 }}>
                                            <Button 
                                                variant="contained" 
                                                color="primary" 
                                                fullWidth
                                                sx={{ minHeight: '44px' }}
                                                href="/login"
                                            >
                                                Login to review
                                            </Button>
                                        </Box>
                                    ) : (
                                        !hasReviewed && (
                                            <Box sx={{ mb: 4 }}>
                                                <Typography 
                                                    variant="h6" 
                                                    gutterBottom
                                                    sx={{ 
                                                        fontSize: { xs: '1rem', sm: '1.25rem' }
                                                    }}
                                                >
                                                    Leave a Review
                                                </Typography>
                                                <Rating
                                                    name="rating"
                                                    value={rating}
                                                    onChange={(event, newValue) => setRating(newValue)}
                                                    size={isMobile ? "small" : "medium"}
                                                    sx={{ mb: 2 }}
                                                />
                                                <TextField
                                                    label="Comment"
                                                    multiline
                                                    rows={4}
                                                    fullWidth
                                                    value={comment}
                                                    onChange={(e) => setComment(e.target.value)}
                                                    sx={{ mb: 2 }}
                                                />
                                                <Button 
                                                    variant="contained" 
                                                    onClick={handleReviewSubmit}
                                                    fullWidth
                                                    sx={{ 
                                                        minHeight: '44px'
                                                    }}
                                                >
                                                    Submit Review
                                                </Button>
                                            </Box>
                                        )
                                    )}

                                    {/* Reviews List */}
                                    <Box sx={{ mt: 3 }}>
                                        {product.reviews?.length > 0 ? (
                                            product.reviews.map((r, idx) => (
                                                <Box 
                                                    key={idx} 
                                                    sx={{ 
                                                        mb: 3, 
                                                        p: 2, 
                                                        border: '1px solid #ddd', 
                                                        borderRadius: 2,
                                                        backgroundColor: 'background.paper'
                                                    }}
                                                >
                                                    <Typography 
                                                        variant="subtitle1" 
                                                        fontWeight="bold"
                                                        sx={{ 
                                                            fontSize: { xs: '0.875rem', sm: '1rem' }
                                                        }}
                                                    >
                                                        {r.name}
                                                    </Typography>
                                                    <Rating 
                                                        value={r.rating} 
                                                        readOnly 
                                                        size={isMobile ? "small" : "medium"}
                                                    />
                                                    <Typography 
                                                        variant="body2" 
                                                        sx={{ 
                                                            mt: 1,
                                                            fontSize: { xs: '0.75rem', sm: '0.875rem' }
                                                        }}
                                                    >
                                                        {r.comment}
                                                    </Typography>
                                                </Box>
                                            ))
                                        ) : (
                                            <Typography 
                                                variant="body2"
                                                sx={{ 
                                                    fontSize: { xs: '0.75rem', sm: '0.875rem' }
                                                }}
                                            >
                                                No reviews yet.
                                            </Typography>
                                        )}
                                    </Box>
                                </Box>

                                <Snackbar 
                                    open={snackbarOpen} 
                                    autoHideDuration={4000} 
                                    onClose={() => setSnackbarOpen(false)}
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                                >
                                    <Alert 
                                        onClose={() => setSnackbarOpen(false)} 
                                        severity="info" 
                                        sx={{ width: '100%' }}
                                    >
                                        {snackbarMessage}
                                    </Alert>
                                </Snackbar>
                            </Box>
                        </Box>
                    </Box>
                </>
            )}
        </>
    );
};

export default ProductDetails;
