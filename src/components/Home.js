import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import MetaData from './layout/MetaData';
import { useSelector } from 'react-redux';

const Home = () => {
    const { isAuthenticated } = useSelector(state => state.auth);
    return (
        <>
            <MetaData title="Abadyz Shop - Home" />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '80vh',
                    textAlign: 'center',
                }}
            >
                <Typography variant="h2" gutterBottom>
                    Welcome to Abadyz Shop
                </Typography>
                <Typography variant="h5" gutterBottom>
                    Discover amazing products
                </Typography>
                {isAuthenticated ? (
                    <Button
                        component={Link}
                        to="/products"
                        variant="contained"
                        size="large"
                        sx={{ mt: 3 }}
                    >
                        Shop Now
                    </Button>
                ) : (
                    <Button
                        component={Link}
                        to="/login"
                        variant="contained"
                        size="large"
                        sx={{ mt: 3 }}
                    >
                        Login to start shopping
                    </Button>
                )}
            </Box>
        </>
    );
};

export default Home;