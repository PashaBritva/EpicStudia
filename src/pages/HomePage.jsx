import { useState, useEffect } from "react";
import MovieCard from '../components/MovieCard.jsx';
import { getMovies } from '../services/api';
import { Box } from '@mui/material';

function HomePage() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        getMovies().then(setMovies);
    }, []);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '20px',
                backgroundColor: '#121212',
                minHeight: '100vh',
                color: '#ffffff',
            }}
        >
            <Box
                sx={{
                    display: 'grid',
                    alignItems: 'center',
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
