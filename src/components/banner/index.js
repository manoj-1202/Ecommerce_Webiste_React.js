import React from 'react';
import { Typography } from "@mui/material";
import { BannerContainer, BannerContent, BannerDescription, BannerImage, BannerShopButton, BannerTitle } from "../../styles/banner";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();

  const handleShopNowClick = () => {
    navigate('/products');
  };

  return (
    <BannerContainer>
      <BannerImage src="images/banner/banner.png" alt="Banner" />
      <BannerContent>
        <Typography variant="h5">Huge Collection</Typography>
        <BannerTitle variant="h2">New Bags</BannerTitle>
        <BannerDescription variant="subtitle1">
          Discover our collection of stylish bags, from sleek leather designs to versatile travel essentials, perfect for any occasion and designed to meet your every need.
        </BannerDescription>
        <BannerShopButton color="primary" onClick={handleShopNowClick}>Shop Now</BannerShopButton>
      </BannerContent>
    </BannerContainer>
  );
};

export default Banner;
