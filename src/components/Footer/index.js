import { Box, Container, Grid, Typography,  IconButton,  styled } from '@mui/material';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const FooterWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: '#1c2331',
  color: '#ffffff',
  padding: theme.spacing(4, 0),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(4, 0),
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  marginBottom: theme.spacing(2),
}));

const FooterLink = styled(Typography)(({ theme }) => ({
  color: '#ffffff',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}));


const SocialIcon = styled(IconButton)(({ theme }) => ({
  color: '#ffffff',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
}));

const Footer = () => {
 

  return (
    <FooterWrapper component="footer">
      <Container maxWidth="lg" >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3} >
            <SectionTitle variant="h6">About Us</SectionTitle>
            <Typography variant="body2">
            We blend style and functionality with our  bag collection. From luxurious leather to versatile travel options, each piece is crafted with meticulous attention to detail.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <SectionTitle variant="h6">Quick Links</SectionTitle>
            <Box component="nav">
  <FooterLink variant="body2" component={Link} to="/">Home</FooterLink>
  <br />
  <FooterLink variant="body2" component={Link} to="/products">Products</FooterLink>
  <br />
  <FooterLink variant="body2" component={Link} to="/contact-us">Contact</FooterLink>
  <br />
  <FooterLink variant="body2" component={Link} to="/login">Login</FooterLink>
</Box>

          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <SectionTitle variant="h6">Contact Us</SectionTitle>
            <Typography variant="body2">
            My Bags , Coimbatore ,Tamil Nadu
            </Typography>
            
            <Typography variant="body2">
              Phone: +91 555-333-555
            </Typography>
           
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <SectionTitle variant="h6">Mail Us</SectionTitle>
            <Typography variant="body2">
              Email: mybags@gmail.com
            </Typography>
            <Box mt={1}>
            <SocialIcon aria-label="Facebook" component="a" href="https://www.facebook.com/login/">
              <FaFacebook />
            </SocialIcon>
            <SocialIcon aria-label="Twitter" component="a" href="https://x.com/i/flow/login">
              <FaTwitter />
            </SocialIcon>
            <SocialIcon aria-label="Instagram" component="a" href="https://www.linkedin.com/in/manoj-k-dev/">
              <FaInstagram />
            </SocialIcon>
            <SocialIcon aria-label="LinkedIn" component="a" href="#">
              <FaLinkedin />
            </SocialIcon>
          </Box>
          </Grid>
        </Grid>
       
      </Container>
    </FooterWrapper>
  );
};

export default Footer;