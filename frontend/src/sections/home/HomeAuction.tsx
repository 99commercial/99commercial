import {
  Box,
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Stack,
  Chip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// ----------------------------------------------------------------------

const AuctionSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6, 0),
  background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, rgba(211, 47, 47, 0.02) 0%, rgba(25, 118, 210, 0.02) 100%)',
    zIndex: 0,
  },
}));

const AuctionCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(3),
  overflow: 'hidden',
  height: '100%',
  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  zIndex: 1,
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 30px 60px rgba(0,0,0,0.15)',
  },
}));

const LiveAuctionButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #d32f2f 30%, #ff5722 90%)',
  color: 'white',
  borderRadius: theme.spacing(2),
  px: 4,
  py: 2,
  fontWeight: 700,
  textTransform: 'none',
  fontSize: '1rem',
  boxShadow: '0 8px 20px rgba(211, 47, 47, 0.3)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(45deg, #b71c1c 30%, #e64a19 90%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 12px 30px rgba(211, 47, 47, 0.4)',
  },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  padding: theme.spacing(2, 0),
}));

export default function HomeAuction() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <AuctionSection>
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
            gap: { xs: 4, md: 6, lg: 8 },
            alignItems: 'center',
            minHeight: { xs: 'auto', md: '600px' },
          }}
        >
          {/* Card Section */}
          <Box sx={{ flex: { xs: '1', lg: '1' }, width: { xs: '100%', lg: '50%' } }}>
            <AuctionCard>
              <Box sx={{ position: 'relative' }}>
                <CardMedia
                  component="img"
                  height={isMobile ? "300" : isTablet ? "350" : "450"}
                  image="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Retail Property"
                  sx={{
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: { xs: 12, md: 20 },
                    left: { xs: 12, md: 20 },
                    zIndex: 1,
                  }}
                >
                  <Chip
                    label="Live Auction"
                    sx={{
                      background: 'linear-gradient(45deg, #d32f2f 30%, #ff5722 90%)',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: { xs: '0.75rem', md: '0.875rem' },
                      px: 2,
                      py: 1,
                      boxShadow: '0 4px 12px rgba(211, 47, 47, 0.3)',
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: { xs: 12, md: 20 },
                    left: { xs: 12, md: 20 },
                    right: { xs: 12, md: 20 },
                    zIndex: 1,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <LocationOnIcon sx={{ color: 'white', mr: 1, fontSize: { xs: '1.2rem', md: '1.5rem' } }} />
                    <Typography
                      variant={isMobile ? "subtitle1" : "h6"}
                      sx={{
                        color: 'white',
                        fontWeight: 700,
                        textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                        fontSize: { xs: '1rem', md: '1.25rem' },
                      }}
                    >
                      Retail, Lynchburg, VA
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TrendingUpIcon sx={{ color: '#4caf50', mr: 1, fontSize: { xs: '1rem', md: '1.2rem' } }} />
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'white',
                        fontWeight: 600,
                        textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                        fontSize: { xs: '0.875rem', md: '1rem' },
                      }}
                    >
                      Starting at $2.5M
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                <Button
                  variant="outlined"
                  endIcon={<ArrowForwardIcon />}
                  fullWidth
                  sx={{
                    borderColor: '#d32f2f',
                    color: '#d32f2f',
                    fontWeight: 600,
                    py: 1.5,
                    borderRadius: 2,
                    fontSize: { xs: '0.875rem', md: '1rem' },
                    '&:hover': {
                      borderColor: '#b71c1c',
                      backgroundColor: 'rgba(211, 47, 47, 0.04)',
                      transform: 'translateY(-1px)',
                    },
                  }}
                >
                  View Details
                </Button>
              </CardContent>
            </AuctionCard>
          </Box>

          {/* Content Section */}
          <Box sx={{ flex: { xs: '1', lg: '1' }, width: { xs: '100%', lg: '50%' } }}>
            <ContentBox sx={{ pl: { xs: 0, lg: 4 } }}>
              <Typography
                variant={isMobile ? "h4" : isTablet ? "h3" : "h2"}
                component="h2"
                sx={{
                  fontWeight: 800,
                  mb: { xs: 2, md: 3 },
                  color: '#1a1a1a',
                  lineHeight: 1.2,
                  background: 'linear-gradient(45deg, #1a1a1a 30%, #d32f2f 90%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Discover Your Next Investment at Auction
              </Typography>

              <Typography
                variant={isMobile ? "body2" : "body1"}
                sx={{
                  color: '#555',
                  lineHeight: 1.7,
                  mb: { xs: 3, md: 4 },
                  fontSize: { xs: '1rem', md: '1.125rem' },
                }}
              >
                Access exclusive commercial real estate auctions with properties that offer 
                exceptional value and investment opportunities. Our auction platform connects 
                you with motivated sellers and unique properties not available through traditional 
                channels.
              </Typography>

              <Stack spacing={{ xs: 2, md: 3 }}>
                <Button
                  variant="text"
                  sx={{
                    color: '#d32f2f',
                    textAlign: 'left',
                    justifyContent: 'flex-start',
                    p: 0,
                    fontWeight: 600,
                    fontSize: { xs: '0.875rem', md: '1rem' },
                    '&:hover': {
                      backgroundColor: 'transparent',
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Learn More About Auctions →
                </Button>

                <LiveAuctionButton
                  startIcon={<AccessTimeIcon />}
                  endIcon={<ArrowForwardIcon />}
                  fullWidth={isMobile}
                  sx={{
                    fontSize: { xs: '0.875rem', md: '1rem' },
                    py: { xs: 1.5, md: 2 },
                  }}
                >
                  Live Auction Now
                </LiveAuctionButton>

                <Button
                  variant="outlined"
                  fullWidth={isMobile}
                  sx={{
                    borderColor: '#d32f2f',
                    color: '#d32f2f',
                    fontWeight: 600,
                    py: { xs: 1.5, md: 2 },
                    borderRadius: 2,
                    fontSize: { xs: '0.875rem', md: '1rem' },
                    '&:hover': {
                      borderColor: '#b71c1c',
                      backgroundColor: 'rgba(211, 47, 47, 0.04)',
                      transform: 'translateY(-1px)',
                    },
                  }}
                >
                  See Available Listings
                </Button>
              </Stack>
            </ContentBox>
          </Box>
        </Box>
      </Container>
    </AuctionSection>
  );
}
