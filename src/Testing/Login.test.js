// Login.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../components/pages/Login';
import { useUser } from '../components/pages/UserContext';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('../components/pages/UserContext', () => ({
  useUser: jest.fn(),
}));

const mockLogin = jest.fn();

describe('Login Component', () => {
  beforeEach(() => {
    useUser.mockReturnValue({ login: mockLogin });
    // Setup initial localStorage state
    localStorage.setItem('users', JSON.stringify([{ id: '1', email: 'test@example.com', password: 'password' }]));
    localStorage.setItem('currentUser', null);
    sessionStorage.clear();
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test('displays an error message with invalid credentials', async () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'wrong@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid email or password/i)).toBeInTheDocument();
    });
  });

  test('logs in successfully with correct credentials', async () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    // Check if the login function was called with the correct user data
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        id: '1',
        email: 'test@example.com',
        password: 'password',
        token: 'dGVzdEBleGFtcGxlLmNvbTpwYXNzd29yZA==', // Base64 encoded email:password
      });
    });

    // Check if the snackbar message appears
    expect(screen.getByText(/login successful/i)).toBeInTheDocument();
  });
});
