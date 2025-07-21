// src/components/layout/Search.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, InputBase, IconButton, Box, useTheme, useMediaQuery } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

const Search = () => {
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/products/${keyword}`);
        } else {
            navigate('/products');
        }
    };

    return (
        <Box 
            component="form" 
            onSubmit={searchSubmitHandler}
            sx={{
                width: { xs: '100%', sm: 'auto' },
                maxWidth: { xs: '100%', sm: '400px' },
                mx: { xs: 0, sm: 2 }
            }}
        >
            <Paper
                component="div"
                sx={{
                    p: '2px 4px',
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    borderRadius: 2,
                    boxShadow: 1,
                    backgroundColor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <InputBase
                    sx={{
                        ml: 1,
                        flex: 1,
                        fontSize: { xs: '0.9rem', sm: '1rem' },
                        '& input': {
                            padding: { xs: '8px', sm: '12px' },
                        }
                    }}
                    placeholder="Search for products..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    inputProps={{
                        'aria-label': 'search products',
                        style: { 
                            WebkitAppearance: 'none',
                            MozAppearance: 'none'
                        }
                    }}
                />
                <IconButton 
                    type="submit" 
                    sx={{ 
                        p: { xs: '8px', sm: '12px' },
                        minWidth: '44px',
                        minHeight: '44px'
                    }}
                    aria-label="search"
                >
                    <SearchIcon />
                </IconButton>
            </Paper>
        </Box>
    );
};

export default Search;