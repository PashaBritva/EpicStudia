import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import {API_URL, getMovieById, addComment, getCommentByMovieId, getUserProfile} from '../services/api';
import {
    Box,
    Typography,
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    Divider,
    IconButton,
    Select,
    MenuItem,
    Slider, Rating
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import MovieCard from "../components/MovieCard.jsx";

function MoviePage() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [rating, setRating] = useState(MovieCard.rating);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [quality, setQuality] = useState('720p');
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [volume, setVolume] = useState(100);
    const [pVolume, setPvolume] = useState(100);
    const [currentTime, setCurrentTime] = useState(0);
    const [bufferedTime, setBufferedTime] = useState(0);
    const videoRef = useRef(null);
    const [user, setUser] = useState(null);
    const MAX_COMMENT_LENGTH = 70;

    const token = localStorage.getItem('token');

    useEffect(() => {
        getMovieById(id)
            .then(setMovie)
            .catch(() => setMovie(null));
    }, [id]);

    const fetchComments = async () => {
        try {
            const data = await getCommentByMovieId(id);
            setComments(Array.isArray(data) ? data : []);
            // eslint-disable-next-line no-unused-vars
        } catch (error) {
            setComments([]);
        }
    };

    useEffect(() => {
        const fetchProfile = async () => {
            const response = await getUserProfile(token);
            setUser(response);
        };

        fetchProfile();
    }, [token]);

    useEffect(() => {
        fetchComments();
        const interval = setInterval(fetchComments, 20000);
        return () => clearInterval(interval);
    }, [id]);

    const handleCommentSubmit = async () => {
        console.log(user);
        if (comment.trim() === '' || comment.length > MAX_COMMENT_LENGTH) return;
        await addComment(id, comment, user.username);
        setComment('');
        await fetchComments();
    };

    const togglePlay = () => {
        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    const toggleMute = () => {
        if (!isMuted) {
            setIsMuted(true);
            setVolume(0);
        } else {
            setVolume(pVolume);
            setIsMuted(false);
        }
        videoRef.current.muted = !videoRef.current.muted;
    };

    const handleQualityChange = (event) => {
        setQuality(event.target.value);
        if (videoRef.current) {
            const currentTime = videoRef.current.currentTime;
            videoRef.current.src = `${API_URL}/movies/${id}/stream?quality=${event.target.value}`;
            videoRef.current.currentTime = currentTime;
            if (isPlaying) videoRef.current.play();
        }
    };

    const handleVolumeChange = (event, newValue) => {
        setVolume(newValue);
        setPvolume(newValue);
        if (videoRef.current) {
            videoRef.current.volume = newValue / 100;
        }
    };

    const handleTimeUpdate = () => {
        setCurrentTime(videoRef.current.currentTime);
        const buffered = videoRef.current.buffered;
        if (buffered.length > 0) {
            setBufferedTime(buffered.end(buffered.length - 1));
        }
    };

    const handleSeek = (event, newValue) => {
        setCurrentTime(newValue);
        videoRef.current.currentTime = newValue;
    };

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
    };

    const videoContainerStyles = isFullscreen
        ? {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: '#000',
            zIndex: 1300,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px'
        }
        : {
            position: 'relative',
            borderRadius: '10px',
            overflow: 'hidden',
            marginBottom: '20px',
            backgroundColor: '#000'
        };

    const videoStyles = isFullscreen
        ? { width: '100%', height: '100%', objectFit: 'contain' }
        : { width: '100%', borderRadius: '10px' };

    return (
        <Box
            sx={{
                maxWidth: '800px',
                margin: '70px auto',
                padding: '20px',
                backgroundColor: '#212121',
                color: '#ffffff',
                borderRadius: '10px',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.8)',
                '@media (max-width: 600px)': {
                    maxWidth: '100%',
                    margin: '10px',
                    padding: '15px',
                }
            }}
        >
            <Typography variant="h4" gutterBottom>
                {movie ? movie.title : 'Фильм не найден'}
            </Typography>
            {movie && (
                <>
                    <Typography variant="body1" sx={{ marginBottom: '20px', color: '#bdbdbd' }}>
                        {movie.description}
                    </Typography>
                    <Box sx={videoContainerStyles}>
                        <video
                            ref={videoRef}
                            src={`${API_URL}/movies/${id}/stream?quality=${quality}`}
                            style={videoStyles}
                            onTimeUpdate={handleTimeUpdate}
                            onContextMenu={(e) => e.preventDefault()} // Отключаем правый клик
                        />
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: '10px',
                                left: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px'
                            }}
                        >
                            <IconButton onClick={togglePlay} sx={{ color: '#fff' }}>
                                {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                            </IconButton>
                            <IconButton onClick={toggleMute} sx={{ color: '#fff' }}>
                                {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
                            </IconButton>
                            <Box sx={{ width: 100, display: 'flex', alignItems: 'center' }}>
                                <Slider
                                    value={volume}
                                    onChange={handleVolumeChange}
                                    aria-labelledby="volume-slider"
                                    size="small"
                                    sx={{ color: '#fff', height: '3px' }}
                                />
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: '10px',
                                right: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px'
                            }}
                        >
                            <Select
                                value={quality}
                                onChange={handleQualityChange}
                                sx={{
                                    color: '#fff',
                                    '.MuiOutlinedInput-notchedOutline': { borderColor: '#fff' }
                                }}
                                size="small"
                            >
                                <MenuItem value="360p">360p</MenuItem>
                                <MenuItem value="720p">720p</MenuItem>
                                <MenuItem value="1080p">1080p</MenuItem>
                            </Select>
                            <IconButton onClick={toggleFullscreen} sx={{ color: '#fff' }}>
                                {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
                            </IconButton>
                        </Box>
                        <Slider
                            value={currentTime}
                            onChange={handleSeek}
                            min={0}
                            max={videoRef.current ? videoRef.current.duration : 0}
                            sx={{
                                position: 'absolute',
                                bottom: '44px',  // Расположение ползунка по вертикали
                                left: '10px',    // Отступ слева
                                right: '10px',   // Отступ справа (не выходит за пределы)
                                height: '2px',   // Высота ползунка
                                color: '#fff',
                                width: 'calc(100% - 20px)',
                                '& .MuiSlider-thumb': {
                                    backgroundColor: '00000000',
                                    width: 10,
                                    height: 10,
                                },
                                '& .MuiSlider-track': {
                                    backgroundColor: '00000000',
                                },
                                '& .MuiSlider-rail': {
                                    backgroundColor: '#ffffff',
                                    height: '4px'
                                },
                            }}
                        />
                    </Box>
                    <Box sx={{ textAlign: 'left'}}>
                        <Rating
                            name="size-large"
                            value={rating}
                            precision={0.5}
                            onChange={(event, newValue) => {
                                setRating(newValue);
                            }}
                            sx={{
                                color: '#ffd700',
                                margin: '0 0 15px 0'
                            }}
                        />
                    </Box>
                    <Typography variant="h5" gutterBottom>
                        Комментарии
                    </Typography>
                    <List
                        sx={{
                            maxHeight: '300px',
                            overflowY: 'auto',
                            marginBottom: '20px',
                            backgroundColor: '#424242',
                            borderRadius: '10px',
                            padding: '10px'
                        }}
                    >
                        {comments.length > 0 ? (
                            comments.slice().reverse().map((c, index) => (
                                <Box key={index}>
                                    <ListItem disableGutters>
                                        <ListItemText
                                            primary={<strong>{c.user}</strong>}
                                            secondary={c.text}
                                            sx={{
                                                '& .MuiListItemText-secondary': { color: '#bdbdbd', wordBreak: 'break-word' }
                                            }}
                                        />
                                    </ListItem>
                                    {index < comments.length - 1 && <Divider sx={{ backgroundColor: '#616161' }} />}
                                </Box>
                            ))
                        ) : (
                            <Typography variant="body2" sx={{ color: '#bdbdbd' }}>
                                Комментариев пока нет
                            </Typography>
                        )}
                    </List>
                    <TextField
                        fullWidth
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder={`Оставьте комментарий (макс. ${MAX_COMMENT_LENGTH} символов)`}
                        multiline
                        rows={3}
                        variant="outlined"
                        sx={{
                            backgroundColor: '#424242',
                            borderRadius: '10px',
                            marginBottom: '20px',
                            '& .MuiOutlinedInput-root': {
                                color: '#ffffff'
                            }
                        }}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={handleCommentSubmit}
                        disabled={comment.length > MAX_COMMENT_LENGTH || comment.trim().length === 0}
                        sx={{
                            textTransform: 'none',
                            fontSize: '1rem',
                            backgroundColor: '#3f51b5',
                            '&:hover': {
                                backgroundColor: '#303f9f'
                            }
                        }}
                    >
                        Добавить комментарий
                    </Button>
                </>
            )}
        </Box>
    );
}

export default MoviePage;
