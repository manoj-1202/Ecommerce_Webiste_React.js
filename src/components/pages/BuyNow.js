import React from 'react';
import { Container, Typography, Card, CardContent, Box, Grid } from '@mui/material';
import { useCart } from '../products/CartContext';
import { useNavigate } from 'react-router-dom';
import { Euro, ShoppingCart, LocalOffer } from '@mui/icons-material';
import { ProductRow, StyledBox, StyledProductBox, StyledImage, StyledButton, StyledTypography } from '../../styles/productsStyles/buyNowStyles';

const BuyNow = () => {
  const { cart, getTotalAmount } = useCart();
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    const totalAmount = getTotalAmount();
    const orderDetails = {
      date: new Date().toLocaleDateString(),
      totalAmount,
      products: cart,
    };
    const userId = localStorage.getItem('currentUser');
    localStorage.setItem(`orderDetails-${userId}`, JSON.stringify(orderDetails));
    navigate('/payment', { state: { totalAmount } });
  };

  return (
    <Container sx={{ marginBottom: 4 }}>
      <StyledTypography variant="h4" gutterBottom align="center">
        Place Your Order
      </StyledTypography>
      {cart.length > 0 ? (
        <Card variant="outlined" sx={{ margin: 'auto', padding: '10px', maxWidth: 800, boxShadow: 3 }}>
          <CardContent>
            <ProductRow>
              {cart.map((product) => (
                <StyledProductBox key={product.id}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <StyledImage src={product.image} alt={product.name} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="h6" gutterBottom>{product.name}</Typography>
                      <Typography variant="body2" color="text.secondary">{product.description}</Typography>
                      <Box display="flex" alignItems="center" mb={1}>
                        <Euro sx={{ mr: 1 }} />
                        <Typography variant="body2" color="text.primary">Price: ₹{product.price}</Typography>
                      </Box>
                      <Box display="flex" alignItems="center" mb={1}>
                        <ShoppingCart sx={{ mr: 1 }} />
                        <Typography variant="body2" color="text.primary">Quantity: {product.quantity}</Typography>
                      </Box>
                      <Box display="flex" alignItems="center">
                        <LocalOffer sx={{ mr: 1 }} />
                        <Typography variant="body2" color="text.primary">Total: ₹{(product.price * product.quantity).toFixed(2)}</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </StyledProductBox>
              ))}
            </ProductRow>
            <StyledBox>
              <Typography variant="body1" display="flex" alignItems="center" fontWeight={"bold"}>
                Total Amount: ₹ {getTotalAmount()}
              </Typography>
              <StyledButton onClick={handlePlaceOrder}>
                Buy Now
              </StyledButton>
            </StyledBox>
          </CardContent>
        </Card>
      ) : (
        <Typography variant="h6" align="center">
          No items in the cart.
        </Typography>
      )}
    </Container>
  );
};

export default BuyNow;
