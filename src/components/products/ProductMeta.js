import React from 'react';
import { Typography } from "@mui/material";
import { ProductMetaWrapper } from "../../styles/productsStyles";

const ProductMeta = ({ product, matches }) => {
  return (
    <ProductMetaWrapper>
      <Typography textTransform="capitalize" variant={matches ? "h6" : "h5"} lineHeight={2}>
        {product.name}
      </Typography>
      <Typography variant={matches ? "caption" : "subtitle2"}>
        {product.price}
      </Typography>
    </ProductMetaWrapper>
  );
};

export default ProductMeta;
