import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Tabs,
  Tab,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  Card,
  CardContent,
  Stack,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import BusinessIcon from '@mui/icons-material/Business';
import StoreIcon from '@mui/icons-material/Store';
import FactoryIcon from '@mui/icons-material/Factory';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import WorkIcon from '@mui/icons-material/Work';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LandscapeIcon from '@mui/icons-material/Landscape';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// ----------------------------------------------------------------------

const HeroSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: '60vh',
  backgroundImage: 'url("https://www.keytel.in/property-blog/wp-content/uploads/2022/06/commercial.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(4, 2),
  marginTop: 0,
  zIndex: 1, // Ensure it's below the navbar
  [theme.breakpoints.down('sm')]: {
    minHeight: '100vh',
    padding: theme.spacing(2, 1),
  },
  [theme.breakpoints.up('sm')]: {
    minHeight: '80vh',
    padding: theme.spacing(3, 2),
  },
  [theme.breakpoints.up('md')]: {
    minHeight: '60vh',
    padding: theme.spacing(4, 2),
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
}));

const SearchContainer = styled(Paper)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  padding: theme.spacing(3, 4),
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(20px)', 
  borderRadius: theme.spacing(4),
  maxWidth: 900,
  width: '100%',
  margin: '0 auto',
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15), 0 8px 25px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(0, 0, 0, 0.08)',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2, 2),
    borderRadius: theme.spacing(2),
    maxWidth: '100%',
  },
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(2.5, 3),
    borderRadius: theme.spacing(3),
    maxWidth: 700,
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(3, 4),
    borderRadius: theme.spacing(4),
    maxWidth: 900,
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: theme.spacing(4),
    background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.02) 100%)',
    pointerEvents: 'none',
    [theme.breakpoints.down('sm')]: {
      borderRadius: theme.spacing(2),
    },
    [theme.breakpoints.up('sm')]: {
      borderRadius: theme.spacing(3),
    },
    [theme.breakpoints.up('md')]: {
      borderRadius: theme.spacing(4),
    },
  },
}));

const PropertyTypeCard = styled(Card)(({ theme }) => ({
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  backgroundColor: 'transparent',
  boxShadow: 'none',
  border: '2px solid transparent',
  borderRadius: theme.spacing(2),
  minHeight: 110,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    transform: 'translateY(-3px)',
    border: '2px solid #000',
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
  },
  '&:active': {
    transform: 'translateY(-1px) scale(0.98)',
  },
  '&.selected': {
    border: '2px solid #000',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
  },
  [theme.breakpoints.down('sm')]: {
    minHeight: 100,
    '&:hover': {
      transform: 'translateY(-2px)',
    },
  },
}));

const propertyTypes = [
  { icon: FactoryIcon, label: 'Industrial', color: '#666' },
  { icon: MeetingRoomIcon, label: 'Flex', color: '#666' },
  { icon: WorkIcon, label: 'Coworking', color: '#666' },
  { icon: LocalHospitalIcon, label: 'Medical', color: '#666' },
  { icon: LandscapeIcon, label: 'Land', color: '#666' },
  { icon: RestaurantIcon, label: 'Restaurant', color: '#666' },
];

