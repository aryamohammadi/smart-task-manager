// src/components/LandingPage.js

import React, { useCallback, useEffect } from 'react';
import { Button, Container, Typography } from '@mui/material';
import { tsParticles } from '@tsparticles/engine';
import Particles from '@tsparticles/react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/auth');
  };

  // Initialize particles using the tsParticles engine
  const particlesInit = useCallback(async (engine) => {
    await tsParticles.load(engine);
  }, []);

  // Callback for when particles are successfully loaded
  const particlesLoaded = useCallback(async (container) => {
    console.log(container); // Debugging
  }, []);

  // Add parallax scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      document.querySelector('.parallax-layer.back').style.transform = `translateY(${scrollPosition * 0.5}px)`;
      document.querySelector('.parallax-layer.middle').style.transform = `translateY(${scrollPosition * 0.7}px)`;
      document.querySelector('.parallax-layer.front').style.transform = `translateY(${scrollPosition}px)`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="landing-container">
      {/* Parallax Background Layers for depth effect */}
      <div className="parallax-layer back"></div>
      <div className="parallax-layer middle"></div>
      <div className="parallax-layer front"></div>

      <Container maxWidth="md" className="landing-content">
        {/* Particle Background Effect */}
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
            fullScreen: {
              enable: true,
              zIndex: -1,
            },
            particles: {
              number: {
                value: 150,
                density: {
                  enable: true,
                  value_area: 800,
                },
              },
              color: {
                value: ['#ffffff', '#ff0000', '#00ff00', '#0000ff'],
              },
              shape: {
                type: ['circle', 'triangle', 'star'],
              },
              opacity: {
                value: 0.7,
                random: true,
                anim: {
                  enable: true,
                  speed: 1,
                  opacity_min: 0.1,
                  sync: false,
                },
              },
              size: {
                value: 4,
                random: { enable: true, minimumValue: 1 },
                anim: {
                  enable: true,
                  speed: 3,
                  size_min: 0.3,
                  sync: false,
                },
              },
              move: {
                enable: true,
                speed: 3,
                direction: 'none',
                random: false,
                straight: false,
                outModes: { default: 'bounce' },
                attract: {
                  enable: true,
                  rotateX: 600,
                  rotateY: 1200,
                },
              },
            },
            interactivity: {
              detect_on: 'canvas',
              events: {
                onHover: {
                  enable: true,
                  mode: 'repulse',
                },
                onClick: {
                  enable: true,
                  mode: 'bubble',
                },
                resize: true,
              },
              modes: {
                repulse: {
                  distance: 150,
                  duration: 0.4,
                },
                bubble: {
                  distance: 200,
                  size: 20,
                  duration: 2,
                  opacity: 0.8,
                  speed: 3,
                },
                grab: {
                  distance: 400,
                  lineLinked: {
                    opacity: 1,
                  },
                },
              },
            },
            retina_detect: true,
          }}
        />

        {/* Animated Heading using Framer Motion and Typewriter Effect */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Typography variant="h2" component="h1" className="animated-title">
            <Typewriter
              words={['Welcome to Task Manager']}
              loop={1}
              cursor
              cursorStyle="|"
              typeSpeed={100}
              deleteSpeed={50}
              delaySpeed={3000}
            />
          </Typography>
        </motion.div>

        {/* Subtitle with Framer Motion Effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
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
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
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
