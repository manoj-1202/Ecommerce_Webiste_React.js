import React, { useState } from 'react';
import { useTheme } from '@emotion/react';
import { useMediaQuery, InputAdornment, TextField, Container, Grid } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { products } from '../../data';
import SingleProduct from './SingleProduct';
import SingleProductDesktop from './SingleProductDesktop';
import { useCart } from './CartContext';
import { ProductTitle } from '../../styles/productsStyles';

const Products = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const { addToCart } = useCart();

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = (product) => {
    addToCart(product.id);
   
  };

  const handleRemoveFromCart = (product) => {
    
  };

  const renderProducts = filteredProducts.map(product => (
    <Grid item key={product.id} xs={2} sm={4} md={4} display="flex" flexDirection={'column'} alignItems="center">
      {matches ? (
        <SingleProduct product={product} matches={matches} onAddToCart={() => handleAddToCart(product)} onRemoveFromCart={() => handleRemoveFromCart(product)} />
      ) : (
        <SingleProductDesktop product={product} matches={matches} onAddToCart={() => handleAddToCart(product)} onRemoveFromCart={() => handleRemoveFromCart(product)} />
      )}
    </Grid>
  ));

  return (
    <Container>
      <ProductTitle>
        Products
      </ProductTitle>

      <TextField
        placeholder="Search products..."
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        justifyContent="center"
        sx={{ margin: `20px 4px 10px 4px` }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {renderProducts}
      </Grid>
    </Container>
  );
};

export default Products;
