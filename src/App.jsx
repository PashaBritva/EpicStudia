import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import MoviePage from './pages/MoviePage.jsx';
import UserPage from './pages/UserPage.jsx';
import Header from './components/Header';

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/movie/:id" element={<MoviePage />} />
                <Route path="/user" element={<UserPage />} />
            </Routes>
        </Router>
    );
}

export default App;
