import styled from "@emotion/styled";
import { Box, Button } from "@mui/material";
import { Colors } from "../theme";


//FavContainer

export const FavContainer =styled(Box)(({theme})=>({
  display: "flex",
  flexDirection: 'column',
  justifyContent: "center",
  alignItems: "center",
  flexWrap: "wrap",
  width: "100%",
  minHeight: "80vh",
  padding: theme.spacing(2),
  boxSizing: "border-box",   
 

}))

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
 position:"sticky",
 left: 70,
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
    display:"flex",
    justifyContent:"center",
    justifyItems:"center",
    alignItems:"center",
    width: "70%",
    marginRight:"32px",
 
   
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
    flexDirection: 'row',
    gap: theme.spacing(0),
  },
  [theme.breakpoints.down("sm")]: {
    width:"100%",
 margin:"0px",
 display: 'flex',
 justifyContent: 'space-between',

   
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
  [theme.breakpoints.down("sm")]: {
    padding: '4px 15px',
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
  [theme.breakpoints.down("sm")]: {
    padding: '4px 15px',
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

