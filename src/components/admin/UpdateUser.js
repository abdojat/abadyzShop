import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUser } from '../../actions/userActions';
import { Box, Typography, TextField, Button, Paper, Container } from '@mui/material';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';
import Sidebar from './Sidebar';

const UpdateUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, user } = useSelector(state => state.userDetails);
    const { loading: updateLoading, isUpdated } = useSelector(state => state.user);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');

    useEffect(() => {
        dispatch(getUserDetails(id));

        if (isUpdated) {
            navigate('/admin/users');
        }
    }, [dispatch, id, isUpdated, navigate]);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
        }
    }, [user]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUser(id, {name, email, role}));
    };

    return (
        <>
            <MetaData title="Update User - Admin" />
            <Box sx={{ display: 'flex' }}>
                <Sidebar />
                <Container maxWidth="md" sx={{ mt: 4 }}>
                    {loading ? (
                        <Loader />
                    ) : (
                        <Paper sx={{ p: 3 }}>
                            <Typography variant="h4" gutterBottom>
                                Update User
                            </Typography>

                            <form onSubmit={handleSubmit}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    type="email"
                                    label="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    select
                                    SelectProps={{ native: true }}
                                    label="Role"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </TextField>

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 2 }}
                                    disabled={updateLoading}
                                >
                                    {updateLoading ? 'Updating...' : 'Update User'}
                                </Button>
                            </form>
                        </Paper>
                    )}
                </Container>
            </Box>
        </>
    );
};

export default UpdateUser;