// components/products/ProductDetail.js

import React, { useState } from 'react';
import { Dialog, DialogTitle, Slide, Box, IconButton, DialogContent, Typography, Button, Snackbar, Alert } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Colors } from "../../styles/theme"; 
import styled from "@emotion/styled";
import {  ProductDetailImage} from "../../styles/productsStyles"; 
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import { useCart } from '../products/CartContext';

function SlideTransition(props) {
  return <Slide direction="down" {...props} />;
}
const Product = styled(Box)(({ theme }) => ({
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  width: "25%",
  height: "170px",
  marginRight:"20px",
  
  [theme.breakpoints.down("sm")]: {
    display:"flex",
   justifyContent:"center",
   alignItems:"center",
    width:"200px",
    height:"180px",
    marginTop:"10px"
    
  },
  
}));

const ProductDetailWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  padding: theme.spacing(4),
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center",
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
  },
}));

const ProductDetailInfoWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  maxWidth: 500,
  lineHeight: 1.5,
 
  [theme.breakpoints.down("md")]: {
    maxWidth: '100%',
    textAlign: 'start',
    alignItems: 'start',
  },
}));

const BulletText = styled(Typography)(({ theme }) => ({
  position: 'relative',
  paddingLeft: theme.spacing(2), 
  '&::before': {
    content: '"•"', 
    position: 'absolute',
    left: 0,
    top: 0,
  },
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
        fullScreen={matches} 
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
          <ProductDetailWrapper>
            <Product sx={{ mr: matches ? 0 : 4 }}>
              <ProductDetailImage
                style={{
                  maxWidth: matches ? '100%' : '600px',
                  marginBottom: matches ? theme.spacing(2) : 0,
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
  <BulletText variant="body1">
    <strong>About: </strong>{product.description}
  </BulletText>
  <BulletText variant="body1">
    <strong>Material: </strong>{product.material}
  </BulletText>
  <BulletText variant="body1">
    <strong>Size: </strong>{product.size}
  </BulletText>
  <BulletText variant="body1">
    <strong>Rating:</strong> {product.rating}
  </BulletText>
  <BulletText variant="body1">
    <strong>Delivery:</strong> {product.delivery}
  </BulletText>

  <Box
    sx={{ mt: 4, minWidth: matches ? '200px' : '400px' }}
    display="flex"
    alignItems="center"
    justifyContent={matches ? 'center' : 'space-between'}
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
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
