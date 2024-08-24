import { Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import { Colors } from "../theme";

export const PromotionsContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    padding: "40px 0", 
  },
  height: "15px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "35px 0", 
  overflow: "hidden",
  width:"100%",
  background: Colors.secondary,
  boxSizing: 'border-box', 
}));

export const MessageText = styled(Typography)(({ theme }) => ({
     fontFamily: '"Montez", "cursive"',
  [theme.breakpoints.up("md")]: {
    fontSize: "3rem",
  },
  color: Colors.white,
  fontSize: "1.5rem",
}));