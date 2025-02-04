import { useState, useEffect } from "react";
import MovieCard from '../components/MovieCard.jsx';
import { getMovies, getUserProfile } from '../services/api';
import { Box, Typography } from '@mui/material';

function HomePage() {
    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Добавим состояние загрузки
    const [error, setError] = useState(null); // Добавим состояние ошибки

    const token = localStorage.getItem('token');

    useEffect(() => {
        getMovies()
            .then((data) => {
                setMovies(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Ошибка при загрузке фильмов:', err);
                setError('Не удалось загрузить фильмы');
                setLoading(false);
            });

        if (token) {
            getUserProfile(token)
                .then((res) => {
                    setUser(res);
                })
                .catch((err) => {
                    console.error('Ошибка при загрузке профиля:', err);
                    setError('Не удалось загрузить профиль пользователя');
                });
        }
    }, [token]);

    if (user?.blocked) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '90vh',
                    backgroundColor: '#121212',
                    color: '#ffffff',
                }}
            >
                <Typography variant="h5" color="error">
                    Извини, но тебя заблокировали админы :(
                </Typography>
            </Box>
        );
    }

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
                <Typography variant="h5">Загрузка...</Typography>
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
        </Box>
    );
}

export default HomePage;