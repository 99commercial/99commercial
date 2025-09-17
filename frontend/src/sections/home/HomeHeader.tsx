import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from '@mui/material';
import { styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

const TopBar = styled(Box)(({ theme }) => ({
  backgroundColor: '#1976d2',
  color: 'white',
  padding: theme.spacing(1, 0),
  fontSize: '0.875rem',
}));

const MainHeader = styled(AppBar)(({ theme }) => ({
  backgroundColor: 'white',
  color: '#333',
  boxShadow: 'none',
  borderBottom: '1px solid #e0e0e0',
}));

const Logo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  '& .loop': {
    color: '#d32f2f',
    fontWeight: 700,
    fontSize: '1.5rem',
  },
  '& .net': {
    color: '#1976d2',
    fontWeight: 700,
    fontSize: '1.5rem',
  },
  '& .icon': {
    width: 24,
    height: 24,
    backgroundColor: '#d32f2f',
    marginRight: theme.spacing(1),
    borderRadius: 2,
  },
}));

export default function HomeHeader() {
  return (
    <>
      <TopBar>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button
              variant="contained"
              size="small"
              sx={{
                backgroundColor: '#d32f2f',
                color: 'white',
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: '#b71c1c',
                },
              }}
            >
              Log In
            </Button>
            <Button
              variant="outlined"
              size="small"
              sx={{
                borderColor: 'white',
                color: 'white',
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              Advertise
            </Button>
          </Box>
        </Container>
      </TopBar>

      <MainHeader position="static">
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between', py: 2 }}>
            <Logo>
              <Box className="icon" />
              <Typography className="loop">Loop</Typography>
              <Typography className="net">Net</Typography>
            </Logo>
          </Toolbar>
        </Container>
      </MainHeader>
    </>
  );
}
