import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    TextField,
    Box,
    Card,
    CardContent,
    Chip,
    CircularProgress,
} from '@mui/material';
import { getMovieById } from '../services/api';

function Header() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (searchTerm.trim()) {
                setLoading(true);
                getMovieById(searchTerm.trim())
                    .then((results) => setSearchResults(results))
                    .finally(() => setLoading(false));
            } else {
                setSearchResults([]);
            }
        }, 1000);

        return () => clearTimeout(delayDebounce);
    }, [searchTerm]);

    return (
        <AppBar
            position="fixed"
            sx={{
                backgroundColor: 'rgba(18, 18, 18, 0.8)',
                backdropFilter: 'blur(5px)',
                boxShadow: 'true',
            }}
        >
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography
                        variant="h6"
                        component={Link}
                        to="/"
                        sx={{ color: 'white', textDecoration: 'none' }}
                    >
                        Главная
                    </Typography>
                    <Typography
                        variant="h6"
                        component={Link}
                        to="/user"
                        sx={{ color: 'white', textDecoration: 'none' }}
                    >
                        Профиль
                    </Typography>
                </Box>
                <Box sx={{ position: 'relative', width: '40%' }}>
                    <TextField
                        variant="outlined"
                        size="small"
                        value={searchTerm}
                        onChange={handleSearch}
                        placeholder="Поиск по хештегам"
                        sx={{
                            backgroundColor: '#1e1e1e',
                            borderRadius: 1,
                            input: { color: 'white' },
                        }}
                        InputLabelProps={{ style: { color: 'gray' } }}
                        fullWidth
                    />
                    {loading && (
                        <CircularProgress
                            size={24}
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                right: 10,
                                transform: 'translateY(-50%)',
                                color: 'white',
                            }}
                        />
                    )}
                    {searchResults.length > 0 && (
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '100%',
                                left: 0,
                                width: '100%',
                                maxHeight: '300px',
                                overflowY: 'auto',
                                backgroundColor: '#1e1e1e',
                                borderRadius: 1,
                                boxShadow: 3,
                                zIndex: 10,
                                mt: 1,
                            }}
                        >
                            {searchResults.map((movie) => (
                                <Card
                                    key={movie.id}
                                    sx={{
                                        backgroundColor: '#121212',
                                        mb: 1,
                                        '&:hover': { backgroundColor: '#1f1f1f' },
                                    }}
                                >
                                    <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <Typography variant="h6" sx={{ color: 'white' }}>
                                            {movie.title}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'gray', mb: 1 }}>
                                            {movie.description}
                                        </Typography>
                                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                            {movie.hashtags.split(',').map((hashtag, index) => (
                                                <Chip
                                                    key={index}
                                                    label={hashtag}
                                                    component={Link}
                                                    to={`/search/${hashtag}`}
                                                    sx={{
                                                        color: 'white',
                                                        backgroundColor: '#303f9f',
                                                        '&:hover': { backgroundColor: '#3f51b5' },
                                                    }}
                                                />
                                            ))}
                                        </Box>
                                    </CardContent>
                                </Card>
                            ))}
                        </Box>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
