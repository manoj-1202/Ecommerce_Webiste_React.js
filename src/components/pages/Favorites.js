import React, { useState } from 'react';
import { Container, Typography, Grid, Snackbar, Alert, CircularProgress } from '@mui/material';
import { useFavorites } from './FavoritesContext'; 
import { Product, ProductImage, RemoveButton, Cart, ButtonContainer } from '../../styles/productsStyles/favoriteStyles';
import ProductMeta from '../products/ProductMeta';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../products/CartContext';

const formatPrice = (price) => `₹${price}`;

const Favorites = () => {
  const { favorites, removeFromFavorites } = useFavorites();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleRemoveFromFavorites = (product) => {
    setLoading(true);
    setTimeout(() => {
      removeFromFavorites(product.id);
      setSnackbarMessage('Removed from Favorites');
      setLoading(false);
      setOpenSnackbar(true);
    }, 500); // Simulating an API call
  };

  const handleAddToCart = (product) => {
    setLoading(true);
    setTimeout(() => {
      addToCart(product); 
      setSnackbarMessage('Added to Cart');
      setLoading(false);
      setOpenSnackbar(true);
      navigate('/cart');
    }, 500); // Simulating an API call
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container sx={{ marginBottom: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Your Favorites
      </Typography>
      {favorites.length > 0 ? (
        <Grid container spacing={2}>
          {favorites.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <Product>
                <ProductImage src={product.image} alt={product.name} />
                <ProductMeta product={{ ...product, price: formatPrice(product.price) }} />
                <ButtonContainer>
                  <RemoveButton
                    variant="contained"
                    onClick={() => handleRemoveFromFavorites(product)}
                  >
                    Remove
                  </RemoveButton>
                  <Cart
                    variant="contained"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add To Cart
                  </Cart>
                </ButtonContainer>
              </Product>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h6" align="center">
          No favorite products.
        </Typography>
      )}

      {/* Snackbar for showing messages */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* Loading Indicator */}
      {loading && (
        <CircularProgress
          size={24}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginLeft: '-12px',
            marginTop: '-12px',
          }}
        />
      )}
    </Container>
  );
};

export default Favorites;
