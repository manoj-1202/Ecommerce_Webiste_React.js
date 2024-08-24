import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Colors } from "../theme";

// Container for the Banner
export const BannerContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  padding: 0,
  background: "lightgray",
  margin: 0, 
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));
// Banner Image
export const BannerImage = styled("img")(({ theme }) => ({
  marginRight: "5%",
  width: "40%", 

  [theme.breakpoints.down("md")]: {
    width: "60%",
    marginBottom: "20px", 
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%", 
    height: "auto", 
  },
}));

// Banner Content
export const BannerContent = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  maxWidth: 420,
  padding: "20px",
  textAlign: "center",
  [theme.breakpoints.down("md")]: {
    padding: "15px", // Reduced padding on medium screens
  },
  [theme.breakpoints.down("sm")]: {
    maxWidth: "90%", // Increase content width on small screens
  },
}));

// Banner Title
export const BannerTitle = styled(Typography)(({ theme }) => ({
  lineHeight: 1.2,
  fontSize: "3em",
  marginBottom: "20px",
  fontWeight: "bold",
  color: '#333',
  [theme.breakpoints.down('md')]: {
    fontSize: '3.5em', // Slightly smaller on medium screens
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '2.5em', // Even smaller on small screens
  },
}));

// Banner Description
export const BannerDescription = styled(Typography)(({ theme }) => ({
  lineHeight: 1.5,
  letterSpacing: 1.15,
  marginBottom: "1.5em",
  color: '#555',
  [theme.breakpoints.down("md")]: {
    lineHeight: 1.4,
    letterSpacing: 1.1,
    marginBottom: "1.2em",
  },
  [theme.breakpoints.down("sm")]: {
    lineHeight: 1.3,
    letterSpacing: 1.05,
    marginBottom: "1em",
    fontSize: '0.9em', // Adjust font size on smaller screens
  },
}));

// Banner Shop Button
export const BannerShopButton = styled(Button)(({ theme }) => ({
  background: "brown",
  padding: "12px 24px",
  color: Colors.white,
  fontWeight: "bold",
  fontSize: "16px",
  borderRadius: "4px",
  '&:hover': {
    backgroundColor: 'darkgreen',
  },
  [theme.breakpoints.down("md")]: {
    padding: "10px 20px",
    fontSize: "14px",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "8px 16px", // Smaller padding for small screens
    fontSize: "12px", // Smaller font size for small screens
  },
}));
