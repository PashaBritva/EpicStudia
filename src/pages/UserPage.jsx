import { useState, useEffect } from 'react';
import { Typography, Box, Button, CircularProgress, TextField, Alert, Paper } from '@mui/material';
import axios from 'axios';
import { API_URL } from "../services/api.js";

function UserPage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [form, setForm] = useState({ username: '', password: '' });
    const [isRegistering, setIsRegistering] = useState(false);

    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            setLoading(false);
            return;
        }

        const fetchProfile = async () => {
            try {
                const response = await axios.get(`${API_URL}/user/profile`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(response.data);
            } catch (err) {
                setError('Не удалось загрузить профиль. Пожалуйста, войдите.');
                localStorage.removeItem('token');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [token]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleRegisterOrLogin = async () => {
        const endpoint = isRegistering ? '/register' : '/login';
        try {
            const response = await axios.post(`${API_URL}/user${endpoint}`, form);
            localStorage.setItem('token', response.data.token);
            window.location.reload();
        } catch (err) {
            setError(err.response?.data || 'Ошибка при обработке запроса');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    if (loading) return <CircularProgress sx={{ color: '#1976d2' }} />;
    if (!user) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#121212' }}>
                <Paper sx={{ padding: 4, borderRadius: 3, maxWidth: 400, backgroundColor: '#1e1e1e', color: '#fff' }}>
                    <Typography variant="h5" align="center" gutterBottom>
                        {isRegistering ? 'Регистрация' : 'Вход'}
                    </Typography>
                    {error && <Alert severity="error" sx={{ marginBottom: 2 }}>{error}</Alert>}
                    <TextField fullWidth margin="dense" variant="outlined" label="Имя пользователя" name="username" value={form.username} onChange={handleInputChange} InputLabelProps={{ style: { color: '#aaa' } }} sx={{ input: { color: '#fff' } }} />
                    <TextField fullWidth margin="dense" variant="outlined" label="Пароль" name="password" type="password" value={form.password} onChange={handleInputChange} InputLabelProps={{ style: { color: '#aaa' } }} sx={{ input: { color: '#fff' } }} />
                    <Button fullWidth variant="contained" onClick={handleRegisterOrLogin} sx={{ bgcolor: '#1976d2', mt: 2 }}>
                        {isRegistering ? 'Зарегистрироваться' : 'Войти'}
                    </Button>
                    <Button fullWidth variant="text" onClick={() => setIsRegistering(!isRegistering)} sx={{ color: '#1976d2', mt: 1 }}>
                        {isRegistering ? 'Уже есть аккаунт?' : 'Нет аккаунта?'}
                    </Button>
                </Paper>
            </Box>
        );
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#121212', color: '#fff' }}>
            <Paper sx={{ padding: 4, borderRadius: 3, maxWidth: 400, backgroundColor: '#1e1e1e' }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Профиль пользователя
                </Typography>
                {user && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Typography variant="h6">Имя пользователя: {user.username}</Typography>
                        <Button variant="contained" color="error" onClick={handleLogout}>
                            Выйти
                        </Button>
                    </Box>
                )}
            </Paper>
        </Box>
    );
}

export default UserPage;
