import React from 'react';
import { Stack } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FitScreenIcon from '@mui/icons-material/FitScreen';
import { Product, ProductActionButton, ProductActionsWrapper, ProductAddToCart, ProductFavButton, ProductImage } from '../../styles/productsStyles';
import ProductMeta from "./ProductMeta";
import useDialogModal from '../../hooks/useDialogModel';
import ProductDetail from '../productDetails';
import { useCart } from './CartContext';
import { useFavorites } from '../pages/FavoritesContext';
import { useNavigate } from 'react-router-dom'; 

const formatPrice = (price) => `₹${price}`;

const SingleProduct = ({ product, matches }) => {
  const [ProductDetailDialog, showProductDetailDialog] = useDialogModal(ProductDetail);
  const { addToCart, removeFromCart, cart } = useCart();
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const inCart = cart.some((item) => item.id === product.id);
  const isFav = favorites.some((item) => item.id === product.id);
  const navigate = useNavigate();

  const handleFavoriteClick = () => {
    if (isFav) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
    navigate('/favorites');
  };

  const handleCartClick = () => {
    if (inCart) {
      removeFromCart(product.id);
    } else {
      addToCart(product);
    }
    navigate('/cart');
  };

  return (
    <>
      <Product>
        <ProductImage src={product.image} />
        <ProductMeta product={{ ...product, price: formatPrice(product.price) }} matches={matches} />
        <ProductActionsWrapper show={true}>
          <Stack direction="column">
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
    </>
  );
};

export default SingleProduct;
