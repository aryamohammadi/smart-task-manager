import React, { useState } from 'react';
import { registerUser, loginUser } from '../services/apiService';

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(true); // Toggle between register and login

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (isRegister) {
        const data = await registerUser({ email, password });
        console.log('Registration successful:', data);
      } else {
        const data = await loginUser({ email, password });
        console.log('Login successful:', data);
      }
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  return (
    <div>
      <h2>{isRegister ? 'Register' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
      </form>
      <button onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? 'Switch to Login' : 'Switch to Register'}
      </button>
    </div>
  );
};

export default AuthForm;
