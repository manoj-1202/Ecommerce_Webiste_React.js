import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const UpiBox = styled(Box)(({ theme }) => ({
  width: '85%',
  display: 'flex',
  justifyContent: 'center',
    alignItems: 'center',
    padding:"10px",
  borderRadius: '8px',
  boxShadow: theme.shadows[1],
  

  [theme.breakpoints.down('sm')]: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginLeft: '0%',
    padding: '12px',
    boxShadow: theme.shadows[1],
   
    
  },
}));

export const CardBox = styled(Box)(({ theme }) => ({
  width:"400px",
  padding: '10px',
  borderRadius: '8px',
  boxShadow: theme.shadows[1],

  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: '0%',
    padding: '12px',
    boxShadow: theme.shadows[1],
  
    
  },
}));
