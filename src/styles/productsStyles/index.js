import styled from "@emotion/styled";
import { Button, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { slideInBottom, slideInRight } from "../../animation";
import { Colors } from "../theme";

export const Product = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center", 
  marginTop: "25px",
  padding: theme.spacing(1.5),
  borderRadius: "12px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  backgroundColor: "rgb(244, 238, 238)",
  maxWidth: "220px", 
  width: '100%',
 
  '&:hover': {
    transform: "scale(1.02)",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
  },
  
  // Center the products on the screen for all screen sizes
  [theme.breakpoints.up("md")]: {
    maxWidth: "240px", 
    marginLeft: "auto",
    marginRight: "auto",
  },

  [theme.breakpoints.down("md")]: {
    maxWidth: "180px", 
    marginLeft: "auto",
    marginRight: "auto",
  },

  [theme.breakpoints.down("sm")]: {
    
    maxWidth: "320px", 
    marginLeft: "-12px",
    
  },
}));


export const ProductTitle = styled(Box)(({ theme }) => ({
  fontFamily: '"Montez", "cursive"',
  fontSize: "60px",  
  textAlign: "center",
  color: Colors.primary,
  marginTop:"20px",
  [theme.breakpoints.down("md")]: {
    fontSize: "50px",
    marginTop:"20px",
  },
}));

export const ProductImage = styled("img")(({ theme }) => ({
  width: "100%",
  height: "250px",
  borderRadius: "8px",
  objectFit: "cover",
  transition: "transform 0.3s ease",

  '&:hover': {
    transform: "scale(1.02)",
  },

  [theme.breakpoints.down("sm")]: {
    transition: "none",
    '&:hover': {
      transform: "none",
    },
  },
}));


export const ProductActionButton = styled(IconButton)(({theme}) => ({
  background: Colors.white,
  color: Colors.primary,
  margin: "2px",  
  borderRadius: "10px",
  '&:hover': {
    background: Colors.light_gray,
  },

  [theme.breakpoints.down("sm")]: {
    transition: "none",
    '&:hover': {
      transform: "none",
    },
  },
}));

export const ProductFavButton = styled(ProductActionButton)(({ isfav, theme }) => ({
  color: isfav ? Colors.primary : Colors.light,
  transition: 'color 0.3s ease',

  [theme.breakpoints.down("md")]: {
    display: "flex",
    justifyContent: "start",
    position: "relative",
  },
  [theme.breakpoints.up("md")]: {
    position: "absolute",
    right: 0,
    top: 0,
    animation: `${slideInRight} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`,
  },
  [theme.breakpoints.down("sm")]: {
    position:"absolute",
    left:0,
    top:50,
     animation: "none",
     transition: "none",
     '&:hover': {
       transform: "none",
     },
  },
}));


export const ProductActionsWrapper = styled(Box)(({ show, theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: show ? 'block' : 'none',
    position: "absolute",
    right: 0,
    top: '20%',
    animation: show && `${slideInRight} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`,
  },
  [theme.breakpoints.down("sm")]: {
    position:"absolute",
  right:0,
  top:20,
  animation: "none"
  },
}));

export const ProductAddToCart = styled(Button, {
  shouldForwardProp: (prop) => prop !== "show",
})(({ show, theme }) => ({
  fontSize: "14px",
  background: "orange",
  color: Colors.white,
  padding: "8px 6px",  
  borderRadius: "8px",
  opacity: 0.9,
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  transition: "background-color 0.3s ease",
  '&:hover': {
    background: "darkorange",
  },
  [theme.breakpoints.up("md")]: {
    position: "absolute",
    bottom: "2%",
    width: "100%",
    animation: show && `${slideInBottom} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`,
  },
  [theme.breakpoints.down("sm")]: {
   width:"200px"
  },
}));

export const ProductAddToCartChat = styled(Button, {
  shouldForwardProp: (prop) => prop !== "show",
})(({ theme }) => ({
  fontSize: "14px",
  background: Colors.primary,
  color: Colors.white,
  padding: "8px 10px",  // Adjusted padding
  borderRadius: "8px",
  opacity: 0.85,
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  transition: "background-color 0.3s ease",
  '&:hover': {
    background: Colors.primaryDark,
  },
  [theme.breakpoints.up("md")]: {
    position: "absolute",
    bottom: "2%",
  },
}));

export const ProductMetaWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
}));




export const ProductActionsWrapperChat = styled(Box)(({ show, theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: show ? 'block' : 'none',
    position: "absolute",
    right: 0,
    top: '15%',
    animation: show && `${slideInRight} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`,
  },
}));

