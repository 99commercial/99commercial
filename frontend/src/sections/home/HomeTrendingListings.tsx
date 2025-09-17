import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Card,
  CardMedia,
  CardContent,
  Chip,
  IconButton,
  Stack,
  Link,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

// ----------------------------------------------------------------------

const TrendingSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6, 0),
  backgroundColor: '#f8f9fa',
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(8, 0),
  },
}));

const PropertyCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.spacing(1.5),
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#ffffff',
  border: '1px solid #e0e0e0',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
    borderColor: '#000000',
  },
}));

const PropertyImage = styled(CardMedia)(({ theme }) => ({
  height: 200,
  position: 'relative',
  [theme.breakpoints.down('sm')]: {
    height: 180,
  },
  [theme.breakpoints.up('md')]: {
    height: 220,
  },
}));

const CategoryChip = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  left: theme.spacing(1),
  zIndex: 1,
  fontWeight: 600,
  fontSize: '0.75rem',
  backgroundColor: '#000000',
  color: '#ffffff',
  '&:hover': {
    backgroundColor: '#333333',
  },
}));

const FavoriteButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  zIndex: 1,
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  color: '#666666',
  '&:hover': {
    backgroundColor: '#ffffff',
    color: '#000000',
  },
}));

const mockProperties = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    category: 'Office',
    categoryColor: '#1976d2',
    price: 'From £45 SF/YR',
    address: '123 Business Ave, London, UK',
    size: 'Up to 15,000 SF',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    category: 'Coworking',
    categoryColor: '#7b1fa2',
    price: 'From £35 SF/YR',
    address: '456 Innovation St, Manchester, UK',
    size: 'Up to 8,000 SF',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    category: 'Retail',
    categoryColor: '#d32f2f',
    price: 'From £25 SF/YR',
    address: '789 Shopping Blvd, Birmingham, UK',
    size: 'Up to 12,000 SF',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    category: 'Restaurant',
    categoryColor: '#f57c00',
    price: 'From £30 SF/YR',
    address: '321 Food Court, Liverpool, UK',
    size: 'Up to 3,000 SF',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    category: 'Land',
    categoryColor: '#388e3c',
    price: 'From £2.5M AC',
    address: '654 Development Rd, Leeds, UK',
    size: 'Up to 50 AC',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    category: 'Medical',
    categoryColor: '#0288d1',
    price: 'From £55 SF/YR',
    address: '987 Health Plaza, Bristol, UK',
    size: 'Up to 10,000 SF',
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    category: 'Industrial',
    categoryColor: '#388e3c',
    price: 'From £15 SF/YR',
    address: '147 Warehouse Way, Sheffield, UK',
    size: 'Up to 25,000 SF',
  },
  {
    id: 8,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    category: 'Flex',
    categoryColor: '#f57c00',
    price: 'From £40 SF/YR',
    address: '258 Mixed Use Ave, Newcastle, UK',
    size: 'Up to 18,000 SF',
  },
];

export default function HomeTrendingListings() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <TrendingSection>
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          sx={{ mb: 4, gap: 2 }}
        >
          <Typography 
            variant="h4" 
            component="h2" 
            fontWeight={700}
            sx={{
              color: '#000000',
              fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
            }}
          >
            Trending on LoopNet
          </Typography>
          <Link
            href="#"
            sx={{
              color: '#000000',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.95rem',
              borderBottom: '2px solid transparent',
              transition: 'all 0.3s ease',
              '&:hover': {
                borderBottomColor: '#000000',
                color: '#333333',
              },
            }}
          >
            See More
          </Link>
        </Stack>

        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            mb: 4,
            '& .MuiTab-root': {
              fontWeight: 600,
              textTransform: 'none',
              fontSize: { xs: '0.9rem', sm: '1rem' },
              color: '#666666',
              minHeight: 48,
              padding: '12px 24px',
              '&:hover': {
                color: '#000000',
                backgroundColor: '#f5f5f5',
              },
            },
            '& .Mui-selected': {
              color: '#000000 !important',
              backgroundColor: '#ffffff',
              border: '1px solid #e0e0e0',
              borderBottom: 'none',
            },
            '& .MuiTabs-indicator': {
              display: 'none',
            },
            '& .MuiTabs-flexContainer': {
              gap: 1,
            },
          }}
        >
          <Tab label="For Lease" />
          <Tab label="For Sale" />
          <Tab label="Auctions" />
        </Tabs>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)',
            },
            gap: { xs: 2, sm: 3 },
          }}
        >
          {mockProperties.map((property) => (
            <PropertyCard key={property.id}>
              <Box sx={{ position: 'relative', flex: '0 0 auto' }}>
                <PropertyImage
                  image={property.image}
                  title={property.category}
                />
                <CategoryChip
                  label={property.category}
                  size="small"
                  sx={{
                    backgroundColor: '#000000',
                    color: '#ffffff',
                    position: 'absolute',
                    top: 8,
                    left: 8,
                    zIndex: 1,
                  }}
                />
                <FavoriteButton 
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    zIndex: 1,
                  }}
                >
                  <FavoriteBorderIcon fontSize="small" />
                </FavoriteButton>
              </Box>
              <CardContent 
                sx={{ 
                  p: { xs: 1.5, sm: 2 },
                  flex: '1 1 auto',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: '#000000',
                      mb: 1,
                      fontSize: { xs: '1rem', sm: '1.1rem' },
                      lineHeight: 1.2,
                    }}
                  >
                    {property.price}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#333333',
                      mb: 1,
                      fontWeight: 500,
                      fontSize: { xs: '0.85rem', sm: '0.9rem' },
                      lineHeight: 1.4,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {property.address}
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#666666',
                    fontSize: { xs: '0.8rem', sm: '0.85rem' },
                    fontWeight: 400,
                    mt: 'auto',
                  }}
                >
                  {property.size}
                </Typography>
              </CardContent>
            </PropertyCard>
          ))}
        </Box>
      </Container>
    </TrendingSection>
  );
}
