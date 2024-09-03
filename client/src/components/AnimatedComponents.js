// src/components/AnimatedComponent.js
import React from 'react';
import { motion } from 'framer-motion';

const AnimatedComponent = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }} // Initial state
      animate={{ opacity: 1, y: 0 }}   // Animated state
      transition={{ duration: 0.5 }}    // Duration of animation
      style={{
        backgroundColor: '#61dafb',
        padding: '20px',
        borderRadius: '8px',
        textAlign: 'center',
        margin: '20px auto',
        width: '200px',
        color: 'white'
      }}
    >
      Welcome to Task Manager
    </motion.div>
  );
};

export default AnimatedComponent;
