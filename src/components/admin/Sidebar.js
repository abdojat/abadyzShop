import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Tooltip,
    Box,
    Divider,
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';

const expandedWidth = 200;

const Sidebar = () => {
    const location = useLocation();

    const items = [
        { text: 'Dashboard', icon: <DashboardIcon />, to: '/admin/dashboard' },
        { text: 'Products', icon: <InventoryIcon />, to: '/admin/products' },
        { text: 'Orders', icon: <ShoppingCartIcon />, to: '/admin/orders' },
        { text: 'Users', icon: <PeopleIcon />, to: '/admin/users' },
    ];

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: expandedWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: expandedWidth,
                    boxSizing: 'border-box',
                    overflowX: 'hidden',
                    height: '100%',
                    position: 'relative',
                    borderRight: '1px solid #ddd',
                },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    px: 2,
                    py: 1,
                }}
            >
                <span style={{ fontWeight: 'bold' }}>Menu</span>
            </Box>
            <Divider />
            <List component="nav">
                {items.map(({ text, icon, to }) => (
                    <ListItem
                        button
                        key={text}
                        component={Link}
                        to={to}
                        selected={location.pathname === to}
                        sx={{ justifyContent: 'flex-start', px: 2 }}
                    >
                        <Tooltip title={text} placement="right">
                            <ListItemIcon sx={{ minWidth: 0, mr: 2, justifyContent: 'center' }}>
                                {icon}
                            </ListItemIcon>
                        </Tooltip>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default Sidebar;
