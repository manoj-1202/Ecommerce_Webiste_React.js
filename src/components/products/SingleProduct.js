import React, { useState } from 'react';
import { Stack, Snackbar, Alert, CircularProgress } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FitScreenIcon from '@mui/icons-material/FitScreen';
import { Product, ProductActionButton, ProductActionsWrapper, ProductAddToCart, ProductFavButton, ProductImage } from '../../styles/productsStyles';
import ProductMeta from "./ProductMeta";
import useDialogModal from '../../hooks/useDialogModel';
import ProductDetail from '../productDetails';
import { useCart } from './CartContext';
import { useFavorites } from '../pages/FavoritesContext';

const formatPrice = (price) => `₹${price}`;

const SingleProduct = ({ product, matches }) => {
  const [ProductDetailDialog, showProductDetailDialog] = useDialogModal(ProductDetail);
  const { addToCart, removeFromCart, cart } = useCart();
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const inCart = cart.some((item) => item.id === product.id);
  const isFav = favorites.some((item) => item.id === product.id);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFavoriteClick = () => {
    setLoading(true);
    setTimeout(() => {
      if (isFav) {
        removeFromFavorites(product.id);
        setSnackbarMessage('Removed from Favorites');
      } else {
        addToFavorites(product);
        setSnackbarMessage('Added to Favorites');
      }
      setLoading(false);
      setOpenSnackbar(true);
    }, 500); // Simulating an API call
  };

  const handleCartClick = () => {
    setLoading(true);
    setTimeout(() => {
      if (inCart) {
        removeFromCart(product.id);
        setSnackbarMessage('Removed from Cart');
      } else {
        addToCart(product);
        setSnackbarMessage('Added to Cart');
      }
      setLoading(false);
      setOpenSnackbar(true);
    }, 500); // Simulating an API call
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <Product>
        <ProductImage src={product.image} />
        <ProductMeta product={{ ...product, price: formatPrice(product.price) }} matches={matches} />
        <ProductActionsWrapper>
          <Stack direction="row">
            <ProductFavButton isFav={isFav} onClick={handleFavoriteClick}>
              <FavoriteIcon color={isFav ? "error" : "inherit"} />
            </ProductFavButton>

            <ProductActionButton onClick={() => showProductDetailDialog()}>
              <FitScreenIcon color="primary" />
            </ProductActionButton>
          </Stack>
        </ProductActionsWrapper>
        <ProductAddToCart
          variant="contained"
          onClick={handleCartClick}
        >
          {inCart ? 'Remove from Cart' : 'Add to Cart'}
        </ProductAddToCart>
      </Product>
      <ProductDetailDialog product={product} />

      {/* Snackbar for showing messages */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
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
          size={30}
          sx={{
            position: 'absolute',
            top: '80%',
            left: '50%',
            marginLeft: '-12px',
            marginTop: '-12px',
          }}
        />
      )}
    </>
  );
};

export default SingleProduct;
