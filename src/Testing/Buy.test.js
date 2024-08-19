import { BrowserRouter } from "react-router-dom";
import { CartProvider } from '../components/products/CartContext';
import BuyNow from "../components/pages/BuyNow";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from '@mui/material';
import theme from '../styles/theme';
import { useNavigate } from 'react-router-dom';

// Mock the useCart hook and CartProvider
jest.mock('../components/products/CartContext', () => ({
    CartProvider: ({ children }) => <div>{children}</div>,
    useCart: () => ({
        cart: [{ id: '1', name: 'Test Product', price: 100, quantity: 1, image: 'test.jpg', description: 'Test Description' }], 
        getTotalAmount: () => 100,
    })
}));

// Mock useNavigate
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

// Test to check if button click triggers navigation
test('navigates to payment page on button click', () => {
    const navigate = jest.fn(); 
    useNavigate.mockReturnValue(navigate); 

    render(
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <CartProvider>
                    <BuyNow />
                </CartProvider>
            </ThemeProvider>
        </BrowserRouter>
    );

    const button = screen.getByText(/Buy Now/i);
    fireEvent.click(button);
    expect(navigate).toHaveBeenCalledWith('/payment', expect.any(Object)); 
});

test('renders BuyNow component without crashing', () => {
    render(
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <CartProvider>
                    <BuyNow />
                </CartProvider>
            </ThemeProvider>
        </BrowserRouter>
    );

    const button = screen.getByText(/Buy Now/i);
    expect(button).toBeInTheDocument();
});
