import {
  Box,
  Container,
  Typography,
  Stack,
  Avatar,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

const TrustSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4, 0),
  backgroundColor: '#f8f9fa',
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(8, 0),
  },
}));

const MetricCard = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(1),
  position: 'relative',
  '&:not(:last-child)::after': {
    content: '""',
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    width: '1px',
    height: '60%',
    backgroundColor: '#e0e0e0',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));

const CompanyLogo = styled('img')(({ theme }) => ({
  width: 150,  // Bigger default width
  height: 100, // Bigger default height
  objectFit: 'contain',
  flexShrink: 0,
  filter: 'grayscale(100%) opacity(0.7)',
  transition: 'filter 0.3s ease, transform 0.3s ease',
  '&:hover': {
    filter: 'grayscale(0%) opacity(1)',
    transform: 'scale(1.05)', // Slight zoom effect on hover
  },

  // Small screens
  [theme.breakpoints.up('sm')]: {
    width: 130,
    height: 80,
  },

  // Medium screens
  [theme.breakpoints.up('md')]: {
    width: 170,
    height: 110,
  },

  // Large screens
  [theme.breakpoints.up('lg')]: {
    width: 200,
    height: 130,
  },
}));


const InfiniteScrollContainer = styled(Box)(({ theme }) => ({
  overflow: 'hidden',
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent:"space-around",
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '50px',
    height: '100%',
    background: 'linear-gradient(to right, #f8f9fa, transparent)',
    zIndex: 2,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    width: '50px',
    height: '100%',
    background: 'linear-gradient(to left, #f8f9fa, transparent)',
    zIndex: 2,
  },
}));


const ScrollingContent = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between", // Distribute logos evenly
  alignItems: "center",
  width: "100%", // Always cover full width
  animationTimingFunction: "linear",
  animationIterationCount: "infinite",
  animationFillMode: "forwards",
  animationName: "marquee",
  "&:hover": {
    animationPlayState: "paused",
  },
  "@keyframes marquee": {
    "0%": {
      transform: "translateX(0)",
    },
    "100%": {
      transform: "translateX(-104%)",
    },
  },
}));


const companies = [
  { name: 'Amazon', logo: 'https://logos-world.net/wp-content/uploads/2020/04/Amazon-Logo.png' },
  { name: 'Google', logo: 'https://logos-world.net/wp-content/uploads/2020/09/Google-Logo.png' },
  { name: 'IBM', logo: 'https://logos-world.net/wp-content/uploads/2020/09/IBM-Logo.png' },
  { name: 'Netflix', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png' },
  { name: 'Ernst & Young', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/EY_logo_2019.svg/1024px-EY_logo_2019.svg.png' },
  { name: 'KPMG', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGncmprKJx4GqdC2g3f0aEHkYSOB2T6aufLw&s' },
];

export default function HomeTrustMetrics() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <TrustSection>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            gap: { xs: 4, md: 6 },
          }}
        >
          <Box
            sx={{
              flex: { xs: '1', md: '0 0 33.333%' },
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            <Typography
              variant={isMobile ? "h6" : "h4"}
              sx={{
                fontWeight: 600,
                color: '#333',
                lineHeight: 1.3,
                mb: { xs: 3, md: 0 },
                fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem', lg: '1.7rem' },
                maxWidth: { xs: '100%', md: '400px' },
              }}
            >
              For over 30 years, LoopNet has been the trusted brand for{' '}
              <Box component="span" sx={{ display: { xs: 'block', sm: 'inline' } }}>
                Commercial Real Estate
              </Box>
            </Typography>
          </Box>

          <Box
            sx={{
              flex: { xs: '1', md: '0 0 66.667%' },
              width: '100%',
            }}
          >
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(3, 1fr)',
                },
                gap: { xs: 2, sm: 3, md: 4 },
              }}
            >
              <MetricCard>
                <Typography
                  variant={isMobile ? "h4" : "h3"}
                  sx={{
                    fontWeight: 700,
                    color: '#000',
                    mb: 0.5,
                    fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
                    lineHeight: 1.1,
                  }}
                >
                  300K+
                </Typography>
                <Typography 
                  variant="body2"
                  sx={{ 
                    color: '#666',
                    fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                    fontWeight: 400,
                  }}
                >
                  Active Listings
                </Typography>
              </MetricCard>
              
              <MetricCard>
                <Typography
                  variant={isMobile ? "h4" : "h3"}
                  sx={{
                    fontWeight: 700,
                    color: '#000',
                    mb: 0.5,
                    fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
                    lineHeight: 1.1,
                  }}
                >
                  13M+
                </Typography>
                <Typography 
                  variant="body2"
                  sx={{ 
                    color: '#666',
                    fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                    fontWeight: 400,
                  }}
                >
                  Monthly Visitors
                </Typography>
              </MetricCard>
              
              <MetricCard>
                <Typography
                  variant={isMobile ? "h4" : "h3"}
                  sx={{
                    fontWeight: 700,
                    color: '#000',
                    mb: 0.5,
                    fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
                    lineHeight: 1.1,
                  }}
                >
                  $520B+ CAD
                </Typography>
                <Typography 
                  variant="body2"
                  sx={{ 
                    color: '#666',
                    fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                    fontWeight: 400,
                  }}
                >
                  In Transaction Value
                </Typography>
              </MetricCard>
            </Box>
          </Box>
        </Box>

        <Box sx={{ mt: { xs: 4, md: 6 }, textAlign: 'center' }}>
          <Typography
            variant={isMobile ? "body1" : "h6"}
            sx={{
              mb: { xs: 3, md: 4 },
              color: '#666',
              fontWeight: 500,
              fontSize: { xs: '0.9rem', sm: '1rem' },
            }}
          >
            Companies actively searching on LoopNet
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 4, sm: 5 } }}>
            {/* First line - moves right to left */}
            <InfiniteScrollContainer>
            <ScrollingContent sx={{ animationDuration: "20s" }}>
              {[...companies].map((company, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flex: 1, // Makes logos evenly distributed
                  }}
                >
                  <CompanyLogo
                    src={company.logo}
                    alt={company.name}
                    style={{ height: 40, objectFit: "contain" }}
                  />
                </Box>
              ))}
              {[...companies].map((company, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flex: 1, // Makes logos evenly distributed
                  }}
                >
                  <CompanyLogo
                    src={company.logo}
                    alt={company.name}
                    style={{ height: 40, objectFit: "contain" }}
                  />
                </Box>
              ))}
            </ScrollingContent>
            </InfiniteScrollContainer>
          </Box>
        </Box>
      </Container>
    </TrustSection>
  );
}
