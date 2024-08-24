import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import Appbar from './components/appbar';
import Footer from './components/Footer';
import AppDrawer from './components/drawer';
import { UIProvider } from './components/context/ui';
import SearchBox from './components/search';
import theme from './styles/theme';
import Home from './components/pages/Home';
import ProductPage from './components/pages/ProductPage';
import ContactUs from './components/pages/ContactUs';
import Cart from './components/pages/Cart';
import Favorites from './components/pages/Favorites';
import User from './components/pages/SignUp';
import SignUp from './components/pages/SignUp'; 
import Login from './components/pages/Login'; 
import BuyNow from './components/pages/BuyNow';
import Payment from './components/pages/Payment';
import { FavoritesProvider } from './components/pages/FavoritesContext';
import { CartProvider } from './components/products/CartContext';
import { UserProvider } from './components/pages/UserContext'; 
import OrderDetails from './components/pages/OrderDetails';
import Success from './components/pages/Success';



function App() {
 
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <UIProvider>
          <UserProvider>
            <CartProvider>
              <FavoritesProvider>
                  <Appbar />
                  <SearchBox />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<ProductPage />} />
                    <Route path="/contact-us" element={<ContactUs />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/user" element={<User />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/buynow" element={<BuyNow />} />
                    <Route path="/payment" element={<Payment />} />
                    <Route path="/Success" element={<Success />} />
                    <Route path="/transation" element={<OrderDetails/>}/>

                  </Routes>
                  <Footer />
                  <AppDrawer />
              </FavoritesProvider>
            </CartProvider>
          </UserProvider>
        </UIProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
