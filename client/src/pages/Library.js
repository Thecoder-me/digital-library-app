import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import Header from '../components/Header';
import Bookshelf from '../components/Bookshelf';
import BookDetail from '../components/BookDetail';
import AddBookModal from '../components/AddBookModal';
import ThemeSelector from '../components/ThemeSelector';
import '../styles/Library.css';

function Library({ currentTheme, setCurrentTheme, themeSettings, setThemeSettings, onLogout }) {
  const [books, setBooks] = useState([]);
  const [shelves, setShelves] = useState({});
  const [selectedBook, setSelectedBook] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    fetchBooks();
    fetchShelves();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('/api/books');
      setBooks(response.data);
    } catch (error) {
      toast.error('Failed to load books');
    } finally {
      setLoading(false);
    }
  };

  const fetchShelves = async () => {
    try {
      const response = await axios.get('/api/shelves');
      setShelves(response.data);
    } catch (error) {
      toast.error('Failed to load shelves');
    }
  };

  const handleAddBook = async (bookData) => {
    try {
      await axios.post('/api/books', bookData);
      await fetchBooks();
      await fetchShelves();
      setShowAddModal(false);
      toast.success('Book added to your library!');
    } catch (error) {
      toast.error('Failed to add book');
    }
  };

  const handleUpdateBook = async (bookId, updates) => {
    try {
      await axios.put(`/api/books/${bookId}`, updates);
      await fetchBooks();
      await fetchShelves();
      setSelectedBook({ ...selectedBook, ...updates });
      toast.success('Book updated!');
    } catch (error) {
      toast.error('Failed to update book');
    }
  };

  const handleDeleteBook = async (bookId) => {
    try {
      await axios.delete(`/api/books/${bookId}`);
      await fetchBooks();
      await fetchShelves();
      setSelectedBook(null);
      toast.success('Book deleted from your library');
    } catch (error) {
      toast.error('Failed to delete book');
    }
  };

  const handleThemeChange = async (theme) => {
    try {
      await axios.put(`/api/themes/current/${theme}`);
      setCurrentTheme(theme);
      toast.success(`Theme changed to ${theme}!`);
    } catch (error) {
      toast.error('Failed to change theme');
    }
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      try {
        const response = await axios.get(`/api/books/search/${query}`);
        setBooks(response.data);
      } catch (error) {
        toast.error('Search failed');
      }
    } else {
      fetchBooks();
    }
  };

  if (loading) {
    return <div className="loading">Loading your library...</div>;
  }

  return (
    <div className="library-container">
      <Header
        onSearch={handleSearch}
        onAddBook={() => setShowAddModal(true)}
        onThemeClick={() => setShowThemeSelector(!showThemeSelector)}
        onLogout={onLogout}
      />

      {showThemeSelector && (
        <ThemeSelector
          currentTheme={currentTheme}
          onThemeChange={handleThemeChange}
          onClose={() => setShowThemeSelector(false)}
        />
      )}

      <div className="library-content">
        <Bookshelf
          books={books}
          currentTheme={currentTheme}
          themeSettings={themeSettings}
          onSelectBook={setSelectedBook}
          shelves={shelves}
        />

        {selectedBook && (
          <BookDetail
            book={selectedBook}
            currentTheme={currentTheme}
            onUpdate={handleUpdateBook}
            onDelete={handleDeleteBook}
            onClose={() => setSelectedBook(null)}
          />
        )}
      </div>

      {showAddModal && (
        <AddBookModal onAdd={handleAddBook} onClose={() => setShowAddModal(false)} />
      )}
    </div>
  );
}

export default Library;
