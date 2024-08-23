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
} from '@mui/material';
import { AccountBalanceWallet, CreditCard, Money } from '@mui/icons-material';
import { UpiBox, CardBox } from '../../styles/productsStyles/paymentStyles';
import MuiAlert from '@mui/material/Alert';
import { useNavigate, useLocation } from 'react-router-dom';

const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
const years = ['1824', '1825', '1826', '1827', '1828', '1829', '1830', '1831', '1832', '1833'];

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

    setLoading(true);

    const token = `token-${Date.now()}`;
    const paymentInfo = {
      token,
      method: selectedValue,
      totalAmount,
      upiId: selectedValue === 'upi' ? upiId : undefined,
      cardDetails: selectedValue === 'card' ? cardDetails : undefined,
    };

    if (userId) {
      localStorage.setItem(`paymentInfo-${userId}`, JSON.stringify(paymentInfo));
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
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom align="center" sx={{ marginTop: '10px', fontWeight: 'bold',fontSize:"32px" }}>
        Payment Method
      </Typography>
      <FormControl component="fieldset">
        <RadioGroup aria-label="payment-method" name="payment-method" value={selectedValue} onChange={handleChange}>
          <List>
            {paymentOptions.map((option) => (
          
              
              <ListItem key={option.value} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
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
                  <UpiBox mt={1} sx={{ width: '100%' }}>
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
                  <CardBox mt={2} sx={{ width: '100%' }}>
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

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
        <Typography variant="h5" align="center" marginY={1}>
          Total Amount: ₹{totalAmount}
        </Typography>
        <Button
          onClick={handlePayNow}
          variant="contained"
          color="primary"
          disabled={loading}
          sx={{ position: 'relative' }}
        >
          {loading && <CircularProgress size={24} sx={{ position: 'absolute', top: '50%', left: '50%', mt: '-12px', ml: '-12px' }} />}
          {loading ? 'Processing...' : 'Pay Now'}
        </Button>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default PaymentOptions;
