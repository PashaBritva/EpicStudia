import { useState, useEffect } from 'react';
import { Typography, Box, Button, CircularProgress, TextField, Alert, Paper, useMediaQuery } from '@mui/material';
import {
    blockedUser,
    getUserById,
    getUserProfile,
    getUsers,
    LoginOrRegisterUser,
    setRole
} from "../services/api.js";
import CreateMoviePage from "./CreatMoviePage.jsx";

function UserPage() {
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [form, setForm] = useState({ username: '', password: '' });
    const [isRegistering, setIsRegistering] = useState(false);
    const [search, setSearch] = useState('');

    const token = localStorage.getItem('token');

    const isMobile = useMediaQuery('(max-width:600px)');

    useEffect(() => {
        if (!token) {
            setLoading(false);
            return;
        }

        const fetchProfile = async () => {
            try {
                const response = await getUserProfile(token);
                setUser(response);
                if (response.role === 'admin') {
                    const usersResponse = await getUsers(token);
                    setUsers(usersResponse);
                }
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
        const endpoint = isRegistering ? 'register' : 'login';
        try {
            const response = await LoginOrRegisterUser(endpoint, form.username, form.password);
            localStorage.setItem('token', response.token);
            window.location.reload();
        } catch (err) {
            setError(err.response?.data || 'Ошибка входа');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        window.location.reload();
    };

    const handleBlocked = async (id, blocked) => {
        await blockedUser(token, id, blocked);
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.id === id ? { ...user, blocked } : user
            )
        );
    };

    const handleAdmin = async (id) => {
        const usser = await getUserById(token, id);
        if (usser.role === 'admin') {
            let role = 'user';
            await setRole(token, id, role);
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === id ? { ...user, role } : user
                )
            );
        } else {
            let role = 'admin';
            await setRole(token, id, role);
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === id ? { ...user, role } : user
                )
            );
        }
    }

    const filteredUsers = users
        .filter((u) => u.id.toString().includes(search) || u.username.includes(search))

    if (loading) return <CircularProgress sx={{ color: '#1976d2' }} />;
    if (!user) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#121212' }}>
                <Paper sx={{ padding: 4, borderRadius: 3, maxWidth: isMobile ? '90%' : 500, backgroundColor: '#1e1e1e', color: '#fff' }}>
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

    if (user.role === 'admin') {
        return (
            <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', justifyContent: 'center', minHeight: 'auto', backgroundColor: '#121212', color: '#fff', gap: isMobile ? 2 : 4, padding: isMobile ? 2 : 4 }}>
                <Box sx={{
                    margin: '0 0 10px 0',
                }}>
                    <Typography variant="h2" gutterBottom >
                        Профиль пользователя
                    </Typography>
                    {user && (
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="h3">Имя пользователя: {user.username}</Typography>
                            <Button sx={{margin: '15px 0 0 0'}} variant="contained" color="error" onClick={handleLogout}>
                                Выйти
                            </Button>
                        </Box>
                    )}
                </Box>
                <Box sx={{
                    width: isMobile ? '90%' : 400,
                    zIndex: 1001,
                    boxShadow: '0px 4px 10px rgba(0,0,0,0.3)',
                }}>
                    <Paper sx={{ padding: 3, borderRadius: 3, backgroundColor: '#1e1e1e', width: '100%', height: 435, overflowY: 'auto' }}>
                        <TextField
                            fullWidth
                            margin="dense"
                            variant="outlined"
                            label="Поиск пользователей"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            InputLabelProps={{ style: { color: '#aaa' } }}
                            sx={{ input: { color: '#fff' } }}
                        />
                        <Box >
                            {filteredUsers.map((u) => (
                                <Box key={u.id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
                                    <Typography variant="h6">ID: {u.id} | {u.username}</Typography>
                                    <Button
                                        variant="contained"
                                        color={u.blocked ? 'success' : 'error'}
                                        onClick={() => handleBlocked(u.id, !u.blocked)}
                                    >
                                        {u.blocked ? 'Разблокировать' : 'Заблокировать'}
                                    </Button>
                                    <Button
                                        sx={{ margin: '10px' }}
                                        variant="contained"
                                        color={u.role !== 'admin' ? 'success' : 'error'}
                                        onClick={() => handleAdmin(u.id)}
                                    >
                                        {u.role !== 'admin' ? 'Повысить' : 'Понизить'}
                                    </Button>
                                </Box>
                            ))}
                        </Box>
                    </Paper>
                </Box>
                <Box sx={{ width: isMobile ? '90%' : 400, zIndex: 1000, boxShadow: '0px 4px 10px rgba(0,0,0,0.3)', marginTop: isMobile ? 2 : 0 }}>
                    <CreateMoviePage />
                </Box>
            </Box>
        );
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'top', minHeight: 'auto', backgroundColor: '#121212', color: '#fff', padding: isMobile ? 2 : 4 }}>
            <Typography variant={isMobile ? 'h3' : 'h2'} align="center" gutterBottom>
                Профиль пользователя
            </Typography>
            {user && (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant={isMobile ? 'h4' : 'h3'}>Имя пользователя: {user.username}</Typography>
                    <Button sx={{ margin: '15px 0 0 0' }} variant="contained" color="error" onClick={handleLogout}>
                        Выйти
                    </Button>
                </Box>
            )}
            <Box sx={{ display: 'flex', width: isMobile ? '90%' : '80%', marginTop: 4 }}>
                <Paper sx={{ padding: 3, borderRadius: 3, backgroundColor: '#1e1e1e', width: '100%', overflowY: 'auto' }}>
                    <Typography variant={isMobile ? 'h4' : 'h3'} align='center'>История просмотра</Typography>
                    <Typography variant={isMobile ? 'h5' : 'h4'} align='center' sx={{ marginTop: 3 }}>В разработке</Typography>
                </Paper>
            </Box>
        </Box>
    );
}

export default UserPage;