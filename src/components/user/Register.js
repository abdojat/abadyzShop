import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../../actions/authActions';
import { Box, Typography, TextField, Button, Avatar, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MetaData from '../layout/MetaData';
import { uploadImage } from '../../api/index';

const Register = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [role, setRole] = useState('user');
    const [adminPassword, setAdminPassword] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, loading } = useSelector(state => state.auth);

    const { name, email, password } = user;

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let avatarData = undefined;
            console.log('a',avatar);
            if (avatar) {
                const formDataImage = new FormData();
                formDataImage.set('image', avatar);
                const res = await uploadImage(formDataImage);
                if (res.data && res.data.public_id && res.data.imageUrl) {
                    avatarData = {
                        public_id: res.data.public_id,
                        url: res.data.imageUrl
                    };
                }
            }
            const registrationData = {
                name,
                email,
                password,
                role
            };
            if (avatarData) {
                registrationData.avatar = avatarData;
            }
            if (role === 'admin') {
                registrationData.adminPassword = adminPassword;
            }
            dispatch(register(registrationData));
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
            <MetaData title="Register" />
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
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
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={handleChange}
                        />
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="subtitle1">Register as:</Typography>
                            <Button
                                variant={role === 'user' ? 'contained' : 'outlined'}
                                onClick={() => setRole('user')}
                                sx={{ mr: 1 }}
                            >
                                User
                            </Button>
                            <Button
                                variant={role === 'admin' ? 'contained' : 'outlined'}
                                onClick={() => setRole('admin')}
                            >
                                Admin
                            </Button>
                        </Box>
                        {role === 'admin' && (
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="adminPassword"
                                label="Admin Registration Password"
                                type="password"
                                id="adminPassword"
                                value={adminPassword}
                                onChange={e => setAdminPassword(e.target.value)}
                            />
                        )}
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
                                    Upload Avatar
                                </Button>
                            </label>
                            {avatarPreview && (
                                <img
                                    src={avatarPreview}
                                    alt="Avatar Preview"
                                    style={{ width: '50px', height: '50px', borderRadius: '50%', marginLeft: '10px' }}
                                />
                            )}
                        </Box>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={loading}
                        >
                            {loading ? 'Registering...' : 'Register'}
                        </Button>
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default Register;