import React, { useState } from 'react';
import { Typography, Grid, Snackbar, Alert, CircularProgress } from '@mui/material';
import { useFavorites } from './FavoritesContext'; 
import { Product, ProductImage, RemoveButton, Cart, ButtonContainer ,FavContainer} from '../../styles/productsStyles/favoriteStyles';
import ProductMeta from '../products/ProductMeta';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../products/CartContext';
import useDialogModal from '../../hooks/useDialogModel';
import ProductDetail from '../productDetails';

const formatPrice = (price) => `₹${price}`;

const Favorites = () => {
  const { favorites, removeFromFavorites } = useFavorites();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [ProductDetailDialog, showProductDetailDialog] = useDialogModal(ProductDetail);

  const handleRemoveFromFavorites = (product) => {
    setLoading(true);
    setTimeout(() => {
      removeFromFavorites(product.id);
      setSnackbarMessage('Removed from Favorites');
      setLoading(false);
      setOpenSnackbar(true);
    }, 500);
  };

  const handleAddToCart = (product) => {
    setLoading(true);
    setTimeout(() => {
      addToCart(product); 
      setSnackbarMessage('Added to Cart');
      setLoading(false);
      setOpenSnackbar(true);
      navigate('/cart');
    }, 500);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleIconClick = () => {
    
    setTimeout(() => {
     
      showProductDetailDialog();
    }, 500); 
  };

  return (
    <FavContainer sx={{ marginBottom: 1, position: 'relative' }}>
      <Typography variant="h4" gutterBottom align="center" sx={{marginTop:"25px",fontWeight:"bold"}}>
        Your Favorites
      </Typography>
      {favorites.length > 0 ? (
  <Grid
    container
    spacing={2}
    sx={{
      justifyContent: favorites.length === 1 ? 'center' : 'flex-start', // Center if only one product
    }}
  >
    {favorites.map((product, index) => (
      <Grid
        item
        xs={12}
        sm={6}
        md={3}
        key={product.id}
        sx={{
          display: 'flex',
          justifyContent: index === 0 && favorites.length === 1 ? 'center' : 'flex-start', // Center the first item if it's the only one
        }}
      >
        <Product>
          <ProductImage src={product.image} alt={product.name} onClick={handleIconClick}/>
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
        <ProductDetailDialog product={product} />
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
        autoHideDuration={1000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
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
    </FavContainer>
  );
};

export default Favorites;
