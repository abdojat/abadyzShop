import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Outlet } from 'react-router-dom';
import Loader from '../layout/Loader';

const ProtectedRoute = ({ isAdmin = false }) => {
    const { isAuthenticated, loading, user } = useSelector(state => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            navigate('/login');
        }

        if (!loading && isAuthenticated && isAdmin && user?.role !== 'admin') {
            navigate('/');
        }
    }, [isAuthenticated, loading, user, navigate, isAdmin]);

    return loading ? <Loader /> : <Outlet />;
};

export default ProtectedRoute;