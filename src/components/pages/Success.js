import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, IconButton, Zoom, Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';

const Success = () => {
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loadingContinue, setLoadingContinue] = useState(false);
  const [loadingInvoice, setLoadingInvoice] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setShowSuccess(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleContinueShopping = () => {
    setLoadingContinue(true);
    setTimeout(() => {
      setLoadingContinue(false);
      navigate('/');
    }, 1000);
  };

  const handleViewInvoice = () => {
    setLoadingInvoice(true);
    setTimeout(() => {
      setLoadingInvoice(false);
      navigate('/transation');
    }, 1000);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: loading ? 'white' : 'blue',
        flexDirection: 'column',
        padding: '0 16px',
        transition: 'background-color 0.9s ease',
      }}
    >
      {loading && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <CircularProgress color="inherit" size={70} />
          <Typography
            variant="h6"
            sx={{ marginTop: '20px', color: 'gray', textAlign: 'center' }}
          >
            Processing...
          </Typography>
        </Box>
      )}

      <Zoom in={showSuccess} style={{ transitionDelay: showSuccess ? '600ms' : '0ms' }}>
        <Box
          sx={{
            display: showSuccess ? 'flex' : 'none',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            color: '#fff',
            bgcolor: 'blue',
            padding: { xs: '16px', sm: '20px' },
            borderRadius: '8px',
            transform: showSuccess ? 'scale(1)' : 'scale(0.9)',
            transition: 'transform 0.5s ease',
            maxWidth: '90vw',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          <IconButton size="large">
            <CheckCircleIcon sx={{ fontSize: { xs: 60, sm: 80, md: 100 }, color: 'lightgreen' }} />
          </IconButton>
          <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>
            Order Placed
          </Typography>
          <Typography variant="h6" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
            Your Order is On The Way
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
            Thank You!
          </Typography>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: '16px',
              marginTop: '20px',
              flexDirection: { xs: 'column', sm: 'row' },
              width: '100%',
            }}
          >
            <Button
              variant="outlined"
              color="inherit"
              onClick={handleContinueShopping}
              disabled={loadingContinue}
              startIcon={loadingContinue && <CircularProgress size={20} />}
              sx={{
                fontSize: { xs: '0.8rem', sm: '1rem' },
                width: { xs: '100%', sm: 'auto' },
              }}
            >
              {loadingContinue ? 'Loading...' : 'Continue Shopping'}
            </Button>

            <Button
              variant="outlined"
              color="inherit"
              onClick={handleViewInvoice}
              disabled={loadingInvoice}
              startIcon={loadingInvoice && <CircularProgress size={20} />}
              sx={{
                fontSize: { xs: '0.8rem', sm: '1rem' },
                width: { xs: '100%', sm: 'auto' },
              }}
            >
              {loadingInvoice ? 'Loading...' : 'See Invoice'}
            </Button>
          </Box>
        </Box>
      </Zoom>
    </Box>
  );
};

export default Success;
