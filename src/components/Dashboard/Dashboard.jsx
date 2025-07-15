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
                            <Typography variant="h6" component="h2" sx={{mb: 2}}>
                                Upcoming Appointments
                            </Typography>

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
                                    variant="outlined"
                                    size="small"
                                    onClick={() => navigate('/appointments')}
                                >
                                    View All Appointments
                                </Button>
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Recent Clients */}
                    <Grid item xs={12} md={6}>
                        <Paper sx={{p: 3, height: '100%'}}>
                            <Typography variant="h6" component="h2" sx={{mb: 2}}>
                                Recent Clients
                            </Typography>

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
                                    variant="outlined"
                                    size="small"
                                    onClick={() => navigate('/clients')}
                                >
                                    View All Clients
                                </Button>
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Statistics section removed as requested */}
                </Grid>
            )}
        </div>
    );
};

export default Dashboard;
