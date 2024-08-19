import { Box, Typography, List, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import "@fontsource/montez";

// Container
export const AppbarContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "2px 8px",
  backgroundColor: '#ffffff', 
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', 
  width: '100vw',
  marginLeft: 'calc(-50vw + 50%)', 
  marginRight: 'calc(-50vw + 50%)',
});

// Header
export const AppbarHeader = styled(Typography)({
  padding: '4px',
  flexGrow: '1',
  fontSize: '4.5em',
  fontFamily: '"Montez", "cursive"',
  color: '#ff4081',
  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)', 
});

// List
export const MyList = styled(List)(({ type }) => ({
  display: type === 'row' ? 'flex' : 'block',
  flexGrow: 4,
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px', 
}));

// Action Icons Container Mobile
export const ActionIconsContainerMobile = styled(Box)({
  display: "flex",
  background: '#f5f5f5', 
  position: "fixed",
  bottom: 0,
  left: 0,
  width: "100%",
  alignItems: "center",
  zIndex: 99,
  borderTop: `1px solid #e0e0e0`,
  padding: '8px 16px', 
  boxShadow: '0px -2px 5px rgba(0, 0, 0, 0.1)', 
});

// Action Icons Container Desktop
export const ActionIconsContainerDesktop = styled(Box)({
  flexGrow: 0,
  background: '#fafafa', 
  padding: '8px',
  borderRadius: '4px', 
});

// Drawer Close Button
export const DrawerCloseButton = styled(IconButton)(() => ({
  position: 'absolute',
  top: 10,
  left: "250px",
  zIndex: 1999,
  backgroundColor: '#ffffff', 
  borderRadius: '50%', 
  padding: '8px', 
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', 
  '&:hover': {
    backgroundColor: '#f1f1f1', 
  },
}));
