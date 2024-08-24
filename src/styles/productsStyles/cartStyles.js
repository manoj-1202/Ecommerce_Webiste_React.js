import styled from "@emotion/styled";
import { Box, Button, Typography } from "@mui/material";

// Container to center the CartProduct on the screen
export const CartContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: 'column',
  justifyContent: "center",
  alignItems: "center",
  flexWrap: "wrap",
  width: "100%",
  minHeight: "80vh",
  padding: theme.spacing(2),
  boxSizing: "border-box",


  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(1),
  },
 
}));

// CartProduct with a gradient background and rounded corners
export const CartProduct = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "70%",
  maxWidth: "350px",
  borderRadius: '12px',
  border: '1px solid #ddd',
  background: 'linear-gradient(135deg, #f5f5f5, #ffffff)',
  boxShadow: '0px 6px 12px rgba(0,0,0,0.1)',
  transition: 'transform 0.3s, box-shadow 0.3s',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  margin: "0 auto",
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0px 8px 16px rgba(0,0,0,0.2)',
  },
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(1.5),
    marginTop: theme.spacing(1.5),
  },
  [theme.breakpoints.down("sm")]: {
    width: "70%",
    
  },
}));

// ProductImage with border and hover effect
export const ProductImage = styled("img")(({ theme }) => ({
  width: '70%',
  height: 'auto',
  borderRadius: '12px',
  border: '1px solid #ddd',
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'scale(1.1)',
  },
  [theme.breakpoints.down("md")]: {
    width: '70%',
  },
}));

// CartQuantityBox with spacing adjustments
export const CartQuantityBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: theme.spacing(2),
  gap: theme.spacing(1),
  [theme.breakpoints.down("md")]: {
    marginTop: theme.spacing(1.5),
    gap: theme.spacing(0.5),
   
  },
}));

// CartButton with consistent sizing
export const CartButton = styled(Button)(({ theme }) => ({
  padding: '8px 16px',
  minWidth: 'unset',
  fontSize: '0.875rem',
  borderRadius: '8px',
  transition: 'background-color 0.3s',
  [theme.breakpoints.down("md")]: {
    padding: '6px 12px',
  },
}));

// RemoveButton with emphasis and hover effect
export const RemoveButton = styled(Button)(({ theme }) => ({
  padding: '8px 16px',
  minWidth: 'unset',
  backgroundColor: theme.palette.error.main,
  color: theme.palette.common.white,
  borderRadius: '8px',
  marginTop: theme.spacing(2),
  '&:hover': {
    backgroundColor: theme.palette.error.dark,
  },
  [theme.breakpoints.down("md")]: {
    padding: '6px 12px',
    marginTop: theme.spacing(1.5),
  },
}));

// TotalAmountContainer with a background and border
export const TotalAmountContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(0),
  borderRadius: '8px',

  backgroundColor: '#f9f9f9',
  marginTop: theme.spacing(2),
  [theme.breakpoints.down("md")]: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(1.5),
  },
}));

// TotalAmountText with font weight and color
export const TotalAmountText = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '1.25rem',
  color: theme.palette.primary.dark,
  marginTop: theme.spacing(1),
 
  [theme.breakpoints.down("md")]: {
    fontSize: '1rem',
    marginTop: theme.spacing(1.5),
  },
}));

// BuyNow button with a gradient background and hover effect
export const BuyNow = styled(Button)(({ theme }) => ({
  padding: '12px 20px',
  background: 'linear-gradient(90deg, #007bff, #0056b3)',
  color: theme.palette.common.white,
  fontSize: '1rem',
  fontWeight: 'bold',
  borderRadius: '8px',
  marginTop: theme.spacing(1),
  '&:hover': {
    background: 'linear-gradient(90deg, #0056b3, #003d7a)',
  },
  [theme.breakpoints.down("md")]: {
    padding: '10px 16px',
    marginTop: theme.spacing(1.5),
  },
  [theme.breakpoints.down("sm")]: {
    width: "80%",
    padding: '6px 12px',
    fontSize: '0.875rem',
  },
}));
