import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

function Header() {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
        setSearchTerm(event.target.value.toLowerCase()); // Преобразование в нижний регистр для удобства поиска
    };

    return (
        <header className="header">
            <nav>
                <Link to="/">Главная</Link>
                <Link to="/user">Профиль</Link>
            </nav>
            <form className="search-form">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Поиск по хештегам"
                />
                <Link to={searchTerm.trim() ? `/search/${searchTerm}` : '/search'}>
                    <button>Поиск</button>
                </Link>
            </form>
        </header>
    );
}

export default Header;
