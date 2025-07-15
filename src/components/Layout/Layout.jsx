import React from 'react';
import { Container, Box, Alert } from '@mui/material';
import Header from './Header';
import { useAppContext } from '../../context/AppContext';

const Layout = ({ children }) => {
  const { error, apiKey } = useAppContext();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
        {!apiKey && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            Please set your API key to access the platform
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {children}
      </Container>
      <Box component="footer" sx={{ py: 3, bgcolor: 'background.paper', textAlign: 'center' }}>
        © {new Date().getFullYear()} Ruh Platform
      </Box>
    </Box>
  );
};

export default Layout;
