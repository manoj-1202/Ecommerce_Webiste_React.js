import styled from "@emotion/styled";
import { Box, Button } from "@mui/material";
import { Colors } from "../theme";


// Product styling with a shadow and hover effect
export const Product = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent:"center",
  width: "200px",
  margin: theme.spacing(1.5),
  border: '2px solid #ddd',
  borderRadius: '8px',
  padding: theme.spacing(2),
  boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
  transition: 'box-shadow 0.3s, transform 0.3s',
  '&:hover': {
    boxShadow: '0px 6px 12px rgba(0,0,0,0.2)',
    transform: 'scale(1.03)',
  },
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(1.5),
    width: "160px",
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1),
    width: "140px",
  },
}));

// ProductImage with enhanced styling
export const ProductImage = styled("img")(({ theme }) => ({
  width: '70%',
  height: 'auto',
  borderRadius: '8px',
  border: '1px solid #ddd',
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
  },
  [theme.breakpoints.down("md")]: {
    width: '100%',
  },
}));

// ButtonContainer with improved spacing
export const ButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  marginTop: theme.spacing(1.5),
  [theme.breakpoints.down("md")]: {
    flexDirection: 'column',
    gap: theme.spacing(1),
  },
}));

// RemoveButton with a modern look
export const RemoveButton = styled(Button)(({ theme }) => ({
  padding: '1px 10px',
  minWidth: 'unset',
  margin:"5px",
  backgroundColor: theme.palette.error.main,
  color: Colors.white,
  borderRadius: '8px',
  '&:hover': {
    backgroundColor: theme.palette.error.dark,
    color: Colors.white,
  },
  [theme.breakpoints.down("md")]: {
    padding: '4px 8px',
  },
}));

// Cart button with a consistent look and feel
export const Cart = styled(Button)(({ theme }) => ({
  padding: '1px 10px',
  margin:"5px",
  minWidth: 'unset',
  backgroundColor: 'orange',
  color: Colors.white,
  borderRadius: '8px',
  '&:hover': {
    backgroundColor: 'darkorange',
    color: Colors.white,
  },
  [theme.breakpoints.down("md")]: {
    padding: '4px 8px',
  },
}));

// FavProductActionButton with consistent padding and color
export const FavProductActionButton = styled(Button)(({ theme }) => ({
  padding: '6px 12px',
  minWidth: 'unset',
  
  color: Colors.white,
  borderRadius: '8px',
  '&:hover': {
    
    color: Colors.white,
  },
  [theme.breakpoints.down("md")]: {
    padding: '4px 8px',
  },
}));
