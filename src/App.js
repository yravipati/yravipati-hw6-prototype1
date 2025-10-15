import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Box } from '@mui/material';
import OnboardingSurvey from './components/OnboardingSurvey';
import SuccessPage from './components/SuccessPage';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
        <Header />
        <Container maxWidth="md" sx={{ py: 4 }}>
          <Routes>
            <Route path="/" element={<OnboardingSurvey />} />
            <Route path="/success" element={<SuccessPage />} />
          </Routes>
        </Container>
      </Box>
    </Router>
  );
}

export default App;
