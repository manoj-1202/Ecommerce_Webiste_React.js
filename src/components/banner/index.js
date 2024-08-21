import React, { useState } from 'react';
import { Typography, CircularProgress, Button } from "@mui/material";
import { BannerContainer, BannerContent, BannerDescription, BannerImage, BannerTitle } from "../../styles/banner";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleShopNowClick = () => {
    setLoading(true);
    // Simulate an async operation like navigation or data fetching
    setTimeout(() => {
      navigate('/products');
      setLoading(false);
    }, 1000); // Adjust the timeout as needed
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
        <Button
          color="primary"
          onClick={handleShopNowClick}
          disabled={loading}
          variant="contained"
          sx={{ position: 'relative' }}
        >
          {loading ? (
            <>
              <CircularProgress size={24} color="inherit" sx={{ position: 'absolute', left: '50%', top: '50%', marginLeft: '-12px', marginTop: '-12px' }} />
              Processing...
            </>
          ) : (
            'Shop Now'
          )}
        </Button>
      </BannerContent>
    </BannerContainer>
  );
};

export default Banner;
