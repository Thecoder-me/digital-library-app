import React, { useState } from 'react';
import { FaSearch, FaPlus, FaPalette, FaSignOutAlt } from 'react-icons/fa';
import '../styles/Header.css';

function Header({ onSearch, onAddBook, onThemeClick, onLogout }) {
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    onSearch(value);
  };

  return (
    <header className="library-header">
      <div className="header-left">
        <h1>📚 Your Library</h1>
      </div>

      <div className="header-center">
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search books or authors..."
            value={searchInput}
            onChange={handleSearch}
            className="search-input"
          />
        </div>
      </div>

      <div className="header-right">
        <button className="header-btn theme-btn" onClick={onThemeClick} title="Change Theme">
          <FaPalette /> Themes
        </button>
        <button className="header-btn add-btn" onClick={onAddBook} title="Add Book">
          <FaPlus /> Add Book
        </button>
        <button className="header-btn logout-btn" onClick={onLogout} title="Logout">
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
