import React, { useState } from 'react';
import { useCart } from '../products/CartContext';
import { Container, Typography, Grid, Snackbar, Alert, CircularProgress } from '@mui/material';
import { CartProduct, ProductImage, CartQuantityBox, CartButton, RemoveButton, TotalAmountContainer, TotalAmountText, BuyNow } from '../../styles/productsStyles/cartStyles';
import ProductMeta from '../products/ProductMeta';
import { useNavigate } from 'react-router-dom';

const formatPrice = (price) => `₹${price}`;

const Cart = () => {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart, getTotalAmount } = useCart();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleIncreaseQuantity = (productId) => {
    increaseQuantity(productId);
  };

  const handleDecreaseQuantity = (productId) => {
    decreaseQuantity(productId);
  };

  const handleRemoveFromCart = (productId) => {
    setLoading(true);
    setTimeout(() => {
      removeFromCart(productId);
      setSnackbarMessage('Removed from Cart');
      setLoading(false);
      setOpenSnackbar(true);
    }, 500); // Simulating an API call
  };

  const handleBuyNow = () => {
    setOrderLoading(true);
    setTimeout(() => {
      // Simulate order processing
      navigate('/buynow');
      setOrderLoading(false);
    }, 1500); // Simulating an API call delay
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container sx={{ marginBottom: 1, position: 'relative' }}>
      <Typography variant="h4" gutterBottom align="center" sx={{marginTop:"25px",fontWeight:"bold"}}>
        Your Cart
      </Typography>
      {cart.length > 0 ? (
        <>
          <Grid container spacing={1}>
            {cart.map((product) => (
              <Grid item xs={12} sm={6} md={3} key={product.id}>
                <CartProduct>
                  <ProductImage src={product.image} alt={product.name} />
                  <ProductMeta product={{ ...product, price: formatPrice(product.price) }} />
                  <CartQuantityBox>
                    <CartButton
                      variant="contained"
                      color="success"
                      onClick={() => handleDecreaseQuantity(product.id)}
                    >
                      Less
                    </CartButton>
                    <Typography variant="body2" sx={{  textAlign: 'center',marginX: 0}}>
                      Quantity: {product.quantity}
                    </Typography>
                    <CartButton
                      variant="contained"
                      color="success"
                      onClick={() => handleIncreaseQuantity(product.id)}
                    >
                      Add
                    </CartButton>
                  </CartQuantityBox>
                  <RemoveButton
                    variant="contained"
                    onClick={() => handleRemoveFromCart(product.id)}
                  >
                    Remove
                  </RemoveButton>
                </CartProduct>
              </Grid>
            ))}
          </Grid>
          <TotalAmountContainer>
            <TotalAmountText variant="h5" align="center">
              Total Amount: {formatPrice(getTotalAmount())}
            </TotalAmountText>
           
            <BuyNow 
              variant="contained"
              color="primary"
              onClick={handleBuyNow}
              disabled={orderLoading} // Disable button when loading
            >
              {orderLoading ? (
        <>
          <CircularProgress size={24} color="inherit" sx={{ position: 'absolute', left: '50%', top: '50%', marginLeft: '-12px', marginTop: '-12px' }} />
          Processing...
        </>
      ) : (
        'Place Order'
      )}
    </BuyNow>
          
          </TotalAmountContainer>
        </>
      ) : (
        <Typography variant="h6" align="center">
          No items in the cart.
        </Typography>
      )}

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

export default Cart;
