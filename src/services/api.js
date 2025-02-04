import axios from 'axios';

export const API_URL = 'http://192.168.0.16:5000/api/v1';

export const getMovies = async () => {
    const response = await axios.get(`${API_URL}/movies`);
    return response.data;
};

export const getMovieById = async (id) => {
    const response = await axios.get(`${API_URL}/movies/${id}`);
    return response.data;
};

export const addMovie = async (movie) => {
    const formData = new FormData();
    formData.append('fullMovie', movie.video);
    formData.append('title', movie.title);
    formData.append('description', movie.description);
    formData.append('hashtags', JSON.stringify(movie.hashtags.split(',').map(tag => tag.trim())));

    const response = await axios.post(`${API_URL}/movies/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
};


export const addComment = async (movieId, text, user) => {
    if (user === null) {
        user = 'guest';
    }

    await axios.post(`${API_URL}/movies/${movieId}/comment`, {
        user, text
        }, {
        headers: { 'Content-Type': 'application/json' }
    });
};

export const getCommentByMovieId = async (movieId) => {
    const response = await axios.get(`${API_URL}/movies/${movieId}/comments`);
    return response.data;
};

export const LoginOrRegisterUser = async (endpoint, username, password) => {
    const response = await axios.post(`${API_URL}/user/${endpoint}`,
        { username, password },
        { headers: { 'Content-Type': 'application/json' } }
    );
    return response.data;
};

export const getUserProfile = async (token) => {
    const response = await axios.get(`${API_URL}/user/profile`,
        { headers: { 'Authorization': `Bearer ${token}` } }
    );
    return response.data;
};

export const getUsers = async (token) => {
    const response = await axios.get(`${API_URL}/user/all`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.data;
};

export const getUserById = async (token, id) => {
    const response = await axios.get(`${API_URL}/user/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.data;
}

export const blockedUser = async (token, id, blocked) => {
    await axios.post(`${API_URL}/user/${id}/block`, {
        blocked
    }, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
};

export const setRole = async (token, id, role) => {
    await axios.post(`${API_URL}/user/${id}/role`, { role }, {
        headers: { 'Authorization': `Bearer ${token}` }
    })
};

export const getMoviesByHashtags = async (hashtags) => {
    const response = await axios.get(`${API_URL}/movies/search`, {
        params: { hashtags },
    });

    if (response.status !== 200) {
        throw new Error('Ошибка при поиске фильмов');
    }

    return response.data;
};
