import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import { create } from 'react-test-renderer';
import { ThemeProvider } from '@mui/material';
import theme from './styles/theme';
import Banner from './components/banner';
import BuyNow from "./components/pages/BuyNow";
import Cart from './components/pages/Cart';
import ContactUs from './components/pages/ContactUs';
import Footer from "./components/Footer";
import Login from './components/pages/Login';
import PaymentOptions from './components/pages/Payment';
import SignUp from './components/pages/SignUp';
import OrderCard from "./components/pages/OrderDetails";
import { useNavigate } from 'react-router-dom';
import { CartProvider } from './components/products/CartContext';
import { useUser } from './components/pages/UserContext';

// Mock useNavigate
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

// Mock the useCart hook and CartProvider
jest.mock('./components/products/CartContext', () => ({
    CartProvider: ({ children }) => <div>{children}</div>,
    useCart: () => ({
        cart: [{ id: '1', name: 'Test Product', price: 100, quantity: 1, image: 'test.jpg', description: 'Test Description' }],
        getTotalAmount: () => 100,
    })
}));

// Mock the useUser hook
jest.mock('./components/pages/UserContext', () => ({
    useUser: jest.fn(),
}));

// Mock useNavigate
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

describe('App Component Tests', () => {

    // Test for Banner component
    test('renders Banner component without crashing', () => {
        render(
            <Router>
                <Banner />
            </Router>
        );
    });

    test('matches snapshot for Banner component', () => {
        const component = create(
            <Router>
                <Banner />
            </Router>
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('navigates to products page on button click in Banner', () => {
        const navigate = jest.fn(); 
        useNavigate.mockReturnValue(navigate); 

        render(
            <Router>
                <Banner />
            </Router>
        );

        const button = screen.getByText(/Shop Now/i);
        fireEvent.click(button);
        expect(navigate).toHaveBeenCalledWith('/products');
    });

    // Test for BuyNow component
    test('navigates to payment page on button click in BuyNow', () => {
        const navigate = jest.fn(); 
        useNavigate.mockReturnValue(navigate); 

        render(
            <Router>
                <ThemeProvider theme={theme}>
                    <CartProvider>
                        <BuyNow />
                    </CartProvider>
                </ThemeProvider>
            </Router>
        );

        const button = screen.getByText(/Buy Now/i);
        fireEvent.click(button);
        expect(navigate).toHaveBeenCalledWith('/payment', expect.any(Object)); 
    });

    jest.mock('@mui/system', () => ({
        ...jest.requireActual('@mui/system'),
        useTheme: () => ({
          spacing: jest.fn().mockImplementation((factor) => factor * 8),
        }),
      }));
      

    test('renders BuyNow component without crashing', () => {
        render(
            <Router>
                <ThemeProvider theme={theme}>
                    <CartProvider>
                        <BuyNow />
                    </CartProvider>
                </ThemeProvider>
            </Router>
        );

        const button = screen.getByText(/Buy Now/i);
        expect(button).toBeInTheDocument();
    });

    // Test for Cart component
    jest.mock('./components/pages/UserContext', () => ({
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
                <ThemeProvider theme={theme}>
              <MockCartProvider>
                <Cart />
                
              </MockCartProvider>
              </ThemeProvider>
            </Router>
          );
      
          // Debug output to verify rendering
          screen.debug();
      
         
        });
      });
      
      
                       // Test for ContactUs component
    test('renders ContactUs component without crashing', () => {
        useUser.mockReturnValue({
            user: { id: 'testUser', name: 'Test User', email: 'test@example.com' }
        });

        render(
            <Router>
                <ContactUs />
            </Router>
        );
        
 fireEvent.change(screen.getByLabelText(/Your Name/i), { target: { value: 'John Doe' } });
 fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'john@example.com' } });
 fireEvent.change(screen.getByLabelText(/Feedback/i), { target: { value: 'Great service!' } });

 expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
 
    });

                          // Test for Footer component
    test('renders Footer component without crashing', () => {
        render(
            <Router>
                <Footer />
            </Router>
        );
    });



                       // Test for Login component

    jest.mock('./components/pages/UserContext', () => ({
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
    
      

  
                          // Test for SignUp component

    
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




                  // Test for OrderCard component
    test('renders OrderCard component without crashing', () => {
        render(
            <Router>
                <ThemeProvider theme={theme}>
                    <OrderCard />
                </ThemeProvider>
            </Router>
        );
    });
});
  

  // Test for PaymentOptions component
  test('renders PaymentOptions component without crashing', () => {
    render(
        <Router>
            <PaymentOptions />
        </Router>
    );
});
