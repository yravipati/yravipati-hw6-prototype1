import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Event as EventIcon,
  Notifications as NotificationsIcon,
  CloudUpload as CloudUploadIcon,
  Dashboard as DashboardIcon,
} from '@mui/icons-material';

const SuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const profileId = location.state?.profileId;

  const nextSteps = [
    {
      icon: <CloudUploadIcon />,
      title: 'Upload Your Resume',
      description: 'Add your resume to get better job matching',
    },
    {
      icon: <EventIcon />,
      title: 'Browse Events',
      description: 'Discover career events tailored to your interests',
    },
    {
      icon: <NotificationsIcon />,
      title: 'Set Notifications',
      description: 'Get alerts for new events that match your profile',
    },
    {
      icon: <DashboardIcon />,
      title: 'Complete Your Dashboard',
      description: 'Add more details to enhance your recommendations',
    },
  ];

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <Card sx={{ maxWidth: 600, width: '100%' }}>
        <CardContent sx={{ p: 4, textAlign: 'center' }}>
          <Avatar
            sx={{
              bgcolor: 'success.main',
              width: 80,
              height: 80,
              mx: 'auto',
              mb: 3,
            }}
          >
            <CheckCircleIcon sx={{ fontSize: 40 }} />
          </Avatar>

          <Typography variant="h4" component="h1" gutterBottom color="success.main">
            Profile Created Successfully!
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Welcome to Eventus! Your profile has been created and we're already working on 
            finding the perfect career events for you.
          </Typography>

          {profileId && (
            <Box sx={{ mb: 3, p: 2, backgroundColor: 'grey.50', borderRadius: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Profile ID: <strong>{profileId}</strong>
              </Typography>
            </Box>
          )}

          <Typography variant="h6" gutterBottom sx={{ mt: 4, mb: 2 }}>
            What's Next?
          </Typography>

          <List sx={{ textAlign: 'left', mb: 3 }}>
            {nextSteps.map((step, index) => (
              <ListItem key={index} sx={{ px: 0 }}>
                <ListItemIcon sx={{ color: 'primary.main' }}>
                  {step.icon}
                </ListItemIcon>
                <ListItemText
                  primary={step.title}
                  secondary={step.description}
                />
              </ListItem>
            ))}
          </List>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
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
            variant="text"
            onClick={() => navigate('/')}
            sx={{ mt: 2, display: 'block', mx: 'auto' }}
          >
            Start Over
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SuccessPage;
