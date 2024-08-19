import React, { createContext, useContext, useState, useEffect } from 'react';
import { Alert, Snackbar } from '@mui/material';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  useEffect(() => {
    const currentUserEmail = sessionStorage.getItem('currentUser') || localStorage.getItem('currentUser');
    if (currentUserEmail) {
      const userData = JSON.parse(sessionStorage.getItem(currentUserEmail) || localStorage.getItem(currentUserEmail));
      if (userData) {
        setUser(userData);
      }
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    sessionStorage.setItem('currentUser', userData.email);
    sessionStorage.setItem(userData.email, JSON.stringify(userData));
    localStorage.setItem('currentUser', userData.email);
    localStorage.setItem(userData.email, JSON.stringify(userData));
    showAlert('Login successful!', 'success');
  };

  const logout = () => {
    const currentUserEmail = sessionStorage.getItem('currentUser') || localStorage.getItem('currentUser');
    if (currentUserEmail) {
      sessionStorage.removeItem('currentUser');
      sessionStorage.removeItem(currentUserEmail);
      localStorage.removeItem('currentUser');
      localStorage.removeItem(currentUserEmail);
    }
    setUser(null);
    showAlert('Logout successful!', 'info');
  };

  const showAlert = (message, severity = 'info') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <UserContext.Provider value={{ user, login, logout, showAlert }}>
      {children}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
