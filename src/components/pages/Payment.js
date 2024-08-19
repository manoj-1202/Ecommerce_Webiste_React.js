import React, { useState, useEffect } from 'react';
import { Radio, RadioGroup, FormControlLabel, Box, Typography, ListItemText, MenuItem, Snackbar} from '@mui/material';
import { AccountBalanceWallet, CreditCard, Money } from '@mui/icons-material';
import MuiAlert from '@mui/material/Alert';
import { StyledFormControl, StyledFormLabel, StyledList, StyledListItem, StyledListItemIcon, StyledPrimaryText, StyledSecondaryText, UpiFormContainer, UpiInput, StyledContainer, StyledGrid, StyledTextField, StyledButton } from '../../styles/productsStyles/paymentStyles';
import { useNavigate, useLocation } from 'react-router-dom';

const months = [
  '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12',
];

const years = [
  '2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031', '2032', '2033',
];

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

  // Retrieve the user ID from localStorage
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
      setSnackbarMessage('Payment success!');
      setSnackbarSeverity('success');
      setTimeout(() => {
        navigate('/transation');
      }, 1000);
     
    } else {
      setSnackbarMessage('User not logged in.');
      setSnackbarSeverity('error');
    }

    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const paymentOptions = [
    {
      value: 'upi',
      label: 'UPI',
      icon: <AccountBalanceWallet />,
      description: 'Pay by any UPI Id',
    },
    {
      value: 'card',
      label: 'Credit / Debit Card',
      icon: <CreditCard />,
      description: 'Add and secure cards',
    },
    {
      value: 'cod',
      label: 'Cash on Delivery',
      icon: <Money />,
      description: '',
    },
  ];

  return (
    <>
      <StyledFormControl component="fieldset">
        <StyledFormLabel component="legend">
          Choose Payment Method
        </StyledFormLabel>
        <RadioGroup
          aria-label="payment-method"
          name="payment-method"
          value={selectedValue}
          onChange={handleChange}
        >
          <StyledList>
            {paymentOptions.map((option) => (
              <StyledListItem key={option.value}>
                <StyledListItemIcon>{option.icon}</StyledListItemIcon>
                <ListItemText
                  primary={
                    <FormControlLabel
                      value={option.value}
                      control={<Radio />}
                      label={
                        <Box>
                          <StyledPrimaryText variant="body1">
                            {option.label}
                          </StyledPrimaryText>
                          {option.description && (
                            <StyledSecondaryText variant="body2">
                              {option.description}
                            </StyledSecondaryText>
                          )}
                        </Box>
                      }
                    />
                  }
                />
                {selectedValue === option.value && (
                  <Box mt={2}>
                    {option.value === 'upi' && (
                      <UpiFormContainer>
                        <Typography variant="body1">
                          Enter your UPI ID:
                        </Typography>
                        <Box display="flex" alignItems="center" mt={2}>
                          <UpiInput
                            fullWidth
                            variant="outlined"
                            value={upiId}
                            onChange={handleUpiIdChange}
                            placeholder="your-upi-id@bank"
                          />
                        </Box>
                      </UpiFormContainer>
                    )}
                    {option.value === 'card' && (
                      <StyledGrid container spacing={2}>
                        <StyledGrid item xs={12}>
                          <StyledTextField
                            fullWidth
                            variant="outlined"
                            name="number"
                            label="Card Number"
                            value={cardDetails.number}
                            onChange={handleCardDetailChange}
                          />
                        </StyledGrid>
                        <StyledGrid item xs={6}>
                          <StyledTextField
                            select
                            fullWidth
                            variant="outlined"
                            name="expiryMonth"
                            label="Expiry Month"
                            value={cardDetails.expiryMonth}
                            onChange={handleCardDetailChange}
                          >
                            {months.map((month) => (
                              <MenuItem key={month} value={month}>
                                {month}
                              </MenuItem>
                            ))}
                          </StyledTextField>
                        </StyledGrid>
                        <StyledGrid item xs={6}>
                          <StyledTextField
                            select
                            fullWidth
                            variant="outlined"
                            name="expiryYear"
                            label="Expiry Year"
                            value={cardDetails.expiryYear}
                            onChange={handleCardDetailChange}
                          >
                            {years.map((year) => (
                              <MenuItem key={year} value={year}>
                                {year}
                              </MenuItem>
                            ))}
                          </StyledTextField>
                        </StyledGrid>
                        <StyledGrid item xs={12}>
                          <StyledTextField
                            fullWidth
                            variant="outlined"
                            name="cvv"
                            label="CVV"
                            value={cardDetails.cvv}
                            onChange={handleCardDetailChange}
                          />
                        </StyledGrid>
                      </StyledGrid>
                    )}
                  </Box>
                )}
              </StyledListItem>
            ))}
          </StyledList>
        </RadioGroup>
      </StyledFormControl>

      <Box sx={{display:"flex",flexDirection:"column", alignItems:"center",justifyContent:"center"}}>
      <Typography variant="h5" align="center" marginY={1}>
        Total Amount: ₹{totalAmount}
      </Typography>
      <StyledContainer>
        <StyledButton onClick={handlePayNow} variant="contained" color="primary">
          Pay Now
        </StyledButton>
      </StyledContainer>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
      >
        <MuiAlert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default PaymentOptions;