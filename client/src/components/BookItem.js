import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/BookItem.css';

function BookItem({ book, index, currentTheme, themeSettings, onSelect }) {
  const [isHovered, setIsHovered] = useState(false);

  const getBookColor = () => {
    const colors = {
      darkAcademia: ['#2d5016', '#8b4513', '#8b0000', '#1a1a2e', '#16213e'],
      lightAcademia: ['#d4c5b9', '#e8d5c4', '#b8a89f', '#e0d5cc', '#d9cfc5'],
      romanticAcademia: ['#9d6d6d', '#a85c6a', '#9b7b7b', '#a67a7a', '#b08787'],
      chaosAcademia: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f7dc6f', '#bb8fce'],
    };

    const themeColors = colors[currentTheme] || colors.darkAcademia;
    return themeColors[index % themeColors.length];
  };

  const getStatusIndicator = () => {
    switch (book.status) {
      case 'Currently Reading':
        return <div className="status-indicator reading" title="Currently Reading">📖</div>;
      case 'Finished':
        return <div className="status-indicator finished" title="Finished">✓</div>;
      case 'Did Not Finish':
        return <div className="status-indicator dnf" title="Did Not Finish">✗</div>;
      case 'Re-reading':
        return <div className="status-indicator rereading" title="Re-reading">🔄</div>;
      default:
        return <div className="status-indicator tbr" title="To Be Read">📕</div>;
    }
  };

  const rotation = themeSettings.bookArrangement === 'chaotic'
    ? Math.random() * 6 - 3
    : 0;

  const yOffset = themeSettings.bookArrangement === 'chaotic'
    ? Math.random() * 8 - 4
    : 0;

  return (
    <motion.div
      className={`book-item ${themeSettings.bookArrangement}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => onSelect(book)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -15,
        scale: 1.05,
        zIndex: 10,
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      style={{
        rotate: rotation,
        y: yOffset,
      }}
    >
      <div
        className="book-spine"
        style={{
          background: book.coverImage || getBookColor(),
          backgroundImage: book.coverImage ? `url(${book.coverImage})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="book-title">{book.title}</div>
        <div className="book-author">{book.author}</div>
      </div>

      {book.status === 'Currently Reading' && (
        <motion.div
          className="bookmark"
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      )}

      {getStatusIndicator()}

      {isHovered && book.rating > 0 && (
        <motion.div
          className="book-rating"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {'★'.repeat(Math.round(book.rating))}
        </motion.div>
      )}
    </motion.div>
  );
}

export default BookItem;
