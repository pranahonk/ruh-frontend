import React, {useEffect} from 'react';
import {
    Grid,
    Paper,
    Typography,
    Box,
    List,
    ListItem,
    ListItemText,
    Divider,
    Button,
    CircularProgress
} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {useAppContext} from '../../context/AppContext';
import {format} from 'date-fns';

const Dashboard = () => {
    const {clients, appointments, loading, fetchClients, fetchAppointments, dataLoaded} = useAppContext();
    const navigate = useNavigate();

    useEffect(() => {
        // Only fetch data if it hasn't been loaded already
        if (!dataLoaded) {
            fetchClients();
            fetchAppointments();
        }
    }, [dataLoaded]);


    const upcomingAppointments = appointments
        .filter(appointment => new Date(appointment.time) > new Date())
        .sort((a, b) => new Date(a.time) - new Date(b.time))
        .slice(0, 5);


    const recentClients = [...clients]
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 5);

    return (
        <div>
            <Typography variant="h4" component="h1" gutterBottom>
                Dashboard
            </Typography>

            {loading ? (
                <Box sx={{display: 'flex', justifyContent: 'center', my: 4}}>
                    <CircularProgress/>
                </Box>
            ) : (
                <Grid container spacing={4}>
                    {/* Upcoming Appointments */}
                    <Grid item xs={12} md={6}>
                        <Paper sx={{p: 3, height: '100%'}}>
                            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2}}>
                                <Typography variant="h6" component="h2">
                                    Upcoming Appointments
                                </Typography>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    onClick={() => navigate('/appointments')}
                                >
                                    View All
                                </Button>
                            </Box>

                            {upcomingAppointments.length > 0 ? (
                                <List>
                                    {upcomingAppointments.map((appointment, index) => (
                                        <React.Fragment key={appointment.id}>
                                            {index > 0 && <Divider/>}
                                            <ListItem
                                                button
                                                onClick={() => navigate(`/appointments/${appointment.id}`)}
                                            >
                                                <ListItemText
                                                    primary={appointment.client_name}
                                                    secondary={format(new Date(appointment.time), 'PPP p')}
                                                />
                                            </ListItem>
                                        </React.Fragment>
                                    ))}
                                </List>
                            ) : (
                                <Typography variant="body2" color="text.secondary">
                                    No upcoming appointments
                                </Typography>
                            )}

                            <Box sx={{mt: 2, display: 'flex', justifyContent: 'center'}}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => navigate('/appointments/new')}
                                >
                                    Schedule New Appointment
                                </Button>
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Recent Clients */}
                    <Grid item xs={12} md={6}>
                        <Paper sx={{p: 3, height: '100%'}}>
                            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2}}>
                                <Typography variant="h6" component="h2">
                                    Recent Clients
                                </Typography>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    onClick={() => navigate('/clients')}
                                >
                                    View All
                                </Button>
                            </Box>

                            {recentClients.length > 0 ? (
                                <List>
                                    {recentClients.map((client, index) => (
                                        <React.Fragment key={client.id}>
                                            {index > 0 && <Divider/>}
                                            <ListItem
                                                button
                                                onClick={() => navigate(`/clients/${client.id}`)}
                                            >
                                                <ListItemText
                                                    primary={client.name}
                                                    secondary={client.email}
                                                />
                                            </ListItem>
                                        </React.Fragment>
                                    ))}
                                </List>
                            ) : (
                                <Typography variant="body2" color="text.secondary">
                                    No clients found
                                </Typography>
                            )}

                            <Box sx={{mt: 2, display: 'flex', justifyContent: 'center'}}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => navigate('/clients/new')}
                                >
                                    Add New Client
                                </Button>
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Statistics */}
                    <Grid item xs={12}>
                        <Paper sx={{p: 3}}>
                            <Typography variant="h6" component="h2" gutterBottom>
                                Statistics
                            </Typography>

                            <Grid container spacing={3}>
                                <Grid item xs={6} md={3}>
                                    <Box sx={{textAlign: 'center'}}>
                                        <Typography variant="h4" color="primary">
                                            {clients.length}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Total Clients
                                        </Typography>
                                    </Box>
                                </Grid>

                                <Grid item xs={6} md={3}>
                                    <Box sx={{textAlign: 'center'}}>
                                        <Typography variant="h4" color="primary">
                                            {appointments.length}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Total Appointments
                                        </Typography>
                                    </Box>
                                </Grid>

                                <Grid item xs={6} md={3}>
                                    <Box sx={{textAlign: 'center'}}>
                                        <Typography variant="h4" color="primary">
                                            {upcomingAppointments.length}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Upcoming Appointments
                                        </Typography>
                                    </Box>
                                </Grid>

                                <Grid item xs={6} md={3}>
                                    <Box sx={{textAlign: 'center'}}>
                                        <Typography variant="h4" color="primary">
                                            {appointments.filter(a => new Date(a.time) < new Date()).length}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Past Appointments
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            )}
        </div>
    );
};

export default Dashboard;
