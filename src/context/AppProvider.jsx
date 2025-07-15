import React, { useState, useEffect } from 'react';
import * as api from '../services/api';
import AppContext from './AppContextUtils';

export const AppProvider = ({ children }) => {
  const [clients, setClients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiKey, setApiKeyState] = useState(localStorage.getItem('apiKey') || '');
  const [dataLoaded, setDataLoaded] = useState(false);

  const fetchClients = async () => {
    if (!dataLoaded) setLoading(true);
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
    if (!dataLoaded) setLoading(true);
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

  useEffect(() => {
    if (apiKey) {
      const loadInitialData = async () => {
        await Promise.all([fetchClients(), fetchAppointments()]);
        setDataLoaded(true);
      };

      if (!dataLoaded) {
        loadInitialData();
      }
    }
  }, [apiKey, dataLoaded]);

  return (
    <AppContext.Provider
      value={{
        clients,
        appointments,
        loading,
        error,
        apiKey,
        dataLoaded,
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

export default AppProvider;
