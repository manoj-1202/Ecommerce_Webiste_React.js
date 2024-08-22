import { styled } from "@mui/system";
import { Box, Typography, List, ListItemButton, ListItemText } from "@mui/material";
import { Colors } from "../../styles/theme";


export const FooterContainer = styled(Box)(({ theme }) => ({
  background: Colors.shaft,
  color: Colors.white,
  padding: theme.spacing(4),
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
  fontSize: '12px',
  width: '100vw', 
  maxWidth: '100%', 
  boxSizing: 'border-box',
  overflowX: 'hidden',
  margin: 0, 
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(6),
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(10),
    fontSize: '13px',
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(5),
    fontSize: '14px',
  },
}));
export const FooterTitle = styled(Typography)(({ theme }) => ({
  textTransform: "uppercase",
  marginBottom: theme.spacing(2),
  fontWeight: 600,
  [theme.breakpoints.down('sm')]: {
    fontSize: '12px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '14px',
  },
}));

export const FooterList = styled(List)(({ theme }) => ({
  padding: 0,
  lineHeight: 1.7, 
  [theme.breakpoints.down('md')]: {
    padding: 0,
  },
}));


export const FooterListItemText = styled(ListItemText)(({ theme }) => ({
  '& .MuiTypography-root': {
    lineHeight: 1.7, 
    fontSize: '12px',
    '&.Mui-selected': {
    backgroundColor: Colors.primary,
    color: Colors.white,
  },
  '&:hover': {
    color: "white", 
    transform: 'scale(1.0)',
    transition: 'background-color 0.5s ease, color 0.3s ease, transform 0.3s ease',
  },
    [theme.breakpoints.up('md')]: {
      fontSize: '14px',
    },
  },
}));

export const FooterListItemButton = styled(ListItemButton)(({ theme }) => ({
  lineHeight: 1.7, 
  background:"white",
  width:"200px",
  '&.Mui-selected': {
    backgroundColor: Colors.primary,
    color: Colors.white,
  },
  '&:hover': {
    color: "white", 
    transform: 'scale(1.03)',
    transition: 'background-color 0.5s ease, color 0.3s ease, transform 0.3s ease',
  },
  padding: theme.spacing(1),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0.5),
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(1.5),
  },
}));

export const FooterSocialIcons = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: theme.spacing(2),
  color: Colors.dove_gray,
  [theme.breakpoints.down('sm')]: {
    justifyContent: 'center',
    '& svg': {
      fontSize: '20px',
      transition: 'color 0.3s ease, transform 0.3s ease',
    },
    '& svg:hover': {
      color: Colors.white,
      transform: 'scale(1.1)',
    },
  },
  [theme.breakpoints.up('md')]: {
    '& svg': {
      fontSize: '24px',
      transition: 'color 0.3s ease, transform 0.3s ease',
    },
    '& svg:hover': {
      color: Colors.white,
      transform: 'scale(1.1)',
    },
  },
}));

export const FooterEmailContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: theme.spacing(1),
  '& svg': {
    fontSize: '20px',
    transition: 'color 0.3s ease',
  },
  [theme.breakpoints.down('sm')]: {
    justifyContent: 'center',
    '& svg': {
      fontSize: '18px',
    },
    '& svg:hover': {
      color: Colors.white,
    },
  },
  [theme.breakpoints.up('md')]: {
    '& svg': {
      fontSize: '22px',
    },
    '& svg:hover': {
      color: Colors.white,
    },
  },
}));
