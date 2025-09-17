import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import LanguageIcon from '@mui/icons-material/Language';
import CloseIcon from '@mui/icons-material/Close';

// ----------------------------------------------------------------------

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'isScrolled',
})<{ isScrolled: boolean }>(({ theme, isScrolled }) => ({
  backgroundColor: isScrolled ? '#ffffff' : 'transparent !important',
  color: isScrolled ? '#000000' : '#ffffff',
  boxShadow: isScrolled ? '0 2px 8px rgba(0, 0, 0, 0.15)' : 'none',
  position: isScrolled ? 'sticky' : 'absolute',
  top: 0,
  zIndex: 1300, // High z-index to ensure it's above other content
  width: '100%',
  transition: 'all 0.3s ease-in-out',
  '&.MuiAppBar-root': {
    backgroundColor: isScrolled ? '#ffffff' : 'transparent !important',
  },
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  flexGrow: 1,
  justifyContent: 'center',
  [theme.breakpoints.up('md')]: {
    justifyContent: 'flex-start',
  },
}));

const LogoIcon = styled(Box)(({ theme }) => ({
  width: 32,
  height: 32,
  backgroundColor: '#d32f2f',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(45deg, #d32f2f 0%, #ff5722 100%)',
    borderRadius: '50%',
    transform: 'rotate(45deg)',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    width: '60%',
    height: '60%',
    backgroundColor: '#fff',
    borderRadius: '50%',
    zIndex: 1,
  },
}));

const ActionButtons = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

const LoginButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'isScrolled',
})<{ isScrolled: boolean }>(({ theme, isScrolled }) => ({
  backgroundColor: '#d32f2f',
  color: '#fff',
  borderRadius: theme.spacing(1),
  padding: theme.spacing(1, 2),
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '0.9rem',
  '&:hover': {
    backgroundColor: '#b71c1c',
  },
}));

const AdvertiseButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'isScrolled',
})<{ isScrolled: boolean }>(({ theme, isScrolled }) => ({
  backgroundColor: 'transparent',
  color: isScrolled ? '#666666' : '#fff',
  border: isScrolled ? '1px solid #666666' : '1px solid #fff',
  borderRadius: theme.spacing(1),
  padding: theme.spacing(1, 2),
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '0.9rem',
  '&:hover': {
    backgroundColor: isScrolled ? 'rgba(102, 102, 102, 0.1)' : 'rgba(255, 255, 255, 0.1)',
    borderColor: isScrolled ? '#666666' : '#fff',
  },
}));

const MobileDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: 280,
    backgroundColor: '#1a237e',
    color: '#fff',
  },
}));

const DrawerHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
}));

const DrawerLogo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

// ----------------------------------------------------------------------

interface NavbarProps {
  onLogin?: () => void;
  onAdvertise?: () => void;
  onLanguageChange?: () => void;
}

export default function Navbar({ onLogin, onAdvertise, onLanguageChange }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      const threshold = viewportHeight * 0.6; // 60vh
      
      setIsScrolled(scrollPosition > threshold);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogin = () => {
    if (onLogin) {
      onLogin();
    } else {
      console.log('Login clicked');
    }
  };

  const handleAdvertise = () => {
    if (onAdvertise) {
      onAdvertise();
    } else {
      console.log('Advertise clicked');
    }
  };

  const handleLanguageChange = () => {
    if (onLanguageChange) {
      onLanguageChange();
    } else {
      console.log('Language change clicked');
    }
  };

  const drawer = (
    <Box>
      <DrawerHeader>
        <DrawerLogo>
          <LogoIcon />
          <Typography variant="h6" component="div" sx={{ color: '#fff', fontWeight: 700 }}>
            LoopNet™
          </Typography>
        </DrawerLogo>
        <IconButton
          color="inherit"
          aria-label="close drawer"
          onClick={handleDrawerToggle}
          edge="start"
        >
          <CloseIcon />
        </IconButton>
      </DrawerHeader>
      <List sx={{ pt: 2 }}>
        <ListItem component="button" onClick={handleLogin} sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}>
          <ListItemText primary="Login" sx={{ color: '#fff' }} />
        </ListItem>
        <ListItem component="button" onClick={handleAdvertise} sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}>
          <ListItemText primary="Advertise" sx={{ color: '#fff' }} />
        </ListItem>
        <ListItem component="button" onClick={handleLanguageChange} sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}>
          <ListItemText primary="Language" sx={{ color: '#fff' }} />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <StyledAppBar 
        position={isScrolled ? "sticky" : "absolute"}
        isScrolled={isScrolled}
        sx={{
          backgroundColor: isScrolled ? '#ffffff' : 'transparent',
          '&.MuiAppBar-root': {
            backgroundColor: isScrolled ? '#ffffff' : 'transparent',
          },
        }}
      >
        <Toolbar>
          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, color: isScrolled ? '#000000' : '#ffffff' }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Logo */}
          <LogoContainer>
            <LogoIcon />
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ 
                color: isScrolled ? '#000000' : '#ffffff', 
                fontWeight: 700 
              }}
            >
              99Commercial™
            </Typography>
          </LogoContainer>

          {/* Action Buttons - Desktop Only */}
          {!isMobile && (
            <ActionButtons>
              <IconButton
                color="inherit"
                onClick={handleLanguageChange}
                sx={{ color: isScrolled ? '#666666' : '#ffffff' }}
              >
                <LanguageIcon />
              </IconButton>
              <LoginButton onClick={handleLogin} isScrolled={isScrolled}>
                Login
              </LoginButton>
              <AdvertiseButton onClick={handleAdvertise} isScrolled={isScrolled}>
                Advertise
              </AdvertiseButton>
            </ActionButtons>
          )}
        </Toolbar>
      </StyledAppBar>

      {/* Mobile Drawer */}
      <MobileDrawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        {drawer}
      </MobileDrawer>
    </>
  );
}
