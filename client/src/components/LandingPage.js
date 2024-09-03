// src/components/LandingPage.js
import React from 'react';
import { Button, Container, Typography, Box } from '@mui/material';
import { Player } from '@lottiefiles/react-lottie-player';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import motion from framer-motion
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/auth');
  };

  return (
    <div className="landing-container">
      <Container maxWidth="md" className="landing-content">
        {/* Lottie animation */}
        <Player
          autoplay
          loop
          src="https://lottie.host/643cf777-86e9-4d92-b248-f08e8719bde9/cWCdmog2dA.json"
          style={{ height: '300px', width: '300px', marginBottom: '20px' }}
        />

        {/* Animated Heading with Framer Motion */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Typography variant="h2" component="h1" className="animated-title">
            Welcome to Task Manager
          </Typography>
        </motion.div>

        {/* Subtitle with Motion Effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <Typography variant="body1" align="center" className="animated-subtitle">
            Manage your tasks efficiently and boost your productivity.
          </Typography>
        </motion.div>

        {/* Interactive Button with Motion Effect */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleButtonClick}
            className="start-button"
            style={{ marginTop: '30px', padding: '10px 30px', fontSize: '1.2em' }}
          >
            Get Started
          </Button>
        </motion.div>
      </Container>
    </div>
  );
};

export default LandingPage;
