import { useSelector } from 'react-redux';
import { Box, Typography, Avatar, Container, Button } from '@mui/material';
import MetaData from '../layout/MetaData';
import { Link } from 'react-router-dom';

const Profile = () => {
    const { user, loading } = useSelector(state => state.auth);


    return (
        <>
            <MetaData title="Your Profile" />
            <Container maxWidth="md">
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
                    {loading ? (
                        <Typography>Loading...</Typography>
                    ) : (
                        <>
                            <Avatar
                                src={user?.avatar?.url}
                                alt={user?.name}
                                sx={{ width: 150, height: 150, mb: 2 }}
                            />
                            <Typography variant="h4" gutterBottom>
                                {user?.name}
                            </Typography>
                            <Typography variant="h6" gutterBottom>
                                {user?.email}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Joined on: {new Date(user?.createdAt).toLocaleDateString()}
                            </Typography>
                            {user?.role === 'admin' && (
                                <Typography variant="body1" color="secondary" gutterBottom>
                                    Admin User
                                </Typography>
                            )}
                            <Box sx={{ mt: 3 }}>
                                <Button
                                    component={Link}
                                    to="/me/update"
                                    variant="contained"
                                    color="primary"
                                    sx={{ mr: 2 }}
                                >
                                    Edit Profile
                                </Button>
                                <Button
                                    component={Link}
                                    to="/password/update"
                                    variant="outlined"
                                    color="primary"
                                >
                                    Change Password
                                </Button>
                            </Box>
                        </>
                    )}
                </Box>
            </Container>
        </>
    );
};

export default Profile;