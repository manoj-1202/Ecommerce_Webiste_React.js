import React, { useState } from 'react';
import { Grid, Box, Typography, TextField, Button, Container, Snackbar, Alert } from '@mui/material';
import { LocationOn, Phone, Email } from '@mui/icons-material';
import emailjs from 'emailjs-com';
import { useUser } from './UserContext'; 

const ContactUs = () => {
  const { user } = useUser(); 
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errorOpen, setErrorOpen] = useState(false);
  const [notLoggedInOpen, setNotLoggedInOpen] = useState(false); 

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!user) {
      setNotLoggedInOpen(true);
      return;
    }

    console.log("Sending the following data:", formData); 

    emailjs.send(
      'service_hq3cbqm',  //service id
      'template_3cb77ma', // template id
      formData,
      'asDhf4VWP04Z1Qc7J' //api id
    ).then((result) => {
      console.log('Email successfully sent!', result);
      setOpen(true);
      setFormData({ name: '', email: '', message: '' }); 
    }, (error) => {
      console.error('Failed to send email:', error);
      setErrorOpen(true);
    });
  };

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    setErrorOpen(false);
    setNotLoggedInOpen(false); 
  };

  return (
    <Container maxWidth="lg" sx={{ marginBottom: 4 }}>
      <Grid container spacing={4} sx={{ marginTop: 4 }}>
        <Grid item xs={12} md={6}>
          <Box sx={{ backgroundColor: '#f5f5f5', padding: 4 }}>
            <Typography variant="h4" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body1" paragraph>
              We're here to answer your questions and discuss the decentralized future of the internet.
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
              <LocationOn sx={{ marginRight: 1 }} />
              <Typography variant="body2">My Bags , Coimbatore , 641002 , Tamil Nadu</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
              <Phone sx={{ marginRight: 1 }} />
              <Typography variant="body2">+91 555-333-555</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Email sx={{ marginRight: 1 }} />
              <Typography variant="body2">mybags@gmail.com</Typography>
            </Box>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={6}>
        
          <Box
            component="form"
            sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
            onSubmit={handleSubmit}
          >
            <Typography variant='h5'>Feedback :</Typography>
            <TextField
              required
              id="name"
              name="name"
              label="Your Name"
              variant="outlined"
              fullWidth
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              required
              id="email"
              name="email"
              label="Email Address"
              variant="outlined"
              fullWidth
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              required
              id="message"
              name="message"
              label="Feedback"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              value={formData.message}
              onChange={handleChange}
            />
            <Button type="submit" variant="contained" sx={{ backgroundColor: 'blue' }}>
              Submit
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Your message has been sent!
        </Alert>
      </Snackbar>

      <Snackbar open={errorOpen} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Failed to send your message. Please try again later.
        </Alert>
      </Snackbar>

      <Snackbar open={notLoggedInOpen} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
          You need to log in to send a Feedback.
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ContactUs;
