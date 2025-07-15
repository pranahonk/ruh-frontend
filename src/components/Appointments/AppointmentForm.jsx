import React, { useState, useEffect } from 'react';
import {
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { format } from 'date-fns';

const AppointmentForm = () => {
  const { id } = useParams();
  const isEditing = id !== 'new';
  const navigate = useNavigate();
  const { clients, appointments, loading, addAppointment, updateAppointment, fetchClients } = useAppContext();

  const [formData, setFormData] = useState({
    client_id: '',
    time: format(new Date(), "yyyy-MM-dd'T'HH:mm")
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {

    fetchClients();


    if (isEditing) {
      const appointment = appointments.find(a => a.id === id);
      if (appointment) {
        setFormData({
          client_id: appointment.client_id,
          time: format(new Date(appointment.time), "yyyy-MM-dd'T'HH:mm")
        });
      } else {
        navigate('/appointments');
      }
    }
  }, [isEditing, id, appointments, navigate]); // Removed fetchClients from dependencies

  const validate = () => {
    const newErrors = {};

    if (!formData.client_id) {
      newErrors.client_id = 'Client is required';
    }

    if (!formData.time) {
      newErrors.time = 'Appointment time is required';
    } else if (new Date(formData.time) < new Date() && !isEditing) {
      newErrors.time = 'Appointment time cannot be in the past';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));


    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      const appointmentData = {
        ...formData,
        time: new Date(formData.time).toISOString()
      };

      if (isEditing) {
        await updateAppointment(id, appointmentData);
      } else {
        await addAppointment(appointmentData);
      }
      navigate('/appointments');
    } catch (error) {
      console.error('Error saving appointment:', error);
    }
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h5" component="h2" gutterBottom>
        {isEditing ? 'Edit Appointment' : 'Schedule New Appointment'}
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth error={!!errors.client_id}>
              <InputLabel id="client-select-label">Client</InputLabel>
              <Select
                labelId="client-select-label"
                id="client-select"
                name="client_id"
                value={formData.client_id}
                onChange={handleChange}
                label="Client"
                disabled={loading}
              >
                {clients.map((client) => (
                  <MenuItem key={client.id} value={client.id}>
                    {client.name} ({client.email})
                  </MenuItem>
                ))}
              </Select>
              {errors.client_id && <FormHelperText>{errors.client_id}</FormHelperText>}
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Appointment Date & Time"
              type="datetime-local"
              name="time"
              value={formData.time}
              onChange={handleChange}
              error={!!errors.time}
              helperText={errors.time || ''}
              InputLabelProps={{ shrink: true }}
              disabled={loading}
            />
          </Grid>

          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button
              variant="outlined"
              onClick={() => navigate('/appointments')}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : (isEditing ? 'Update' : 'Schedule')}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default AppointmentForm;
