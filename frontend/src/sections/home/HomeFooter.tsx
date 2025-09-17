import {
  Box,
  Container,
  Typography,
  Grid,
  Link,
  Stack,
  Divider,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

// ----------------------------------------------------------------------

const FooterSection = styled(Box)(({ theme }) => ({
  backgroundColor: '#1a1a1a',
  color: 'white',
  padding: theme.spacing(6, 0, 2),
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: '#ccc',
  textDecoration: 'none',
  fontSize: '0.875rem',
  '&:hover': {
    color: 'white',
    textDecoration: 'underline',
  },
}));

const FooterTitle = styled(Typography)(({ theme }) => ({
  color: 'white',
  fontWeight: 600,
  fontSize: '0.875rem',
  marginBottom: theme.spacing(2),
}));

const footerLinks = {
  search: [
    'Properties For Sale',
    'Properties For Lease',
    'Auctions',
    'Businesses For Sale',
    'International',
  ],
  products: [
    'Advertise With Us',
    'Showcase',
    'LoopNet Pro',
    'CoStar',
    'Apartments.com',
  ],
  marketplace: [
    'Office Buildings',
    'Retail Properties',
    'Industrial Properties',
    'Land',
    'Multifamily',
  ],
  resources: [
    'Market Research',
    'Broker Directory',
    'Space Calculator',
    'Commercial Real Estate News',
    'Investment Calculator',
  ],
  company: [
    'About Us',
    'Contact Us',
    'Careers',
    'Press',
    'Investor Relations',
  ],
};

export default function HomeFooter() {
  return (
    <FooterSection>
      <Container maxWidth="lg">
        {/* Top Navigation Tabs */}
        <Box sx={{ mb: 4 }}>
          <Stack
            direction="row"
            spacing={4}
            sx={{
              flexWrap: 'wrap',
              gap: 2,
            }}
          >
            {['For Sale', 'For Lease', 'Coworking', 'Auctions', 'Businesses For Sale', 'International'].map((tab) => (
              <FooterLink key={tab} href="#">
                {tab}
              </FooterLink>
            ))}
          </Stack>
        </Box>

        {/* Main Footer Content */}
        <Grid container spacing={4} sx={{ mb: 4 }}>
          {Object.entries(footerLinks).map(([category, links]) => (
            <Grid item xs={12} sm={6} md={2.4} key={category}>
              <FooterTitle variant="h6">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </FooterTitle>
              <Stack spacing={1}>
                {links.map((link) => (
                  <FooterLink key={link} href="#">
                    {link}
                  </FooterLink>
                ))}
              </Stack>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ backgroundColor: '#333', mb: 4 }} />

        {/* Bottom Footer */}
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: '#d32f2f',
                  mr: 1,
                }}
              >
                Loop
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: '#1976d2',
                }}
              >
                Net
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Stack direction="row" spacing={2} justifyContent="center">
              <IconButton
                sx={{
                  color: '#ccc',
                  '&:hover': {
                    color: '#0077b5',
                  },
                }}
              >
                <LinkedInIcon />
              </IconButton>
              <IconButton
                sx={{
                  color: '#ccc',
                  '&:hover': {
                    color: '#1877f2',
                  },
                }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                sx={{
                  color: '#ccc',
                  '&:hover': {
                    color: '#e4405f',
                  },
                }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                sx={{
                  color: '#ccc',
                  '&:hover': {
                    color: '#1da1f2',
                  },
                }}
              >
                <TwitterIcon />
              </IconButton>
            </Stack>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: { xs: 'center', md: 'right' } }}>
              <Typography
                variant="body2"
                sx={{
                  color: '#999',
                  mb: 1,
                }}
              >
                © 2025 CoStar Group
              </Typography>
              <Stack
                direction="row"
                spacing={2}
                justifyContent={{ xs: 'center', md: 'flex-end' }}
              >
                <Box
                  component="img"
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="Download on the App Store"
                  sx={{ height: 40 }}
                />
                <Box
                  component="img"
                  src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                  alt="Get it on Google Play"
                  sx={{ height: 40 }}
                />
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </FooterSection>
  );
}
