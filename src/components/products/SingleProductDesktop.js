import React, { useState } from 'react';
import { Stack, Snackbar, Alert, CircularProgress, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FitScreenIcon from '@mui/icons-material/FitScreen';
import { Product, ProductActionButton, ProductActionsWrapper, ProductAddToCart, ProductFavButton, ProductImage } from '../../styles/productsStyles';
import ProductMeta from "./ProductMeta";
import useDialogModal from '../../hooks/useDialogModel';
import ProductDetail from '../productDetails';
import { useCart } from './CartContext';
import { useFavorites } from '../pages/FavoritesContext';
import { useUser } from '../pages/UserContext';

const formatPrice = (price) => `₹${price}`;

const SingleProductDesktop = ({ product, matches }) => {
  const [ProductDetailDialog, showProductDetailDialog] = useDialogModal(ProductDetail);
  const { addToCart, removeFromCart, cart } = useCart();
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const { user } = useUser();

  const inCart = cart.some((item) => item.id === product.id);
  const isFav = favorites.some((item) => item.id === product.id);

  const [showOptions, setShowOptions] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); 
  const [loading, setLoading] = useState(false);
  const [iconLoading, setIconLoading] = useState(false); // New state for icon loading

  const handleMouseEnter = () => {
    setShowOptions(true);
  };

  const handleMouseLeave = () => {
    setShowOptions(false);
  };

  const handleFavoriteClick = () => {
    if (!user) {
      setSnackbarMessage('You need to login to add items to favorites.');
      setSnackbarSeverity('warning'); 
      setOpenSnackbar(true);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      if (isFav) {
        removeFromFavorites(product.id);
        setSnackbarMessage('Removed from Favorites');
        setSnackbarSeverity('warning'); 
      } else {
        addToFavorites(product);
        setSnackbarMessage('Added to Favorites');
        setSnackbarSeverity('success');
      }
      setLoading(false);
      setOpenSnackbar(true);
    }, 500); 
  };

  const handleCartClick = () => {
    if (!user) {
      setSnackbarMessage('You need to login to add items to the cart.');
      setSnackbarSeverity('warning'); 
      setOpenSnackbar(true);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      if (inCart) {
        removeFromCart(product.id);
        setSnackbarMessage('Removed from Cart');
        setSnackbarSeverity('warning');
      } else {
        addToCart(product);
        setSnackbarMessage('Added to Cart');
        setSnackbarSeverity('success'); 
      }
      setLoading(false);
      setOpenSnackbar(true);
    }, 500); 
  };

  const handleIconClick = () => {
    setIconLoading(true); // Start loading
    setTimeout(() => {
      setIconLoading(false); // End loading
      showProductDetailDialog();
    }, 500); // Simulate a loading delay
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <Box >
        <Product onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <ProductImage src={product.image} onClick={handleIconClick} />
          {(showOptions || matches) && (
            <ProductFavButton isFav={isFav} onClick={handleFavoriteClick}>
              <FavoriteIcon color={isFav ? "error" : "inherit"} />
            </ProductFavButton>
          )}
          {(showOptions || matches) && (
            <ProductAddToCart
              variant="contained"
              onClick={handleCartClick}
              show={showOptions}
            >
              {inCart ? 'Remove from Cart' : 'Add to Cart'}
            </ProductAddToCart>
          )}
          <ProductActionsWrapper show={showOptions || matches}>
            <Stack direction={matches ? "row" : "column"}>
              <ProductActionButton onClick={handleIconClick}>
                {iconLoading ? <CircularProgress size={24} /> : <FitScreenIcon color="primary" />}
              </ProductActionButton>
            </Stack>
          </ProductActionsWrapper>
        </Product>

        {/* Loading Indicator */}
        {loading && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.7)', 
              zIndex: 10, 
            }}
          >
            <CircularProgress size={48} />
          </Box>
        )}
      </Box>

      <ProductMeta product={{ ...product, price: formatPrice(product.price) }} matches={matches} />
      <ProductDetailDialog product={product} />

      {/* Snackbar for showing messages */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SingleProductDesktop;
