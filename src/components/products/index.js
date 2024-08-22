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
    // Implement remove from cart functionality here
  };

  return (
    <Container >
      <ProductTitle>
        The Products
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
        spacing={{  sm: 3, md: 0 }}
        justifyContent="center"
        alignItems="center"
      >
        {filteredProducts.map((product) => (
          <Grid
            item 
            sm={6}   
            md={4} 
            lg={4}  
            key={product.id}
            
          >
            {matches ? (
              <SingleProduct
                product={product}
                matches={matches}
                onAddToCart={() => handleAddToCart(product)}
                onRemoveFromCart={() => handleRemoveFromCart(product)}
              />
            ) : (
              <SingleProductDesktop
                product={product}
                matches={matches}
                onAddToCart={() => handleAddToCart(product)}
                onRemoveFromCart={() => handleRemoveFromCart(product)}
              />
            )}
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Products;
