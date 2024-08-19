import React, { createContext, useContext, useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useUser } from '../../components/pages/UserContext';

const FavoritesContext = createContext();


export const FavoritesProvider = ({ children }) => {
  const { user } = useUser();
  const [favorites, setFavorites] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  useEffect(() => {
    if (user) {
      const storedFavorites = JSON.parse(localStorage.getItem(`${user.email}-favorites`)) || [];
      setFavorites(storedFavorites);
    } else {
      setFavorites([]);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`${user.email}-favorites`, JSON.stringify(favorites));
    }
  }, [favorites, user]);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const showSnackbar = (message, severity = 'info') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const addToFavorites = (product) => {
    if (!user) {
      showSnackbar('You need to login to add items to the favorites.', 'warning');
      return;
    }

    setFavorites((prevFavorites) => {
      if (!prevFavorites.find((item) => item.id === product.id)) {
        return [...prevFavorites, product];
      }
      return prevFavorites;
    });
  };

  const removeFromFavorites = (productId) => {
    setFavorites((prevFavorites) => prevFavorites.filter((product) => product.id !== productId));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
      {children}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
