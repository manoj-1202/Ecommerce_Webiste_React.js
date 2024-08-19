import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignUp from '../components/pages/SignUp';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';

describe('SignUp Component', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  test('renders SignUp form', () => {
    render(
      <Router>
        <SignUp />
      </Router>
    );

    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign Up/i })).toBeInTheDocument();
  });

  test('shows error when user already exists', async () => {
    // Set up an existing user in localStorage
    const users = [{ email: 'existing@example.com', password: 'password123' }];
    localStorage.setItem('users', JSON.stringify(users));

    render(
      <Router>
        <SignUp />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'existing@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));

    await waitFor(() => {
      expect(screen.getByText(/User with this email already exists/i)).toBeInTheDocument();
    });
  });

  test('signs up new user successfully', async () => {
    render(
      <Router>
        <SignUp />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));

    await waitFor(() => {
      expect(screen.getByText(/Sign up successful/i)).toBeInTheDocument();
    });

    // Check that the user is added to localStorage
    const users = JSON.parse(localStorage.getItem('users'));
    expect(users).toHaveLength(1);
    expect(users[0].email).toBe('john.doe@example.com');
  });
});
