# 📚 Digital Library App

An immersive personal digital library application with interactive bookshelves and four stunning theme modes: Dark Academia, Light Academia, Romantic Academia, and Chaotic Academia.

## Features

✨ **Interactive Bookshelf** - Visual 3D-like book display with hover animations
🎨 **Four Unique Themes** - Each with distinct colors, atmospheres, and book arrangements
📖 **Book Management** - Add, edit, delete books with comprehensive metadata
⭐ **Rating System** - 5-star rating system for each book
📝 **Personal Notes** - Write and save personal thoughts about each book
🏷️ **Tags System** - Organize books with custom tags
📚 **Shelf Organization** - 7 different shelves (Fantasy, Romance, Religious, Mystery, Classics, Non-Fiction, To Be Read)
🔍 **Search & Filter** - Find books by title, author, or tags
🌓 **Reading Status** - Track: To Be Read, Currently Reading, Finished, Did Not Finish, Re-reading

## Tech Stack

**Backend:**
- Node.js + Express.js
- MongoDB
- JWT Authentication
- bcryptjs for password hashing

**Frontend:**
- React 18
- Framer Motion (animations)
- Axios (API calls)
- React Router
- React Icons
- React Toastify (notifications)

## Installation

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

### Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/Thecoder-me/digital-library-app.git
cd digital-library-app
```

2. **Setup Backend**
```bash
# Install dependencies
npm install

# Create .env file in root directory
echo "PORT=5000" > .env
echo "MONGODB_URI=mongodb://localhost:27017/digital-library" >> .env
echo "JWT_SECRET=your_secure_jwt_secret_key_here" >> .env
echo "NODE_ENV=development" >> .env

# Make sure MongoDB is running, then start server
npm run server
```

3. **Setup Frontend**
```bash
# In a new terminal
cd client
npm install
npm start
```

The app will open at `http://localhost:3000`

## Project Structure

