// // import React, { useState } from 'react';
// // import { TextField, Button, Container, Typography, Paper, Box, Alert, CircularProgress, Snackbar } from '@mui/material';
// // import { registerUser, loginUser } from '../services/apiService';
// // import './AuthForm.css';

// // const AuthForm = () => {
// //   const [username, setUsername] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [isRegister, setIsRegister] = useState(true);
// //   const [message, setMessage] = useState('');
// //   const [alertType, setAlertType] = useState('');
// //   const [loading, setLoading] = useState(false); // Loading state
// //   const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar state

// //   const handleSubmit = async (event) => {
// //     event.preventDefault();
// //     setLoading(true); // Start loading
// //     try {
// //       let data;
// //       if (isRegister) {
// //         data = await registerUser({ username, password });
// //         setMessage('Registration successful! Please login.');
// //         setAlertType('success');
// //       } else {
// //         data = await loginUser({ username, password });
// //         setMessage('Login successful!');
// //         setAlertType('success');
// //         localStorage.setItem('token', data.token);
// //       }
// //       setOpenSnackbar(true); // Show snackbar on success
// //     } catch (error) {
// //       console.error('Authentication error:', error);
// //       setMessage(error.response?.data?.message || 'Authentication error occurred');
// //       setAlertType('error');
// //       setOpenSnackbar(true); // Show snackbar on error
// //     } finally {
// //       setLoading(false); // Stop loading
// //     }
// //   };

// //   return (
// //     <Container maxWidth="sm">
// //       <Paper elevation={3} sx={{ padding: '20px', marginTop: '50px' }}>
// //         <Typography variant="h4" align="center" gutterBottom>
// //           {isRegister ? 'Register' : 'Login'}
// //         </Typography>
// //         {loading && <CircularProgress />} {/* Show loading spinner */}
// //         {message && <Alert severity={alertType}>{message}</Alert>}
// //         <form onSubmit={handleSubmit}>
// //           <TextField
// //             label="Username"
// //             type="text"
// //             value={username}
// //             onChange={(e) => setUsername(e.target.value)}
// //             fullWidth
// //             margin="normal"
// //             required
// //           />
// //           <TextField
// //             label="Password"
// //             type="password"
// //             value={password}
// //             onChange={(e) => setPassword(e.target.value)}
// //             fullWidth
// //             margin="normal"
// //             required
// //           />
// //           <Button
// //             type="submit"
// //             variant="contained"
// //             color="primary"
// //             fullWidth
// //             sx={{ marginTop: '20px' }}
// //             disabled={loading} // Disable button while loading
// //           >
// //             {isRegister ? 'Register' : 'Login'}
// //           </Button>
// //         </form>
// //         <Box mt={2}>
// //           <Button onClick={() => setIsRegister(!isRegister)} color="secondary" fullWidth>
// //             {isRegister ? 'Switch to Login' : 'Switch to Register'}
// //           </Button>
// //         </Box>
// //       </Paper>

// //       {/* Snackbar for feedback messages */}
// //       <Snackbar
// //         open={openSnackbar}
// //         autoHideDuration={6000}
// //         onClose={() => setOpenSnackbar(false)}
// //         message={message}
// //         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
// //       />
// //     </Container>
// //   );
// // };

// // export default AuthForm;



// import React, { useState } from 'react';
// import { TextField, Button, Container, Typography, Paper, Box, Alert } from '@mui/material';
// import { registerUser, loginUser } from '../services/apiService';
// import './AuthForm.css'; // Make sure your CSS file has the appropriate styles

// const AuthForm = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [isRegister, setIsRegister] = useState(true);
//   const [message, setMessage] = useState('');
//   const [alertType, setAlertType] = useState('');

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       let data;
//       if (isRegister) {
//         data = await registerUser({ username, password });
//         setMessage('Registration successful! Please login.');
//         setAlertType('success');
//       } else {
//         data = await loginUser({ username, password });
//         setMessage('Login successful!');
//         setAlertType('success');
//         localStorage.setItem('token', data.token);
//       }
//     } catch (error) {
//       console.error('Authentication error:', error);
//       setMessage(error.response?.data?.message || 'Authentication error occurred');
//       setAlertType('error');
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Paper elevation={6} className="auth-paper" style={{ padding: '20px', marginTop: '50px' }}>
//         <Typography variant="h4" align="center" gutterBottom className="auth-title">
//           {isRegister ? 'Register' : 'Login'}
//         </Typography>
//         {message && <Alert severity={alertType} className="auth-alert">{message}</Alert>}
//         <form onSubmit={handleSubmit} className="auth-form">
//           <TextField
//             label="Username"
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             fullWidth
//             margin="normal"
//             required
//             className="auth-input"
//           />
//           <TextField
//             label="Password"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             fullWidth
//             margin="normal"
//             required
//             className="auth-input"
//           />
//           <Button type="submit" variant="contained" color="primary" fullWidth className="auth-button" style={{ marginTop: '20px' }}>
//             {isRegister ? 'Register' : 'Login'}
//           </Button>
//         </form>
//         <Box mt={2}>
//           <Button onClick={() => setIsRegister(!isRegister)} color="secondary" fullWidth className="auth-toggle-button">
//             {isRegister ? 'Switch to Login' : 'Switch to Register'}
//           </Button>
//         </Box>
//       </Paper>
//     </Container>
//   );
// };

// export default AuthForm;
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper, Box, Alert } from '@mui/material';
import { Player } from '@lottiefiles/react-lottie-player'; // Import the Lottie Player
import { registerUser, loginUser } from '../services/apiService';
import './AuthForm.css'; // Your CSS file for additional styles

const AuthForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(true);
  const [message, setMessage] = useState('');
  const [alertType, setAlertType] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
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
        {/* Add Lottie Animation at the top of the form */}
        <Player
          autoplay
          loop
          src="https://assets9.lottiefiles.com/packages/lf20_mkmtxksz.json" // Sample animation link
          style={{ height: '200px', width: '200px', marginBottom: '20px' }}
        />
        
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
