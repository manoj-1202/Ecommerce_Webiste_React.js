import React from "react";
import { ListItemButton, ListItemText } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import Actions from "../appbar/actions";
import { MyList, AppbarContainer, AppbarHeader } from "../../styles/appbar";

const AppbarDesktop = ({ matches }) => {
  const location = useLocation();

  return (
    <AppbarContainer>
      <AppbarHeader>My Bags</AppbarHeader>
      <MyList type="row">
        <ListItemButton component={Link} to="/" selected={location.pathname === '/'}>
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton component={Link} to="/products" selected={location.pathname === '/products'}>
          <ListItemText primary="Products" />
        </ListItemButton>
        <ListItemButton component={Link} to="/contact-us" selected={location.pathname === '/contact-us'}>
          <ListItemText primary="Contact" />
        </ListItemButton>
    
      </MyList>
      <Actions matches={matches} />
    </AppbarContainer>
  );
};

export default AppbarDesktop;
