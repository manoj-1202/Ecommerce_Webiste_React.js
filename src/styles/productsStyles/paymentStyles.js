import { styled } from '@mui/material/styles';
import { FormControl, List, ListItem, ListItemIcon, TextField, Typography, Box, Container, Grid, Button } from '@mui/material';

// Existing styles...

// Responsive container
export const StyledContainer = styled(Container)(({ theme }) => ({
  width: "90%",
  maxWidth: "350px",
  [theme.breakpoints.up('sm')]: {
    width: "80%",
    maxWidth: "500px",
  },
  [theme.breakpoints.up('md')]: {
    width: "70%",
    maxWidth: "700px",
  },
}));

// Responsive grid
export const StyledGrid = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(1),
  [theme.breakpoints.up('sm')]: {
    marginTop: theme.spacing(2),
  },
}));

// Responsive text field
export const StyledTextField = styled(TextField)(({ theme }) => ({
  marginTop: theme.spacing(1),
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: '90%',
  },
}));

// Responsive button
export const StyledButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1),
  fontSize: '1.1rem',
  margin: theme.spacing(2),
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(1.5),
    fontSize: '1.2rem',
    marginLeft: '40%',
   
  },
}));

// Responsive form control
export const StyledFormControl = styled(FormControl)(({ theme }) => ({
  margin: theme.spacing(3),
  [theme.breakpoints.up('sm')]: {
    margin: theme.spacing(4),
  },
}));


// Responsive list
export const StyledList = styled(List)(({ theme }) => ({
  padding: 0,
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
}));

// Responsive list item
export const StyledListItem = styled(ListItem)(({ theme }) => ({
  alignItems: 'flex-start',
  padding: theme.spacing(1, 0),
  borderBottom: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(1.5, 0),
  },
}));

// Responsive list item icon
export const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  minWidth: '40px',
  [theme.breakpoints.up('sm')]: {
    minWidth: '50px',
  },
}));

// Responsive primary text
export const StyledPrimaryText = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.up('sm')]: {
    fontSize: '1.2rem',
  },
}));

// Responsive secondary text
export const StyledSecondaryText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [theme.breakpoints.up('sm')]: {
    fontSize: '1rem',
  },
}));

// Responsive UPI form container
export const UpiFormContainer = styled(Box)(({ theme }) => ({
  paddingLeft: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    paddingLeft: theme.spacing(3),
  },
}));

// Responsive UPI input
export const UpiInput = styled(TextField)(({ theme }) => ({
  marginTop: theme.spacing(1),
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: '90%',
  },
}));
