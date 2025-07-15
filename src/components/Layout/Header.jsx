import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { useState } from 'react';

const Header = () => {
  const { apiKey, setApiKey } = useAppContext();
  const [open, setOpen] = useState(false);
  const [keyInput, setKeyInput] = useState(apiKey || '');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = () => {
    setApiKey(keyInput);
    handleClose();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Ruh Platform
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" component={RouterLink} to="/">
            Dashboard
          </Button>
          <Button color="inherit" component={RouterLink} to="/clients">
            Clients
          </Button>
          <Button color="inherit" component={RouterLink} to="/appointments">
            Appointments
          </Button>
          <Button color="inherit" onClick={handleOpen}>
            API Key
          </Button>
        </Box>
      </Toolbar>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Set API Key</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="API Key"
            type="text"
            fullWidth
            variant="outlined"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
};

export default Header;
