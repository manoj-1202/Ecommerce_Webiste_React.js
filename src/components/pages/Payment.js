import React, { useState, useEffect } from 'react';
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  Box,
  Typography,
  ListItemText,
  MenuItem,
  Snackbar,
  CircularProgress,
  TextField,
  Button,
  Grid,
  FormControl,
  List,
  ListItem,
  ListItemIcon,
  Container,
} from '@mui/material';
import { AccountBalanceWallet, CreditCard, Money } from '@mui/icons-material';
import { UpiBox, CardBox } from '../../styles/productsStyles/paymentStyles';
import MuiAlert from '@mui/material/Alert';
import { useNavigate, useLocation } from 'react-router-dom';
import emailjs from 'emailjs-com';

const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
const years = ['2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031', '2032', '2033'];

const PaymentOptions = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedValue, setSelectedValue] = useState('');
  const [upiId, setUpiId] = useState('');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
  });
  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  const userId = localStorage.getItem('currentUser');

  useEffect(() => {
    if (location.state && location.state.totalAmount) {
      setTotalAmount(location.state.totalAmount);
    }
  }, [location.state]);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleUpiIdChange = (event) => {
    setUpiId(event.target.value);
  };

  const handleCardDetailChange = (event) => {
    const { name, value } = event.target;
    setCardDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleShippingAddressChange = (event) => {
    const { name, value } = event.target;
    setShippingAddress((prevAddress) => ({ ...prevAddress, [name]: value }));
  };

  const handlePayNow = () => {
    if (!selectedValue) {
      setSnackbarMessage('Please select a payment method.');
      setSnackbarSeverity('warning');
      setSnackbarOpen(true);
      return;
    }
    

    if (selectedValue === 'upi' && !upiId) {
      setSnackbarMessage('Please enter your UPI ID.');
      setSnackbarSeverity('warning');
      setSnackbarOpen(true);
      return;
    }

    if (selectedValue === 'card' && (!cardDetails.number || !cardDetails.expiryMonth || !cardDetails.expiryYear || !cardDetails.cvv)) {
      setSnackbarMessage('Please fill in all card details.');
      setSnackbarSeverity('warning');
      setSnackbarOpen(true);
      return;
    }
     // Check if shipping address is complete
  const {
    name,
    addressLine1,
    city,
    state,
    postalCode,
    country
  } = shippingAddress;

  if (!name || !addressLine1 || !city || !state || !postalCode || !country) {
    setSnackbarMessage('Please fill in all the shipping address fields.');
    setSnackbarSeverity('warning');
    setSnackbarOpen(true);
    return;
  }


    setLoading(true);

    const token = `token-${Date.now()}`;
    const paymentInfo = {
      token,
      method: selectedValue,
      totalAmount,
      upiId: selectedValue === 'upi' ? upiId : undefined,
      cardDetails: selectedValue === 'card' ? cardDetails : undefined,
      shippingAddress, 
    };

    if (userId) {
      localStorage.setItem(`paymentInfo-${userId}`, JSON.stringify(paymentInfo));
      
      // Send email after payment is made
      const emailData = {
        service_id: 'service_hq3cbqm',  //  EmailJS service ID
        template_id: 'template_3cb77ma',  // EmailJS template ID
        user_id: 'asDhf4VWP04Z1Qc7J',  // EmailJS user ID
        template_params: {
          name: "Mybags Customer", 
          email: userId,  
          mode: paymentInfo.method,
          message: `Your payment of ₹${totalAmount} through ${paymentInfo.method} with the address ${paymentInfo.shippingAddress.addressLine1} has been successful. Thank you for your purchase!`,
        },
      };

      emailjs.send(
        emailData.service_id,
        emailData.template_id,
        emailData.template_params,
        emailData.user_id
      ).then(() => {
        console.log('Email successfully sent!');
      }).catch((error) => {
        console.error('Failed to send email:', error);
      });

      setTimeout(() => {
        setLoading(false);
        navigate('/success');
      }, 3000);
    } else {
      setSnackbarMessage('User not logged in.');
      setSnackbarSeverity('error');
      setLoading(false);
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const paymentOptions = [
    {
      value: 'upi',
      label: <span style={{ fontSize: '18px' }}>UPI</span>,
      icon: <AccountBalanceWallet />,
      description: 'Pay by any UPI Id',
    },
    {
      value: 'card',
      label: <span style={{ fontSize: '18px' }}>Credit / Debit Card</span>,
      icon: <CreditCard />,
      description: 'Add and secure cards',
    },
    {
      value: 'cod',
      label: <span style={{ fontSize: '18px' }}>Cash on Delivery</span>,
      icon: <Money />,
      description: '',
    },
  ];

  return (
    <Box sx={{ padding: 2  }}>
      {/* Address  */}

      <Box sx={{ mt: 2 }}>
        <Typography variant="h5" gutterBottom align="center" sx={{ fontWeight: 'bold', fontSize: '30px' }}>
          Shipping Address
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={6}>
            <TextField
              fullWidth
              variant="outlined"
              name="name"
              label="Full Name"
              value={shippingAddress.name}
              onChange={handleShippingAddressChange}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextField
              fullWidth
              variant="outlined"
              name="addressLine1"
              label="Address Line 1"
              value={shippingAddress.addressLine1}
              onChange={handleShippingAddressChange}
              margin="normal"
            />
          </Grid>
          
          <Grid item xs={6}>
            <TextField
              fullWidth
              variant="outlined"
              name="city"
              label="City"
              value={shippingAddress.city}
              onChange={handleShippingAddressChange}
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              variant="outlined"
              name="state"
              label="State"
              value={shippingAddress.state}
              onChange={handleShippingAddressChange}
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              variant="outlined"
              name="postalCode"
              label="Postal Code"
              value={shippingAddress.postalCode}
              onChange={handleShippingAddressChange}
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              variant="outlined"
              name="country"
              label="Country"
              value={shippingAddress.country}
              onChange={handleShippingAddressChange}
              margin="normal"
            />
          </Grid>
        </Grid>
      </Box>

      {/* Payment method */}
      <Typography variant="h5" gutterBottom align="center" sx={{ marginTop: '10px', fontWeight: 'bold', fontSize: '30px' }}>
        Payment Method
      </Typography>
      <Container  >
  <FormControl component="fieldset">
    <RadioGroup aria-label="payment-method" name="payment-method" value={selectedValue} onChange={handleChange}>
      <List sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        {paymentOptions.map((option) => (
          <ListItem key={option.value} sx={{ width: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'flex-center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ListItemIcon>{option.icon}</ListItemIcon>
              <ListItemText
                primary={
                  <FormControlLabel
                    value={option.value}
                    control={<Radio />}
                    label={
                      <Box>
                        <Typography variant="body1">{option.label}</Typography>
                        {option.description && <Typography variant="body2">{option.description}</Typography>}
                      </Box>
                    }
                  />
                }
              />
            </Box>
            {option.value === 'upi' && selectedValue === 'upi' && (
              <UpiBox mt={1}>
                <Typography variant="body">Enter your UPI ID:</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={upiId}
                  onChange={handleUpiIdChange}
                  placeholder="your-upi-id@bank"
                  margin="normal"
                />
              </UpiBox>
            )}
            {option.value === 'card' && selectedValue === 'card' && (
              <CardBox mt={2}>
                <Typography variant="body1">Enter your card details:</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      name="number"
                      label="Card Number"
                      value={cardDetails.number}
                      onChange={handleCardDetailChange}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      select
                      fullWidth
                      variant="outlined"
                      name="expiryMonth"
                      label="Expiry Month"
                      value={cardDetails.expiryMonth}
                      onChange={handleCardDetailChange}
                      margin="normal"
                    >
                      {months.map((month) => (
                        <MenuItem key={month} value={month}>
                          {month}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      select
                      fullWidth
                      variant="outlined"
                      name="expiryYear"
                      label="Expiry Year"
                      value={cardDetails.expiryYear}
                      onChange={handleCardDetailChange}
                      margin="normal"
                    >
                      {years.map((year) => (
                        <MenuItem key={year} value={year}>
                          {year}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      name="cvv"
                      label="CVV"
                      value={cardDetails.cvv}
                      onChange={handleCardDetailChange}
                      margin="normal"
                    />
                  </Grid>
                </Grid>
              </CardBox>
            )}
          </ListItem>
        ))}
      </List>
    </RadioGroup>
  </FormControl>
</Container>

      
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        {loading ? (
          <CircularProgress />
        ) : (
          <Button variant="contained" color="primary" onClick={handlePayNow} sx={{ textTransform: 'none', width: '250px', height: '50px', fontSize: '18px' }}>
            Pay Now
          </Button>
        )}
      </Box>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <MuiAlert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default PaymentOptions;
