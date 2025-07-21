import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
        },
    },
    components: {
        MuiContainer: {
            styleOverrides: {
                root: {
                    paddingLeft: { xs: 2, sm: 3 },
                    paddingRight: { xs: 2, sm: 3 },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    minWidth: { xs: '100%', sm: 'auto' },
                    minHeight: '44px',
                    marginBottom: { xs: 1, sm: 0 },
                    touchAction: 'manipulation',
                    WebkitTapHighlightColor: 'transparent',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    width: { xs: '100%', sm: 'auto' },
                    '& .MuiInputBase-root': {
                        minHeight: '44px',
                    },
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    minWidth: '44px',
                    minHeight: '44px',
                    touchAction: 'manipulation',
                    WebkitTapHighlightColor: 'transparent',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                },
            },
        },
        MuiCardMedia: {
            styleOverrides: {
                root: {
                    height: { xs: '200px', sm: '300px', md: '400px' },
                    objectFit: 'cover',
                },
            },
        },
        MuiTableContainer: {
            styleOverrides: {
                root: {
                    overflowX: 'auto',
                    WebkitOverflowScrolling: 'touch',
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    whiteSpace: 'nowrap',
                    padding: { xs: 1, sm: 2 },
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    margin: { xs: 1, sm: 2 },
                    width: { xs: 'calc(100% - 16px)', sm: 'auto' },
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    width: { xs: '100%', sm: 240 },
                },
            },
        },
        MuiSnackbar: {
            styleOverrides: {
                root: {
                    bottom: { xs: 0, sm: 24 },
                },
            },
        },
    },
    typography: {
        h1: {
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
        },
        h2: {
            fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
        },
        h3: {
            fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
        },
        h4: {
            fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
        },
        h5: {
            fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' },
        },
        h6: {
            fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
        },
        body1: {
            fontSize: { xs: '0.875rem', sm: '1rem' },
        },
        body2: {
            fontSize: { xs: '0.75rem', sm: '0.875rem' },
        },
    },
});

export default theme; 