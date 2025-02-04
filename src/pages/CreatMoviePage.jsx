import { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, Alert } from '@mui/material';
import { addMovie } from '../services/api';

function CreateMoviePage() {
    const [movie, setMovie] = useState({
        title: '',
        description: '',
        hashtags: '',
        video: null,
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false); // Для блокировки кнопки отправки

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMovie((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setMovie((prev) => ({ ...prev, video: file }));
        }
    };

    const handleSubmit = async () => {
        if (!movie.title || !movie.description || !movie.hashtags || !movie.video) {
            setError('Все поля должны быть заполнены');
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await addMovie(movie);

           setSuccess(response.message);
           setError(null);
           setMovie({ title: '', description: '', hashtags: '', video: null }); // Очищаем форму
        } catch (err) {
            console.error(err);
            setError('Ошибка при загрузке фильма: ' + (err.response?.data || err.message));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Paper sx={{ padding: 4, borderRadius: 3, maxWidth: 500, backgroundColor: '#1e1e1e', color: '#fff' }}>
                <Typography variant="h5" align="center" gutterBottom>Добавить фильм</Typography>
                {error && <Alert severity="error" sx={{ marginBottom: 2 }}>{error}</Alert>}
                {success && <Alert severity="success" sx={{ marginBottom: 2 }}>Фильм успешно загружен</Alert>}
                <TextField
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    label="Название"
                    name="title"
                    value={movie.title}
                    onChange={handleInputChange}
                    InputLabelProps={{ style: { color: '#aaa' } }}
                    sx={{ input: { color: '#fff' } }}
                />
                <TextField
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    label="Описание"
                    name="description"
                    value={movie.description}
                    onChange={handleInputChange}
                    InputLabelProps={{ style: { color: '#aaa' } }}
                    sx={{ input: { color: '#fff' } }}
                />
                <TextField
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    label="Хэштеги (через запятую)"
                    name="hashtags"
                    value={movie.hashtags}
                    onChange={handleInputChange}
                    InputLabelProps={{ style: { color: '#aaa' } }}
                    sx={{ input: { color: '#fff' } }}
                />
                <Button variant="contained" component="label" sx={{ bgcolor: '#1976d2', mt: 2 }}>
                    Загрузить видео
                    <input type="file" hidden accept="video/*" onChange={handleFileChange} />
                </Button>
                {movie.video && (
                    <Typography variant="subtitle1" align="center" gutterBottom>
                        {movie.video.name}
                    </Typography>
                )}
                <Button
                    fullWidth
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{ bgcolor: '#1976d2', mt: 2 }}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Загрузка...' : 'Добавить фильм'}
                </Button>
            </Paper>
        </Box>
    );
}

export default CreateMoviePage;
