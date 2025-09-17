import { ReactNode } from 'react';
import { Box } from '@mui/material';
import { Navbar } from '../components';

// ----------------------------------------------------------------------

interface Props {
  children: ReactNode;
  variant?: 'main' | 'dashboard';
}

export default function MainLayout({ children, variant = 'main' }: Props) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Navbar />
      <Box sx={{ flex: 1 }}>
        {children}
      </Box>
    </Box>
  );
}
