import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/authActions';
import { 
    AppBar, 
    Toolbar, 
    Typography, 
    Button, 
    Badge, 
    IconButton, 
    Menu, 
    MenuItem, 
    Avatar, 
    Box, 
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    useMediaQuery,
    useTheme
} from '@mui/material';
import { 
    ShoppingCart, 
    Person, 
    ExitToApp, 
    Dashboard, 
    ListAlt,
    Menu as MenuIcon,
    Home,
    Search as SearchIcon
} from '@mui/icons-material';
import Search from './Search';

const Header = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { isAuthenticated, user } = useSelector(state => state.auth);
    const { cartItems } = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const logoutHandler = () => {
        dispatch(logout());
        navigate('/');
        setMobileOpen(false);
    };

    const drawer = (
        <Box sx={{ width: 250 }} role="presentation">
            <List>
                <ListItem button component={Link} to="/" onClick={handleDrawerToggle}>
                    <ListItemIcon><Home /></ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem button component={Link} to="/cart" onClick={handleDrawerToggle}>
                    <ListItemIcon>
                        <Badge badgeContent={cartItems.length} color="error">
                            <ShoppingCart />
                        </Badge>
                    </ListItemIcon>
                    <ListItemText primary="Cart" />
                </ListItem>
                {isAuthenticated ? (
                    <>
                        <ListItem button component={Link} to="/me" onClick={handleDrawerToggle}>
                            <ListItemIcon><Person /></ListItemIcon>
                            <ListItemText primary="Profile" />
                        </ListItem>
                        <ListItem button component={Link} to="/orders" onClick={handleDrawerToggle}>
                            <ListItemIcon><ListAlt /></ListItemIcon>
                            <ListItemText primary="Orders" />
                        </ListItem>
                        {user?.role === 'admin' && (
                            <ListItem button component={Link} to="/admin/dashboard" onClick={handleDrawerToggle}>
                                <ListItemIcon><Dashboard /></ListItemIcon>
                                <ListItemText primary="Dashboard" />
                            </ListItem>
                        )}
                        <Divider />
                        <ListItem button onClick={logoutHandler}>
                            <ListItemIcon><ExitToApp /></ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItem>
                    </>
                ) : (
                    <ListItem button component={Link} to="/login" onClick={handleDrawerToggle}>
                        <ListItemIcon><Person /></ListItemIcon>
                        <ListItemText primary="Login" />
                    </ListItem>
                )}
            </List>
        </Box>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="sticky" sx={{ bgcolor: 'background.paper' }}>
                <Toolbar sx={{ 
                    flexDirection: { xs: 'row', sm: 'row' },
                    justifyContent: 'space-between',
                    py: { xs: 1, sm: 0 }
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {isMobile && (
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                onClick={handleDrawerToggle}
                                sx={{ mr: 2 }}
                            >
                                <MenuIcon color='primary'/>
                            </IconButton>
                        )}
                        <Typography
                            component={Link}
                            to="/"
                            variant="h6"
                            sx={{ 
                                color: 'text.primary', 
                                textDecoration: 'none',
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            ABADYZShop
                        </Typography>
                    </Box>

                    {!isMobile && <Search />}

                    <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        gap: 1
                    }}>
                        {!isMobile && (
                            <IconButton 
                                component={Link} 
                                to="/cart" 
                                size="large" 
                                color="inherit"
                                sx={{ 
                                    minWidth: '44px',
                                    minHeight: '44px'
                                }}
                            >
                                <Badge badgeContent={cartItems.length} color="error">
                                    <ShoppingCart color="primary" />
                                </Badge>
                            </IconButton>
                        )}

                        {isAuthenticated && !isMobile ? (
                            <>
                                <IconButton 
                                    onClick={handleClick} 
                                    size="large" 
                                    color="inherit"
                                    sx={{ 
                                        minWidth: '44px',
                                        minHeight: '44px'
                                    }}
                                >
                                    <Avatar 
                                        src={user?.avatar?.url} 
                                        alt={user?.name} 
                                        sx={{ width: 32, height: 32 }} 
                                    />
                                </IconButton>
                                <Menu
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                >
                                    <MenuItem component={Link} to="/me" onClick={handleClose}>
                                        <Person sx={{ mr: 1 }} /> Profile
                                    </MenuItem>
                                    <MenuItem component={Link} to="/orders" onClick={handleClose}>
                                        <ListAlt sx={{ mr: 1 }} /> Orders
                                    </MenuItem>
                                    {user?.role === 'admin' && (
                                        <MenuItem component={Link} to="/admin/dashboard" onClick={handleClose}>
                                            <Dashboard sx={{ mr: 1 }} /> Dashboard
                                        </MenuItem>
                                    )}
                                    <Divider />
                                    <MenuItem onClick={logoutHandler}>
                                        <ExitToApp sx={{ mr: 1 }} /> Logout
                                    </MenuItem>
                                </Menu>
                            </>
                        ) : !isMobile && (
                            <Button 
                                component={Link} 
                                to="/login" 
                                color="primary"
                                sx={{ 
                                    minWidth: '44px',
                                    minHeight: '44px'
                                }}
                            >
                                Login
                            </Button>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>

            <Drawer
                variant="temporary"
                anchor="left"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { 
                        boxSizing: 'border-box', 
                        width: 250,
                        backgroundColor: 'background.paper'
                    },
                }}
            >
                {drawer}
            </Drawer>

            {isMobile && (
                <Box sx={{ p: 2, display: { xs: 'block', sm: 'none' } }}>
                    <Search />
                </Box>
            )}
        </Box>
    );
};

export default Header;