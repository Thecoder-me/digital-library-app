import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import BookItem from './BookItem';
import '../styles/Bookshelf.css';

function Bookshelf({ books, currentTheme, themeSettings, onSelectBook, shelves }) {
  const GENRES = ['Fantasy', 'Romance', 'Religious', 'Mystery', 'Classics', 'Non-Fiction', 'To Be Read'];

  const booksByGenre = useMemo(() => {
    const grouped = {};
    GENRES.forEach(genre => {
      grouped[genre] = books.filter(book => book.shelf === genre);
    });
    return grouped;
  }, [books]);

  const getShelfClass = () => {
    if (themeSettings.bookArrangement === 'chaotic') return 'chaotic';
    if (themeSettings.bookArrangement === 'mixed') return 'mixed';
    return 'organized';
  };

  return (
    <div className={`bookshelf-container theme-${currentTheme}`}>
      {GENRES.map((genre) => (
        <motion.div
          key={genre}
          className="shelf-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="shelf-label">{genre}</div>
          <div className={`shelf ${getShelfClass()}`}>
            {booksByGenre[genre].length > 0 ? (
              booksByGenre[genre].map((book, index) => (
                <BookItem
                  key={book._id}
                  book={book}
                  index={index}
                  currentTheme={currentTheme}
                  themeSettings={themeSettings}
                  onSelect={onSelectBook}
                />
              ))
            ) : (
              <div className="empty-shelf">No books yet</div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default Bookshelf;
