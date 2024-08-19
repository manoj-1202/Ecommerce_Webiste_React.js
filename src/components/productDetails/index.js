// components/products/ProductDetail.js

import React, { useState } from 'react';
import { Dialog, DialogTitle, Slide, Box, IconButton, DialogContent, Typography, Button, Snackbar, Alert } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Colors } from "../../styles/theme"; 
import styled from "@emotion/styled";
import { Product, ProductImage } from "../../styles/productsStyles"; 
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import { useCart } from '../products/CartContext';

function SlideTransition(props) {
  return <Slide direction="down" {...props} />;
}

const ProductDetailWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  padding: theme.spacing(4),
}));

const ProductDetailInfoWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  maxWidth: 500,
  lineHeight: 1.5,
}));

export default function ProductDetail({ open, onClose, product }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const { cart, addToCart, removeFromCart } = useCart();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const isInCart = cart.some((item) => item.id === product.id); 

  const handleAddToCart = () => {
    addToCart(product);
    setSnackbarMessage('Item Added To The Cart!');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(product.id); 
    setSnackbarMessage('Item Removed from the Cart!');
    setSnackbarSeverity('warning');
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };



  return (
    <>
      <Dialog
        TransitionComponent={SlideTransition}
        open={open}
        fullScreen
        onClose={onClose}
      >
        <DialogTitle
          sx={{
            background: Colors.secondary,
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h6">{product.name}</Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <ProductDetailWrapper display={matches ? "column" : "row"}>
            <Product sx={{ mr: 4 }}>
              <ProductImage
                style={{
                  maxWidth: '600px'
                }}
                src={product.image}
                alt={product.name}
              />
            </Product>
            <ProductDetailInfoWrapper>
              <Typography variant="subtitle2">Availability: In Stock</Typography>
              <Typography textTransform="uppercase" sx={{ lineHeight: 2 }} variant="h4">
                {product.name}
              </Typography>
              <Typography variant="body1">
                {product.description}
              </Typography>
              <Box
                sx={{ mt: 4, minWidth: matches ? '200px' : '400px' }}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                {isInCart ? (
                  <Button variant="contained" color="secondary" onClick={handleRemoveFromCart}>
                    Remove from Cart
                  </Button>
                ) : (
                  <Button variant="contained" onClick={handleAddToCart}>
                    Add to Cart
                  </Button>
                )}
              </Box>
            </ProductDetailInfoWrapper>
          </ProductDetailWrapper>
        </DialogContent>
      </Dialog>

      {/* Snackbar for messages */}
      <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={handleCloseSnackbar}
      anchorOrigin={{ vertical: 'center', horizontal: 'center' }}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
