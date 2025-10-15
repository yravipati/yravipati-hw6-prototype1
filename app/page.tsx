'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Container, Typography, CircularProgress } from '@mui/material';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/onboarding');
  }, [router]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
            Welcome to Eventus
          </Typography>
          <CircularProgress sx={{ my: 3 }} />
          <Typography variant="body1" color="text.secondary">
            Redirecting to onboarding...
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
