'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  CloudUpload as CloudUploadIcon,
  Event as EventIcon,
  Notifications as NotificationsIcon,
  Dashboard as DashboardIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const profileId = searchParams.get('profileId');

  const nextSteps = [
    {
      title: 'Upload Your Resume',
      description: 'Add your resume to get better job matching',
      icon: <CloudUploadIcon color="primary" />,
    },
    {
      title: 'Browse Events',
      description: 'Discover career events tailored to your interests',
      icon: <EventIcon color="primary" />,
    },
    {
      title: 'Set Notifications',
      description: 'Get alerts for new events that match your profile',
      icon: <NotificationsIcon color="primary" />,
    },
    {
      title: 'Complete Your Dashboard',
      description: 'Add more details to enhance your recommendations',
      icon: <DashboardIcon color="primary" />,
    },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        py: 6,
      }}
    >
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card elevation={3}>
            <CardContent sx={{ p: { xs: 4, md: 6 }, textAlign: 'center' }}>
              {/* Success Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              >
                <Avatar
                  sx={{
                    bgcolor: 'success.main',
                    width: 80,
                    height: 80,
                    mx: 'auto',
                    mb: 3,
                  }}
                >
                  <CheckCircleIcon sx={{ fontSize: 48 }} />
                </Avatar>
              </motion.div>

              <Typography variant="h4" component="h1" gutterBottom color="success.main" fontWeight="bold">
                Profile Created Successfully!
              </Typography>

              <Typography variant="body1" color="text.secondary" paragraph>
                Welcome to Eventus! Your profile has been created and we&apos;re already working on
                finding the perfect career events for you.
              </Typography>

              {profileId && (
                <Box sx={{ mb: 3, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Profile ID:{' '}
                    <Box component="span" fontWeight="bold" fontFamily="monospace">
                      {profileId}
                    </Box>
                  </Typography>
                </Box>
              )}

              <Typography variant="h6" gutterBottom sx={{ mt: 4, mb: 2 }}>
                What&apos;s Next?
              </Typography>

              <List sx={{ textAlign: 'left', mb: 3 }}>
                {nextSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon>{step.icon}</ListItemIcon>
                      <ListItemText primary={step.title} secondary={step.description} />
                    </ListItem>
                  </motion.div>
                ))}
              </List>

              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  mt: 4,
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<CloudUploadIcon />}
                  sx={{ minWidth: 160 }}
                >
                  Upload Resume
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<EventIcon />}
                  sx={{ minWidth: 160 }}
                >
                  Browse Events
                </Button>
              </Box>

              <Button
                onClick={() => router.push('/onboarding')}
                sx={{ mt: 3 }}
              >
                Start Over
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </Box>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'background.default',
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <CircularProgress size={48} />
            <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
              Loading...
            </Typography>
          </Box>
        </Box>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
