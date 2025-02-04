import { Link } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, Chip, Button, Box, LinearProgress, Rating } from '@mui/material';
import PropTypes from 'prop-types';
import { useRef, useState, useEffect } from 'react';
import { API_URL } from '../services/api';

MovieCard.propTypes = {
    movie: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        fullMovieUrl: PropTypes.string.isRequired,
        hashtags: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
    }).isRequired,
};

function MovieCard({ movie }) {
    const [isHovered, setIsHovered] = useState(false);
    const [progress, setProgress] = useState(0);
    const [rating, setRating] = useState(movie.rating);
    const videoRef = useRef(null);
    let timer = useRef(null); // Обновление timer на useRef

    useEffect(() => {
        return () => {
            if (timer.current) {
                clearInterval(timer.current);
            }
        };
    }, []);

    const handleMouseEnter = () => {
        setIsHovered(true);
        setProgress(0);

        const video = videoRef.current;
        if (video) {
            video.currentTime = 0; // Сброс на начало
            video.play().catch((err) => {
                console.warn('Video play interrupted:', err);
            });
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setProgress(100);

        const video = videoRef.current;
        if (video) {
            video.pause();
            video.currentTime = 0;
        }

        if (timer.current) {
            clearInterval(timer.current);
            timer.current = null;
        }
    };

    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: {
                    xs: '100fr', // Для мобильных устройств (xs = extra small)
                    sm: '200fr', // Для планшетов (sm = small)
                    md: '500fr', // Для десктопов (md = medium)
                },
                padding: 2,
            }}
        >
            <Card
                sx={{
                    maxWidth: 345,
                    width: '100%',
                    backgroundColor: '#212121',
                    color: '#ffffff',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.8)',
                    borderRadius: '15px',
                    overflow: 'hidden',
                }}
            >
                <Box
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    sx={{
                        position: 'relative',
                    }}
                >
                    <CardMedia
                        component="video"
                        ref={videoRef}
                        src={`${API_URL}/movies/${movie.id}/stream`}
                        muted
                        loop={false}
                        sx={{
                            height: 250,
                            objectFit: 'cover',
                            filter: isHovered ? 'brightness(100%)' : 'brightness(60%)',
                            transition: 'filter 0.3s ease-in-out',
                            borderRadius: '15px 15px 0 0',
                        }}
                    />
                    {isHovered && (
                        <LinearProgress
                            variant="determinate"
                            value={progress}
                            sx={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                width: '100%',
                                height: '4px',
                                backgroundColor: '#424242',
                                '& .MuiLinearProgress-bar': {
                                    backgroundColor: '#3f51b5',
                                },
                            }}
                        />
                    )}
                </Box>
                <CardContent
                    sx={{
                        padding: '16px',
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 'bold',
                            fontSize: '1.25rem',
                            marginBottom: '8px',
                        }}
                    >
                        {movie.title}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            color: '#bdbdbd',
                            fontSize: '0.9rem',
                            marginBottom: '16px',
                        }}
                    >
                        {movie.description}
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '5px',
                            marginBottom: '16px',
                        }}
                    >
                        {movie.hashtags.split(',').map((hashtag, index) => (
                            <Chip
                                key={index}
                                label={hashtag}
                                component={Link}
                                to={`/movie/search/${hashtag.split('#')[1]}`}
                                clickable
                                sx={{
                                    backgroundColor: '#424242',
                                    color: '#ffffff',
                                    '&:hover': {
                                        backgroundColor: '#616161',
                                    },
                                    fontSize: '0.8rem',
                                }}
                            />
                        ))}
                    </Box>
                    <Box
                        sx={{
                            display: 'grid',
                            gap: '10px',
                            alignItems: 'center',
                        }}
                    >
                        <Button
                            variant="contained"
                            component={Link}
                            to={`/movie/${movie.id}`}
                            sx={{
                                textTransform: 'none',
                                fontSize: '0.9rem',
                                backgroundColor: '#3f51b5',
                                '&:hover': {
                                    backgroundColor: '#303f9f',
                                },
                                gridColumn: 0,
                            }}
                        >
                            Смотреть
                        </Button>
                        <Box sx={{ textAlign: 'right', gridColumn: 2 }}>
                            <Rating
                                name="size-large"
                                value={rating}
                                precision={0.5}
                                onChange={(event, newValue) => {
                                    setRating(newValue);
                                }}
                                sx={{
                                    color: '#ffd700',
                                    gridColumn: 2,
                                }}
                            />
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}

export default MovieCard;
