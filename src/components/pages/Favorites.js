import React from 'react';
import { Container, Typography, Grid } from '@mui/material';
import { useFavorites } from './FavoritesContext'; 
import { Product, ProductImage, RemoveButton, Cart,ButtonContainer } from '../../styles/productsStyles/favoriteStyles';
import ProductMeta from '../products/ProductMeta';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../products/CartContext';


const Favorites = () => {
  const { favorites, removeFromFavorites } = useFavorites();
  const { addToCart } = useCart();
  const navigate = useNavigate();


  const handleRemoveFromFavorites = (product) => {
    removeFromFavorites(product.id);
  };

  const handleAddToCart = (product) => {
    addToCart(product); 
    navigate('/cart'); 
  };

  const formatPrice = (price) => `₹${price}`;

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
                <Cart onClick={() => handleAddToCart(product)}>
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
    </Container>
  );
};

export default Favorites;
