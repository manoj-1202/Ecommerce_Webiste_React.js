
import { Divider, Drawer, List, ListItemButton, ListItemText } from "@mui/material";
import { DrawerCloseButton } from "../../styles/appbar";
import { Colors } from "../../styles/theme";
import { lighten } from "polished";
import CloseIcon from "@mui/icons-material/Close";
import { useUIContext } from "../context/ui"; 
import { useNavigate } from 'react-router-dom';

const AppDrawer = () => {
  const { drawerOpen, setDrawerOpen } = useUIContext();
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    setDrawerOpen(false);
    navigate(path);
  };

  return (
    <>
      {drawerOpen && (
        <DrawerCloseButton onClick={() => setDrawerOpen(false)}>
          <CloseIcon
            sx={{
              fontSize: "2.5rem",
              color: lighten(0.09, Colors.secondary),
            }}
          />
        </DrawerCloseButton>
      )}
      <Drawer open={drawerOpen}>
        <List>
          <ListItemButton onClick={() => handleNavigation('/')}>
            <ListItemText>Home</ListItemText>
          </ListItemButton>
          <Divider />
          <ListItemButton onClick={() => handleNavigation('/products')}>
            <ListItemText>Products</ListItemText>
          </ListItemButton>
          <Divider />
          
          <Divider />
          <ListItemButton onClick={() => handleNavigation('/contact-us')}>
            <ListItemText>Contact Us</ListItemText>
          </ListItemButton>
          <Divider />
        </List>
      </Drawer>
    </>
  );
};

export default AppDrawer;