export default function HomeHero() {
  const [activeTab, setActiveTab] = useState(0);
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(5); // Restaurant selected by default

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleCategorySelect = (index: number) => {
    setSelectedCategory(index);
  };

  return (
    <HeroSection>
      <Container 
        maxWidth="lg" 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          minHeight: '100%',
          gap: { xs: 2, sm: 3 },
          px: { xs: 1, sm: 2 },
        }}
      >
        <Box sx={{ textAlign: 'center', width: '100%', mb: { xs: 2, sm: 3 } }}>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              color: '#ffffff',
              fontWeight: 900,
              fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3.8rem' },
              lineHeight: { xs: 1.2, sm: 1.1, md: 1.1 },
              letterSpacing: '-0.02em',
              textAlign: 'center',
              zIndex: 3,
              maxWidth: '100%',
              mx: 'auto',
              px: { xs: 1, sm: 2 },
              filter: 'brightness(1.3) contrast(1.2) drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
              WebkitTextStroke: '0.5px rgba(255,255,255,0.3)',
            }}
          >
            The World's #1 Commercial Real Estate Marketplace
          </Typography>
        </Box>

        <SearchContainer elevation={8}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            centered
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              mb: { xs: 2, sm: 3 },
              '& .MuiTab-root': {
                fontWeight: 600,
                textTransform: 'none',
                fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' },
                color: '#666',
                minHeight: { xs: 40, sm: 44 },
                py: { xs: 1, sm: 1.2 },
                px: { xs: 1.5, sm: 2, md: 2.5 },
                borderRadius: 2,
                transition: 'all 0.3s ease',
                minWidth: { xs: 'auto', sm: 'auto' },
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  color: '#333',
                },
              },
              '& .Mui-selected': {
                color: '#000',
                backgroundColor: 'rgba(0, 0, 0, 0.06)',
                fontWeight: 700,
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#000',
                height: 3,
                borderRadius: '2px 2px 0 0',
              },
              '& .MuiTabs-scrollButtons': {
                '&.Mui-disabled': {
                  opacity: 0.3,
                },
              },
            }}
          >
            <Tab label="For Lease" />
            <Tab label="For Sale" />
            <Tab label="Auctions" />
            <Tab label="Businesses" />
          </Tabs>

          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            mb: { xs: 2, sm: 2.5 }, 
            overflowX: 'auto', 
            pb: 1,
            '&::-webkit-scrollbar': {
              height: 4,
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'rgba(0,0,0,0.1)',
              borderRadius: 2,
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(0,0,0,0.3)',
              borderRadius: 2,
            },
          }}>
            <Box sx={{ 
              display: 'flex', 
              gap: { xs: 1.5, sm: 2 }, 
              minWidth: 'fit-content',
              px: { xs: 1, sm: 0 }
            }}>
              {propertyTypes.map((property, index) => (
                <PropertyTypeCard
                  key={index}
                  className={selectedCategory === index ? 'selected' : ''}
                  onClick={() => handleCategorySelect(index)}
                  sx={{ 
                    minWidth: { xs: 80, sm: 90, md: 100 },
                    flexShrink: 0
                  }}
                >
                  <CardContent sx={{ 
                    textAlign: 'center', 
                    p: { xs: 1.5, sm: 2 }, 
                    '&:last-child': { pb: { xs: 1.5, sm: 2 } } 
                  }}>
                    <Box
                      sx={{
                        width: { xs: 48, sm: 52, md: 56 },
                        height: { xs: 48, sm: 52, md: 56 },
                        borderRadius: '50%',
                        backgroundColor: selectedCategory === index ? '#000' : '#f5f5f5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 8px',
                        border: selectedCategory === index ? '2px solid #000' : '2px solid #e0e0e0',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <property.icon
                        sx={{
                          fontSize: { xs: 22, sm: 24, md: 26 },
                          color: selectedCategory === index ? '#fff' : '#666',
                        }}
                      />
                    </Box>
                    <Typography 
                      variant="body2" 
                      fontWeight={selectedCategory === index ? 700 : 500}
                      sx={{ 
                        color: selectedCategory === index ? '#000' : '#666',
                        fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.85rem' },
                        transition: 'all 0.3s ease',
                        lineHeight: 1.2,
                      }}
                    >
                      {property.label}
                    </Typography>
                  </CardContent>
                </PropertyTypeCard>
              ))}
            </Box>
          </Box>

          <Box sx={{ position: 'relative' }}>
            <TextField
              fullWidth
              placeholder="Enter a location"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              InputProps={{
                sx: {
                  '& .MuiOutlinedInput-root': {
                    borderRadius: { xs: 2, sm: 3 },
                    backgroundColor: '#f8f9fa',
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                    height: { xs: 48, sm: 52 },
                    border: '2px solid #e0e0e0',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      border: '2px solid #000',
                      backgroundColor: '#fff',
                    },
                    '&.Mui-focused': {
                      border: '2px solid #000',
                      backgroundColor: '#fff',
                      boxShadow: '0 0 0 3px rgba(0, 0, 0, 0.1)',
                    },
                    '& fieldset': {
                      border: 'none',
                    },
                    '&:hover fieldset': {
                      border: 'none',
                    },
                    '&.Mui-focused fieldset': {
                      border: 'none',
                    },
                  },
                  '& .MuiInputBase-input': {
                    padding: { xs: '12px 16px', sm: '14px 18px' },
                    color: '#333',
                    '&::placeholder': {
                      color: '#999',
                      opacity: 1,
                    },
                  },
                },
              }}
            />
            <IconButton
              size="large"
              sx={{
                position: 'absolute',
                right: { xs: 4, sm: 6 },
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: '#000',
                color: 'white',
                borderRadius: { xs: 1.5, sm: 2 },
                width: { xs: 36, sm: 40 },
                height: { xs: 36, sm: 40 },
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: '#333',
                  transform: 'translateY(-50%) scale(1.05)',
                },
                '&:active': {
                  transform: 'translateY(-50%) scale(0.95)',
                },
              }}
            >
              <SearchIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
            </IconButton>
          </Box>
        </SearchContainer>

      </Container>
    </HeroSection>
  );
}
