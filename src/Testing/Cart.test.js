import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Cart from '../components/pages/Cart';
import { CartProvider } from '../components/products/CartContext';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import { useUser } from '../components/pages/UserContext';

// Mock the useUser hook
jest.mock('../components/pages/UserContext', () => ({
  useUser: jest.fn(),
}));

const MockCartProvider = ({ children }) => {
  const mockCartValue = {
    cartItems: [
      { id: '1', name: 'Sample Product', quantity: 1, totalAmount: 100 }
    ]
  };

  return (
    <CartProvider value={mockCartValue}>
      {children}
    </CartProvider>
  );
};

describe('Cart Component', () => {
  test('should display product added to the cart', async () => {
    const mockUser = { email: 'test@example.com' };
    useUser.mockReturnValue({ user: mockUser });

    render(
      <Router>
        <MockCartProvider>
          <Cart />
        </MockCartProvider>
      </Router>
    );

    // Debug output to verify rendering
    screen.debug();

   
  });
});
