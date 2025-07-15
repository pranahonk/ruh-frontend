import React, { useState, useEffect } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  InputAdornment,
  Typography,
  Button,
  Box,
  CircularProgress,
  Chip
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { format } from 'date-fns';

const AppointmentList = () => {
  const { appointments, loading, fetchAppointments } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    fetchAppointments();
  }, []);

  const filteredAppointments = appointments.filter(appointment =>
    appointment.client_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.client_email?.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const sortedAppointments = [...filteredAppointments].sort((a, b) =>
    new Date(a.time) - new Date(b.time)
  );

  const handleAppointmentClick = (id) => {
    navigate(`/appointments/${id}`);
  };

  const isUpcoming = (date) => {
    return new Date(date) > new Date();
  };

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Appointments
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate('/appointments/new')}
        >
          Schedule Appointment
        </Button>
      </Box>

      <TextField
        fullWidth
        margin="normal"
        variant="outlined"
        placeholder="Search appointments by client name or email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 3 }}
      />

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Client</strong></TableCell>
                <TableCell><strong>Email</strong></TableCell>
                <TableCell><strong>Date & Time</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedAppointments.length > 0 ? (
                sortedAppointments.map((appointment) => (
                  <TableRow
                    key={appointment.id}
                    hover
                    onClick={() => handleAppointmentClick(appointment.id)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell>{appointment.client_name}</TableCell>
                    <TableCell>{appointment.client_email}</TableCell>
                    <TableCell>
                      {format(new Date(appointment.time), 'PPP p')}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={isUpcoming(appointment.time) ? "Upcoming" : "Past"}
                        color={isUpcoming(appointment.time) ? "primary" : "default"}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    {searchTerm ? 'No appointments match your search' : 'No appointments found'}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default AppointmentList;
