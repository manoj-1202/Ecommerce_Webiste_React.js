import React from 'react';
import { Card, CardContent, Typography, Grid, Box, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const OrderCard = () => {
  const userId = localStorage.getItem('currentUser');
  const orderDetails = JSON.parse(localStorage.getItem(`orderDetails-${userId}`));
  const paymentInfo = JSON.parse(localStorage.getItem(`paymentInfo-${userId}`));

  if (!orderDetails) {
    return (
      <Typography variant="h6" align="center">
        No Transaction details found.
      </Typography>
    );
  }

  const totalAmount = orderDetails.products.reduce((total, product) => {
    return total + (product.price * product.quantity);
  }, 0);

  return (
    <Box  sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop:"20px", marginBottom:"20px" }}>
    <Card variant="outlined" sx={{padding: '10px', maxWidth: 800,border:"1px solid black"}}>
    <Typography variant="h5" align="center" gutterBottom style={{ fontWeight: 'bold' }}>
  Transaction History
</Typography>


      <Box sx={{ padding: '16px', border: '1px solid #ddd', borderRadius: '8px', maxWidth: '800px', marginBottom: '16px' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Sold By: My Bags
        </Typography>
        <Typography variant="body2" sx={{ fontStyle: 'italic', marginTop: '8px' }}>
          Ship-from Address: My Bags, 
          District - Coimbatore, TamilNadu, India 
        </Typography>
        <Typography variant="body2" sx={{ marginTop: '8px', fontWeight: 'bold' }}>
          GSTIN - 06AADCD9571D1ZO
        </Typography>
      </Box>

      <CardContent>
        <Grid container spacing={2} sx={{ marginBottom: '16px' }}>
          <Grid item xs={12} sm={4}>
            <Typography variant="body1">
              <strong> {`ORDER DATE: ${orderDetails.date}`}</strong> 
            </Typography>
            <Typography variant="body1">
              <strong>{`ORDER TYPE: ${paymentInfo.method}`}</strong>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="body1">
              <strong>Bill From:</strong>
            </Typography>
            <Typography variant="body2">
              My Bags
            </Typography>
            <Typography variant="body2">
              Coimbatore 641002 Tamil Nadu
            </Typography>
            <Typography variant="body2">
              Phone: +91 555-333-555
            </Typography>
            <Typography variant='body2'>mybags@gmail.com</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="body1">
              <strong>Ship To:</strong>
            </Typography>
            <Typography variant="body2">
              {userId}
            </Typography>
            <Typography variant="body2" align="center" sx={{ marginTop: '8px', fontStyle: 'italic' }}>
              <strong>Keep this invoice and manufacturer box for warranty purposes</strong>
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ marginBottom: '16px' }} />

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{fontWeight:"bold", fontSize:"16px"}}>Product</TableCell>
                <TableCell sx={{fontWeight:"bold", fontSize:"16px"}} align="center">Qty</TableCell>
                <TableCell sx={{fontWeight:"bold", fontSize:"16px"}} align="right">Unit Price</TableCell>
                <TableCell sx={{fontWeight:"bold", fontSize:"16px"}} align="right">Gross Amount</TableCell>
                <TableCell sx={{fontWeight:"bold", fontSize:"16px"}} align="right">Discount</TableCell>
                <TableCell sx={{fontWeight:"bold", fontSize:"16px"}} align="right">Taxable Value</TableCell>
                <TableCell sx={{fontWeight:"bold", fontSize:"16px"}} align="right">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderDetails.products.map((product, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row" sx={{ fontWeight: 'bold', fontSize: "16px" }}>
                    {product.name}
                  </TableCell>
                  <TableCell align="center">{product.quantity}</TableCell>
                  <TableCell align="right">₹{product.price.toFixed(2)}</TableCell>
                  <TableCell align="right">₹{(product.price * product.quantity).toFixed(2)}</TableCell>
                  <TableCell align="right">₹00.1</TableCell>
                  <TableCell align="right">₹00.3</TableCell>
                  <TableCell align="right">₹{(product.price * product.quantity).toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: "16px", fontWeight: "bold" }} colSpan={2}>Total</TableCell>
                <TableCell align="right">₹{totalAmount.toFixed(2)}</TableCell>
                <TableCell align="right">₹00.1</TableCell>
                <TableCell align="right">₹00.1</TableCell>
                <TableCell align="right">₹00.2</TableCell>
                <TableCell sx={{ fontSize: "16px", fontWeight: "bold" }} align="right">₹{totalAmount.toFixed(2)}</TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>

        <Divider sx={{ marginTop: '16px' }} />

        <Grid container spacing={2} sx={{ marginTop: '16px', justifyContent: 'center', alignItems: 'center' }}>
          <Typography sx={{ fontSize: '20px', fontStyle: 'italic', fontWeight: 'bold', textAlign: 'center' }}>
            THANK YOU FOR YOUR PURCHASE
          </Typography>
        </Grid>

      </CardContent>
    </Card>
    </Box>
  );
};

export default OrderCard;
