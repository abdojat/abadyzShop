import { Card, CardMedia, CardContent, Typography, Button, Rating, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { addToCart } from '../../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector(state => state.auth);

    const addToCartHandler = () => {
        dispatch(addToCart(product._id, 1));
    };

    const options = {
        value: product.ratings,
        readOnly: true,
        precision: 0.5
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
    };

    return (
        <Card sx={{ width: 345, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Link to={`/product/${product._id}`}>
                <Box sx={{ position: 'relative' }}>
                    {product.images?.length > 1 ? (
                        <Slider {...sliderSettings}>
                            {product.images?.map((img, i) => (
                                <CardMedia
                                    key={i}
                                    component="img"
                                    height="200"
                                    image={img.url}
                                    alt={`${product.name}-${i}`}
                                    sx={{ objectFit: 'contain', p: 1 }}
                                />
                            ))}
                        </Slider>
                    ) : (
                        <CardMedia
                            component="img"
                            height="200"
                            image={product.images?.[0]?.url}
                            alt={product.name}
                            sx={{ objectFit: 'contain', p: 1 }}
                        />
                    )}
                </Box>
            </Link>
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                    <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        {product.name}
                    </Link>
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Rating {...options} />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                        ({product.numOfReviews} reviews)
                    </Typography>
                </Box>
                <Typography variant="h6" color="text.secondary">
                    ${product.price}
                </Typography>
            </CardContent>
            <Box sx={{ p: 2 }}>
                {isAuthenticated ? (
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={addToCartHandler}
                        disabled={product.stock <= 0}
                        sx={{ mt: 'auto' }}
                    >
                        {product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        fullWidth
                        component={Link}
                        to="/login"
                        sx={{ mt: 'auto' }}
                    >
                        Login to Purchase
                    </Button>
                )}
            </Box>
        </Card>
    );
};

export default ProductCard;
