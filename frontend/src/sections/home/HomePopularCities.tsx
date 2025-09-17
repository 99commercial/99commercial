import {
  Box,
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { useState, useRef } from 'react';

// ----------------------------------------------------------------------

const CitiesSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  backgroundColor: 'white',
}));

const CityCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  overflow: 'hidden',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  minWidth: '280px',
  maxWidth: '280px',
  height: '320px',
  flexShrink: 0,
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
  },
}));

const CarouselContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  borderRadius: theme.spacing(2),
}));

const CarouselWrapper = styled(Box)({
  display: 'flex',
  transition: 'transform 0.3s ease-in-out',
  gap: '16px',
  padding: '0 8px',
});

const NavigationButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  color: theme.palette.primary.main,
  zIndex: 2,
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  '&.left': {
    left: theme.spacing(1),
  },
  '&.right': {
    right: theme.spacing(1),
  },
}));

const cities = [
  {
    name: 'New York City',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
  },
  {
    name: 'London',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
  },
  {
    name: 'Paris',
    image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
  },
  {
    name: 'Madrid',
    image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
  },
  {
    name: 'Toronto',
    image: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
  },
  {
    name: 'Los Angeles',
    image: 'https://images.unsplash.com/photo-1515894204813-788a25c4f72a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
  },
];

export default function HomePopularCities() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  // Calculate how many cards to show based on screen size
  const getCardsToShow = () => {
    if (isMobile) return 1;
    if (isTablet) return 2;
    return 3;
  };

  const cardsToShow = getCardsToShow();
  const maxIndex = Math.max(0, cities.length - cardsToShow);

  const scrollToIndex = (index: number) => {
    const clampedIndex = Math.max(0, Math.min(index, maxIndex));
    setCurrentIndex(clampedIndex);
    
    if (carouselRef.current) {
      const cardWidth = 280 + 16; // card width + gap
      const translateX = -clampedIndex * cardWidth;
      carouselRef.current.style.transform = `translateX(${translateX}px)`;
    }
  };

  const handlePrevious = () => {
    scrollToIndex(currentIndex - 1);
  };

  const handleNext = () => {
    scrollToIndex(currentIndex + 1);
  };

  return (
    <CitiesSection>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          component="h2"
          sx={{
            textAlign: 'center',
            fontWeight: 700,
            mb: 6,
            color: '#333',
          }}
        >
          Explore Popular Cities
        </Typography>

        <CarouselContainer>
          <CarouselWrapper ref={carouselRef}>
            {cities.map((city, index) => (
              <CityCard key={index}>
                <CardMedia
                  component="img"
                  height="240"
                  image={city.image}
                  alt={city.name}
                  sx={{
                    objectFit: 'cover',
                    width: '100%',
                  }}
                />
                <CardContent sx={{ p: 2, textAlign: 'center' }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: '#333',
                      fontSize: '1.1rem',
                    }}
                  >
                    {city.name}
                  </Typography>
                </CardContent>
              </CityCard>
            ))}
          </CarouselWrapper>

          {currentIndex > 0 && (
            <NavigationButton
              className="left"
              onClick={handlePrevious}
              size="large"
            >
              <ChevronLeft />
            </NavigationButton>
          )}

          {currentIndex < maxIndex && (
            <NavigationButton
              className="right"
              onClick={handleNext}
              size="large"
            >
              <ChevronRight />
            </NavigationButton>
          )}
        </CarouselContainer>
      </Container>
    </CitiesSection>
  );
}