```
digital-library-app/
├── server/
│   ├── models/
│   │   ├── User.js
│   │   └── Book.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── books.js
│   │   ├── shelves.js
│   │   ├── themes.js
│   │   └── users.js
│   ├── middleware/
│   │   └── auth.js
│   └── server.js
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.js
│   │   │   ├── Bookshelf.js
│   │   │   ├── BookItem.js
│   │   │   ├── BookDetail.js
│   │   │   ├── AddBookModal.js
│   │   │   └── ThemeSelector.js
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   └── Library.js
│   │   ├── styles/
│   │   │   ├── Auth.css
│   │   │   ├── Header.css
│   │   │   ├── Bookshelf.css
│   │   │   ├── BookItem.css
│   │   │   ├── BookDetail.css
│   │   │   ├── AddBookModal.css
│   │   │   ├── ThemeSelector.css
│   │   │   └── Library.css
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
├── package.json
└── .env.example
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires token)

### Books
- `GET /api/books` - Get all books for user
- `GET /api/books/:id` - Get single book
- `POST /api/books` - Add new book
- `PUT /api/books/:id` - Update book
- `DELETE /api/books/:id` - Delete book
- `GET /api/books/search/:query` - Search books

### Shelves
- `GET /api/shelves` - Get all shelves with counts
- `GET /api/shelves/:shelf` - Get books on specific shelf
- `PUT /api/shelves/:shelf/:bookId/position` - Update book position

### Themes
- `GET /api/themes` - Get current theme settings
- `PUT /api/themes/current/:theme` - Change theme
- `PUT /api/themes/settings` - Update theme settings

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `PUT /api/users/settings` - Update library settings

## Theme Details

### Dark Academia 🌙
- **Colors:** Forest green, dark brown, burgundy, black, deep navy, muted gold
- **Atmosphere:** Dark, intellectual, mysterious, romantic, slightly old-fashioned
- **Shelves:** Dark wooden shelves with subtle shadows
- **Lighting:** Warm candlelight or lamp lighting
- **Books:** Sophisticated dark covers in forest green, burgundy, brown

### Light Academia ☀️
- **Colors:** Cream, ivory, soft beige, pale blue, sage green, dusty pink
- **Atmosphere:** Soft, peaceful, bright, clean, gentle
- **Shelves:** Light pale wood, airy feeling
- **Lighting:** Soft natural sunlight
- **Books:** Delicate, light-colored covers

### Romantic Academia 🌹
- **Colors:** Dusty rose, burgundy, mauve, cream, warm brown, muted pink, soft red
- **Atmosphere:** Poetic, vintage, elegant, romantic
- **Shelves:** Antique-looking wooden shelves
- **Details:** Flowers, subtle decorative elements
- **Lighting:** Warm ambient lighting
- **Books:** Romantic and literary appearance

### Chaotic Academia 🎨
- **Colors:** Neutral base with random pops of color
- **Atmosphere:** Intentionally messy, eccentric, creative, unpredictable
- **Books:** Leaning at angles, stacked horizontally, partially pulled out
- **Details:** Papers, bookmarks sticking out
- **Arrangement:** Casual, playful, visually appealing chaos

## Usage Guide

### Adding a Book
1. Click "Add Book" button in the header
2. Fill in title, author, genre, and optionally cover image URL
3. Choose which shelf to place it on
4. Click "Add Book" to save

### Viewing Book Details
1. Hover over any book to see it lift forward
2. Click on a book to pull it out and view full details
3. See cover image, author, genre, reading status, and your notes

### Rating & Notes
1. Open a book's details
2. Click "Edit" to modify
3. Click stars to rate (1-5)
4. Add personal notes in the text area
5. Add tags for organization
6. Click "Save Changes"

### Changing Themes
1. Click "Themes" button in header
2. Select from 4 available themes
3. Library instantly transforms with new colors and atmosphere

### Searching
1. Use search bar in header
2. Search by book title, author name, or tags
3. Clear search to see all books again

## Customization

You can customize:
- Shelf styles (wood types, materials)
- Lighting (candlelight, natural, lamp, ambient)
- Book arrangement (organized, chaotic, mixed)
- Whether atmospheric effects are enabled
- Default sorting preference
- Items per shelf

## Development

### Run Both Frontend & Backend
```bash
npm run dev
```
This runs both servers concurrently (requires concurrently package)

### Backend Only
```bash
npm run server
```

### Frontend Only
```bash
cd client
npm start
```

## Database Schema

### User Model
```javascript
{
  username: String (unique),
  email: String (unique),
  password: String (hashed),
  currentTheme: String,
  themeSettings: {
    shelfStyle: String,
    lightingStyle: String,
    atmospherics: Boolean,
    bookArrangement: String
  },
  librarySettings: {
    defaultSort: String,
    itemsPerShelf: Number,
    backgroundColor: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Book Model
```javascript
{
  userId: ObjectId (ref: User),
  title: String (required),
  author: String (required),
  genre: String,
  coverImage: String,
  description: String,
  status: String (To Be Read, Currently Reading, Finished, Did Not Finish, Re-reading),
  rating: Number (0-5),
  personalNotes: String,
  tags: [String],
  dateAdded: Date,
  dateStarted: Date,
  dateFinished: Date,
  shelf: String,
  position: Number,
  visibility: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running locally or update MONGODB_URI in .env
- Check if port 27017 is available

### Books Not Loading
- Check browser console for API errors
- Verify JWT token is valid
- Check backend server is running on port 5000

### Styling Issues
- Clear browser cache
- Restart frontend development server
- Check CSS files are properly loaded

### Search Not Working
- Ensure backend server is running
- Check books have proper title/author/tags
- Try refreshing the page

## Future Enhancements

- 📊 Reading statistics and analytics
- 🔐 Social features (share libraries, reviews)
- 📱 Mobile app version
- 🌐 Cloud sync across devices
- 📥 Import books from Goodreads
- 🎯 Reading goals and challenges
- 🎵 Ambient music/sounds for themes
- 📸 Photo uploads for custom covers
- 👥 Multi-user libraries/families
- 📅 Reading schedule/calendar

## License

MIT License - feel free to use this project for personal or commercial use

## Support

For issues or feature requests, please open an issue on GitHub.

---

**Created with ❤️ for book lovers**
