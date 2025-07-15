import React, { createContext, useState, useContext, useEffect } from 'react';
import * as api from '../services/api';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [clients, setClients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiKey, setApiKeyState] = useState(localStorage.getItem('apiKey') || '');

  const fetchClients = async () => {
    setLoading(true);
    try {
      const response = await api.getClients();
      setClients(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch clients');
      console.error('Error fetching clients:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const response = await api.getAppointments();
      setAppointments(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch appointments');
      console.error('Error fetching appointments:', err);
    } finally {
      setLoading(false);
    }
  };

  const addClient = async (clientData) => {
    setLoading(true);
    try {
      const response = await api.createClient(clientData);
      setClients([...clients, response.data]);
      setError(null);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add client');
      console.error('Error adding client:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateClient = async (id, clientData) => {
    setLoading(true);
    try {
      const response = await api.updateClient(id, clientData);
      setClients(clients.map(client => client.id === id ? response.data : client));
      setError(null);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update client');
      console.error('Error updating client:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const addAppointment = async (appointmentData) => {
    setLoading(true);
    try {
      const response = await api.createAppointment(appointmentData);
      setAppointments([...appointments, response.data]);
      setError(null);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add appointment');
      console.error('Error adding appointment:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateAppointment = async (id, appointmentData) => {
    setLoading(true);
    try {
      const response = await api.updateAppointment(id, appointmentData);
      setAppointments(appointments.map(appointment => appointment.id === id ? response.data : appointment));
      setError(null);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update appointment');
      console.error('Error updating appointment:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const setApiKey = (key) => {
    api.setApiKey(key);
    setApiKeyState(key);
  };

  // Only fetch data on initial load or when API key changes
  useEffect(() => {
    // Only fetch if we have an API key
    if (apiKey) {
      fetchClients();
      fetchAppointments();
    }
  }, [apiKey]); // Only dependency is apiKey - don't add fetchClients or fetchAppointments here

  return (
    <AppContext.Provider
      value={{
        clients,
        appointments,
        loading,
        error,
        apiKey,
        setApiKey,
        fetchClients,
        fetchAppointments,
        addClient,
        updateClient,
        addAppointment,
        updateAppointment
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
