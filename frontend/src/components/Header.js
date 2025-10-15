import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { Event as EventIcon } from '@mui/icons-material';

const Header = () => {
  return (
    <AppBar position="static" elevation={1}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <EventIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div">
            Eventus
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ opacity: 0.8 }}>
          Welcome to your career journey
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
