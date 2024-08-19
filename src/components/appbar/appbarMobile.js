import React from 'react';
import { AppbarContainer, AppbarHeader } from "../../styles/appbar";
import MenuIcon from "@mui/icons-material/Menu";
import Actions from "./actions";
import { IconButton } from "@mui/material";
import { useUIContext } from "../context/ui";

const AppbarMobile = ({ matches }) => {
  const { setDrawerOpen } = useUIContext();

  return (
    <AppbarContainer>
      <IconButton onClick={() => setDrawerOpen(true)}>
        <MenuIcon />
      </IconButton>
      <AppbarHeader textAlign="center" variant='h4'>My Bags</AppbarHeader>
      <Actions matches={matches} />
    </AppbarContainer>
  );
};

export default AppbarMobile;
