import React, { useState } from 'react';
import {  ListItemIcon, ListItemText, Dialog, DialogActions, DialogContent, DialogTitle, Button, Badge } from "@mui/material";
import { Link, useLocation } from 'react-router-dom';
import { ActionIconsContainerDesktop, ActionIconsContainerMobile, MyList  ,CustomListItemButton, CustomDivider} from "../../styles/appbar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RestoreIcon from '@mui/icons-material/Restore';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useUser } from '../pages/UserContext';
import { useCart } from '../products/CartContext';
import { useFavorites } from '../pages/FavoritesContext';
import { useNavigate } from 'react-router-dom';

const Actions = ({ matches }) => {
  const [dialogOpen, setDialogOpen] = useState(false); // State for confirmation dialog
  const location = useLocation(); // Hook to get the current route
  const Component = matches ? ActionIconsContainerMobile : ActionIconsContainerDesktop;
  const { user, logout } = useUser();
  const { cart } = useCart(); // Retrieve cart data
  const { favorites } = useFavorites(); // Retrieve favorites data
  const navigate = useNavigate();

  const handleLogout = () => {
    setDialogOpen(true); // Show confirmation dialog
  };

  const handleDialogClose = () => {
    setDialogOpen(false); // Close the dialog without action
  };

  const handleConfirmLogout = () => {
    logout(); // Call logout function
    setDialogOpen(false); // Close the dialog
    setTimeout(() => navigate('/login'), 1000);
  };

  const isActive = (path) => location.pathname === path; 

  return (
    <Component sx={{padding:"0px"}}>
      <MyList type="row">
        <CustomListItemButton
          component={Link} 
          to="/cart" 
          sx={{ 
            justifyContent: "center", 
            bgcolor: isActive('/cart') ? 'action.selected' : 'transparent' 
            
          }}
        >
          <ListItemIcon sx={{ display: "flex", justifyContent: "center" }}>
            <Badge badgeContent={cart.length} color="info">
              <ShoppingCartIcon />
            </Badge>
          </ListItemIcon>
        </CustomListItemButton>
        <CustomDivider orientation='vertical' flexItem />
        <CustomListItemButton 
          component={Link} 
          to="/favorites" 
          sx={{ 
            justifyContent: "center", 
            bgcolor: isActive('/favorites') ? 'action.selected' : 'transparent' 
          }}
        >
          <ListItemIcon sx={{ display: "flex", justifyContent: "center", color: "red" }}>
            <Badge badgeContent={favorites.length} color="info">
              <FavoriteIcon />
            </Badge>
          </ListItemIcon>
        </CustomListItemButton>
        <CustomDivider orientation='vertical' flexItem />

        {user ? (
          <>
{/* //trnasaction icon */}
<CustomListItemButton 
        component={Link} 
        to="/transation" 
        sx={{ 
          justifyContent: "center", 
          bgcolor: isActive('/transation') ? 'action.selected' : 'transparent',
          display: { xs: 'none', sm: 'flex' }, 
        }}
      >
        <ListItemIcon sx={{ display: "flex", justifyContent: "center" }}>
          <RestoreIcon />
        </ListItemIcon>
      </CustomListItemButton>
      
      <CustomDivider 
        orientation='vertical' 
        flexItem 
        sx={{ 
          display: { xs: 'none', sm: 'block' } 
        }} 
      />
{/* ///// */}

            <CustomListItemButton 
              component={Link} 
              to="/user" 
              sx={{ 
                justifyContent: "center", 
                bgcolor: isActive('/user') ? 'action.selected' : 'transparent' 
              }}
            >
              <ListItemText primary={`Hello, ${user.firstName || 'User'}`} />
            </CustomListItemButton>
            <CustomDivider orientation='vertical' flexItem />
            <CustomListItemButton 
              onClick={handleLogout} 
              sx={{ justifyContent: "center" }}
            >
              <ListItemText primary="Logout" />
            </CustomListItemButton>
          </>
        ) : (
          <CustomListItemButton 
            component={Link} 
            to="/login" 
            sx={{ 
              justifyContent: "center", 
              bgcolor: isActive('/login') ? 'action.selected' : 'transparent' 
            }}
          >
            <ListItemText primary="Login" />
          </CustomListItemButton>


        )}
      </MyList>

      {/* Confirmation Dialog */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          Are you sure you want to log out?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>No</Button>
          <Button onClick={handleConfirmLogout} color="primary">Yes</Button>
        </DialogActions>
      </Dialog>
    </Component>
  );
};

export default Actions;
