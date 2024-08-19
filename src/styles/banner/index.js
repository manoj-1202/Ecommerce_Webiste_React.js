import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Colors } from "../theme";

// Container for the Banner
export const BannerContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  height: "100%",
  padding: 0,
  background: "lightgray",
  width: '100vw',
  marginLeft: 'calc(-50vw + 50%)', 
  marginRight: 'calc(-50vw + 50%)',
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "center",
  },
}));

// Banner Image
export const BannerImage = styled("img")(({ theme }) => ({
  marginRight: "5%",
  width: "400px",

  [theme.breakpoints.down("md")]: {
    width: "350px",
  },
  [theme.breakpoints.down("sm")]: {
    width: "400px", 
    height: "auto", 
  },
}));

// Banner Content
export const BannerContent = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  maxWidth: 420,
  padding: "30px",
  textAlign: "center", // Center text alignment
}));

// Banner Title
export const BannerTitle = styled(Typography)(({ theme }) => ({
  lineHeight: 1.2, // Adjust line height for better readability
  fontSize: "4em", // Responsive font size
  marginBottom: "20px",
  fontWeight: "bold",
  color: '#333', // Darker text color for contrast
  [theme.breakpoints.down('sm')]: {
    fontSize: '2.5em',
  }
}));

// Banner Description
export const BannerDescription = styled(Typography)(({ theme }) => ({
  lineHeight: 1.5,
  letterSpacing: 1.15,
  marginBottom: "2em", // Adjusted margin for better spacing
  color: '#555', // Slightly lighter text color for readability
  [theme.breakpoints.down("md")]: {
    lineHeight: 1.4,
    letterSpacing: 1.1,
    marginBottom: "1.5em",
  },
}));

// Banner Shop Button
export const BannerShopButton = styled(Button)(({ theme }) => ({
  background: "brown",
  padding: "12px 24px", // Adjusted padding for better button proportion
  color: Colors.white,
  fontWeight: "bold",
  fontSize: "16px",
  borderRadius: "4px", // Slightly rounded corners for the button
  '&:hover': {
    backgroundColor: 'darkgreen', // Darker green for hover effect
  },
  [theme.breakpoints.down("sm")]: {
    padding: "10px 20px",
    fontSize: "14px",
  },
}));
