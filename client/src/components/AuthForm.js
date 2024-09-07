import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper, Box, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { registerUser, loginUser } from '../services/apiService';
import './AuthForm.css';

const AuthForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(true);
  const [message, setMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Log data before making the API call
    console.log('Submitting form with data:', { username, password });
  
    try {
      let data;
      if (isRegister) {
        data = await registerUser({ username, password });
        setMessage('Registration successful! Please login.');
        setAlertType('success');
      } else {
        data = await loginUser({ username, password });
        setMessage('Login successful!');
        setAlertType('success');
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setMessage(error.response?.data?.message || 'Authentication error occurred');
      setAlertType('error');
    }
  };
  

  return (
    <Container maxWidth="sm">
      <Paper elevation={6} className="auth-paper" style={{ padding: '20px', marginTop: '50px' }}>
        <Typography variant="h4" align="center" gutterBottom className="auth-title">
          {isRegister ? 'Register' : 'Login'}
        </Typography>
        {message && <Alert severity={alertType} className="auth-alert">{message}</Alert>}
        <form onSubmit={handleSubmit} className="auth-form">
          <TextField
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            margin="normal"
            required
            className="auth-input"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
            className="auth-input"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth className="auth-button" style={{ marginTop: '20px' }}>
            {isRegister ? 'Register' : 'Login'}
          </Button>
        </form>
        <Box mt={2}>
          <Button onClick={() => setIsRegister(!isRegister)} color="secondary" fullWidth className="auth-toggle-button">
            {isRegister ? 'Switch to Login' : 'Switch to Register'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AuthForm;
