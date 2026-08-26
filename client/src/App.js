import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Library from './pages/Library';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [currentTheme, setCurrentTheme] = useState('darkAcademia');
  const [themeSettings, setThemeSettings] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchTheme();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const fetchTheme = async () => {
    try {
      const response = await axios.get('/api/themes');
      setCurrentTheme(response.data.currentTheme);
      setThemeSettings(response.data.themeSettings);
    } catch (error) {
      console.error('Error fetching theme:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setIsAuthenticated(false);
  };

  if (loading && isAuthenticated) {
    return <div className="loading-screen">Loading your library...</div>;
  }

  return (
    <Router>
      <div className={`app theme-${currentTheme}`}>
        <Routes>
          <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} />
          <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <Register onRegister={handleLogin} />} />
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Library
                  currentTheme={currentTheme}
                  setCurrentTheme={setCurrentTheme}
                  themeSettings={themeSettings}
                  setThemeSettings={setThemeSettings}
                  onLogout={handleLogout}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
      <ToastContainer position="bottom-right" />
    </Router>
  );
}

export default App;
