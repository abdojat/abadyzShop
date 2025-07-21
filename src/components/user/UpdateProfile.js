import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../../actions/authActions';
import { Box, Typography, TextField, Button, Avatar, Container } from '@mui/material';
import MetaData from '../layout/MetaData';
import { uploadImage } from '../../api/index';

const UpdateProfile = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
    });
    const [avatar, setAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user: loadedUser, loading } = useSelector(state => state.auth);

    const { name, email } = user;

    useEffect(() => {
        if (loadedUser) {
            setUser({
                name: loadedUser.name,
                email: loadedUser.email,
            });
            setAvatarPreview(loadedUser.avatar?.url || '/images/default_avatar.jpg');
        }
    }, [loadedUser]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataImage = new FormData();
            formDataImage.set('image', avatar);
            const res = await uploadImage(formDataImage);
            dispatch(updateProfile({
                name,
                email,
                avatar: {
                    public_id: res.data.public_id,
                    url: res.data.imageUrl
                }
            }));
            navigate('/me');
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        if (e.target.name === 'avatar') {
            const file = e.target.files[0];
            setAvatar(file);
            setAvatarPreview(URL.createObjectURL(file));
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };

    return (
        <>
            <MetaData title="Update Profile" />
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Update Profile
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            value={name}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={email}
                            onChange={handleChange}
                        />
                        <Box sx={{ mt: 2, mb: 2 }}>
                            <input
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="avatar-upload"
                                type="file"
                                name="avatar"
                                onChange={handleChange}
                            />
                            <label htmlFor="avatar-upload">
                                <Button variant="contained" component="span">
                                    Upload New Avatar
                                </Button>
                            </label>
                            <Avatar
                                src={avatarPreview}
                                alt="Avatar Preview"
                                sx={{ width: 56, height: 56, ml: 2 }}
                            />
                        </Box>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={loading}
                        >
                            {loading ? 'Updating...' : 'Update Profile'}
                        </Button>
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default UpdateProfile;