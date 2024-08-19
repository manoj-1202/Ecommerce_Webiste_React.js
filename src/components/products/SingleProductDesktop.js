import React, { useState } from 'react';
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

const SingleProductDesktop = ({ product, matches }) => {
  const [ProductDetailDialog, showProductDetailDialog] = useDialogModal(ProductDetail);
  const { addToCart, removeFromCart, cart } = useCart();
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const inCart = cart.some((item) => item.id === product.id);
  const isFav = favorites.some((item) => item.id === product.id);
  const navigate = useNavigate();

  const [showOptions, setShowOptions] = useState(false);

  const handleMouseEnter = () => {
    setShowOptions(true);
  };
  const handleMouseLeave = () => {
    setShowOptions(false);
  };

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
      <Product onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <ProductImage src={product.image} />
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
            <ProductActionButton onClick={() => showProductDetailDialog()}>
              <FitScreenIcon color="primary" />
            </ProductActionButton>
          </Stack>
        </ProductActionsWrapper>
      </Product>
      <ProductMeta product={{ ...product, price: formatPrice(product.price) }} matches={matches} />
      <ProductDetailDialog product={product} />
    </>
  );
};

export default SingleProductDesktop;
