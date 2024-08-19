import React from 'react';
import { useCart } from '../products/CartContext';
import { Container, Typography, Grid } from '@mui/material';
import { CartProduct, ProductImage, CartQuantityBox, CartButton, RemoveButton, TotalAmountContainer, TotalAmountText, BuyNow } from '../../styles/productsStyles/cartStyles';
import ProductMeta from '../products/ProductMeta';
import { useNavigate } from 'react-router-dom';

const formatPrice = (price) => `₹${price}`;

const Cart = () => {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart, getTotalAmount } = useCart();
  const navigate = useNavigate();

  const handleIncreaseQuantity = (productId) => {
    increaseQuantity(productId);
  };

  const handleDecreaseQuantity = (productId) => {
    decreaseQuantity(productId);
  };

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  const handleBuyNow = () => {
    navigate('/buynow');
  };

  return (
    <Container sx={{ marginBottom: 1 }}>
      <Typography variant="h4" gutterBottom align="center">
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
                    <Typography variant="body2" sx={{ marginX: 1 }}>
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
            <BuyNow onClick={handleBuyNow}>
              Place Order
            </BuyNow>
          </TotalAmountContainer>
        </>
      ) : (
        <Typography variant="h6" align="center">
          No items in the cart.
        </Typography>
      )}
    </Container>
  );
};

export default Cart;
