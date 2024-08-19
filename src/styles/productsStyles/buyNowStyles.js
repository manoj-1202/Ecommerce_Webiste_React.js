import { styled } from '@mui/system';
import { Box, Button,Typography } from '@mui/material';

// Styled Box for product rows
export const ProductRow = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '16px',
    marginBottom: '16px',
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr', 
    },
  }));

// Styled Box for individual product containers with hover effect
export const StyledProductBox = styled(Box)(({ theme }) => ({

 width:"350px",
  marginBottom: '16px',
  padding: '16px',
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
  },
  [theme.breakpoints.down('md')]: {
    maxWidth: '100%',
  },
}));

// Styled Image for product images
export const StyledImage = styled('img')(({theme}) =>({
  width: '100%',
  height: 'auto',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  transition: 'box-shadow 0.3s ease-in-out',
  '&:hover': {
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  },
  [theme.breakpoints.down('md')]: {
    height: "100%",
    width:"50%"
  },
}));

// Styled Box for spacing and alignment
export const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'row',
  alignItems: 'center',
  padding: '16px',
  borderRadius: '8px',
  backgroundColor: '#f5f5f5',
  borderTop: '1px solid #ddd',
  borderBottom: '1px solid #ddd',
 
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
}));

// Styled Button for 'Buy Now' with hover effect
export const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: '16px',
  padding: '10px 20px',
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  transition: 'background-color 0.3s ease-in-out, transform 0.3s ease-in-out',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    transform: 'translateY(-2px)',
  },
  [theme.breakpoints.down('md')]: {
    marginTop: '12px',
  },
}));

// Additional typography styling if needed
export const StyledTypography = styled(Typography)(({theme }) => ({
  fontWeight: 'bold',
  color: "balck",
  '&:hover': {
    color: "black",
    transition: 'color 0.3s ease-in-out',
  },
}));
