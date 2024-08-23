import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const UpiBox = styled(Box)(({ theme }) => ({
  width: '30%',
  marginLeft: '70%',
  padding: '10px',
  borderRadius: '8px',
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],

  [theme.breakpoints.down('sm')]: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginLeft: '0%',
    padding: '12px',
    backgroundColor: theme.palette.background.default,
    boxShadow: theme.shadows[1],
  },
}));

export const CardBox = styled(Box)(({ theme }) => ({
  width: '40%',
  marginLeft: '30%',
  padding: '10px',
  borderRadius: '8px',
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],

  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: '0%',
    padding: '12px',
    backgroundColor: theme.palette.background.default,
    boxShadow: theme.shadows[1],
  },
}));
