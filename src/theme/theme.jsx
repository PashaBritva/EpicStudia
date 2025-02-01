import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
        background: {
            default: '#121212',
            paper: '#1e1e1e',
        },
        text: {
            primary: '#ffffff',
            secondary: '#b0bec5',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: { fontSize: '2rem', fontWeight: 700 },
        h2: { fontSize: '1.75rem', fontWeight: 600 },
        h3: { fontSize: '1.5rem', fontWeight: 500 },
        h4: { fontSize: '1.25rem', fontWeight: 400 },
        body1: { fontSize: '1rem' },
        button: { textTransform: 'none' },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    padding: '10px 20px',
                    fontSize: '1rem',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 8,
                        backgroundColor: '#1e1e1e',
                        '& fieldset': { borderColor: '#424242' },
                        '&:hover fieldset': { borderColor: '#757575' },
                        '&.Mui-focused fieldset': { borderColor: '#1976d2' },
                        '& input': { color: '#fff' },
                    },
                    '& label': { color: '#b0bec5' },
                    '& label.Mui-focused': { color: '#1976d2' },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: '#1e1e1e',
                    borderRadius: 12,
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
                },
            },
        },
    },
});

export default darkTheme;
