import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../actions/userActions';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

const UsersList = () => {
    const dispatch = useDispatch();
    const { loading, users } = useSelector(state => state.allUsers);

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    return (
        <>
            <MetaData title="All Users - Admin" />
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
                        All Users
                    </Typography>

                    {loading ? (
                        <Loader />
                    ) : (
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>User ID</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Role</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users?.map(user => (
                                        <TableRow key={user._id}>
                                            <TableCell>{user._id}</TableCell>
                                            <TableCell>{user.name}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>{user.role}</TableCell>
                                            <TableCell>
                                                <Button
                                                    component={Link}
                                                    to={`/admin/user/${user._id}`}
                                                    variant="contained"
                                                    size="small"
                                                >
                                                    Update
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Box>
            </Box>
        </>
    );
};

export default UsersList;