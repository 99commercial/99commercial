import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Stack,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CampaignIcon from '@mui/icons-material/Campaign';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import BusinessIcon from '@mui/icons-material/Business';

// ----------------------------------------------------------------------

const BenefitsSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  backgroundImage: 'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(25, 118, 210, 0.9)',
  },
}));

const BenefitCard = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  color: 'white',
  position: 'relative',
  zIndex: 1,
}));

const benefits = [
  {
    icon: CampaignIcon,
    title: 'Right Audience',
    description: '96% of the Fortune 1000 search on LoopNet',
  },
  {
    icon: CameraAltIcon,
    title: 'Engage Prospects',
    description: 'Stunning photography, video and drone shots',
  },
  {
    icon: BusinessIcon,
    title: 'More Opportunity',
    description: 'Find a tenant or buyer, faster than before',
  },
];

export default function HomeBenefits() {
  return (
    <BenefitsSection>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6, position: 'relative', zIndex: 1 }}>
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 700,
              color: 'white',
              mb: 4,
            }}
          >
            99Commercial Listings Lease or Sell 14% Faster*
          </Typography>
        </Box>

        <Grid container spacing={6} sx={{ mb: 6 }}>
          {benefits.map((benefit, index) => (
            <Grid item xs={12} md={4} key={index}>
              <BenefitCard>
                <benefit.icon
                  sx={{
                    fontSize: 64,
                    mb: 3,
                    color: 'white',
                  }}
                />
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 600,
                    mb: 2,
                    color: 'white',
                  }}
                >
                  {benefit.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    lineHeight: 1.6,
                  }}
                >
                  {benefit.description}
                </Typography>
              </BenefitCard>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: '#d32f2f',
              color: 'white',
              fontWeight: 600,
              px: 4,
              py: 2,
              fontSize: '1.1rem',
              '&:hover': {
                backgroundColor: '#b71c1c',
              },
            }}
          >
            Explore Marketing Solutions
          </Button>
        </Box>

        <Box sx={{ textAlign: 'center', mt: 4, position: 'relative', zIndex: 1 }}>
          <Typography
            variant="caption"
            sx={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '0.75rem',
            }}
          >
            *Based on internal analysis comparing properties advertised on LoopNet to properties listed only on CoStar.
          </Typography>
        </Box>
      </Container>
    </BenefitsSection>
  );
}
