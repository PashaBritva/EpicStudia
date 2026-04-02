import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MovieCard from '../components/MovieCard.jsx';
import { getMoviesByHashtags } from '../services/api';
import { Box, Typography, CircularProgress } from '@mui/material';

function SearchPage() {
    const { hashtag } = useParams();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!hashtag) return;

        setLoading(true);
        getMoviesByHashtags(hashtag)
            .then((data) => {
                setMovies(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Ошибка при поиске фильмов:', err);
                setError('Не удалось найти фильмы по хэштегу');
                setLoading(false);
            });
    }, [hashtag]);

    if (loading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    backgroundColor: '#121212',
                    color: '#ffffff',
                }}
            >
                <CircularProgress sx={{ color: '#ffffff' }} />
            </Box>
        );
    }

    if (error) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    backgroundColor: '#121212',
                    color: '#ffffff',
                }}
            >
                <Typography variant="h5" color="error">
                    {error}
                </Typography>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '20px',
                backgroundColor: '#121212',
                minHeight: 'auto',
                color: '#ffffff',
            }}
        >
            <Typography variant="h4" sx={{ marginBottom: '20px' }}>
                Фильмы по хэштегу: #{hashtag}
            </Typography>
            {movies.length === 0 ? (
                <Typography variant="h5" color="text.secondary">
                    Фильмы не найдены
                </Typography>
            ) : (
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(345px, 1fr))',
                        gap: '20px',
                        width: '100%',
                        maxWidth: '1200px',
                    }}
                >
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </Box>
            )}
        </Box>
    );
}

export default SearchPage;
