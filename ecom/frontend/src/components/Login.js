import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

// 1. Accept the new prop
function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email: email,
        password: password,
      });

      login(response.data.user); 
      alert('Login successful!');
      
      // 2. Call the function to close the modal
      if (onLoginSuccess) {
        onLoginSuccess();
      }

      setEmail('');
      setPassword('');

    } catch (error) {
      let errorMessage = 'Login failed: ' + (error.response ? error.response.data.message : "Cannot connect to server");
      console.error('Login error:', error);
      alert(errorMessage);
    }
  };

  return (
    <div style={{ border: '1px solid black', padding: '15px', marginTop: '20px' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {/* ... (your form inputs are all the same) ... */}
        <div style={{ marginTop: '10px' }}>
          <label>Email: </label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div style={{ marginTop: '10px' }}>
          <label>Password: </label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" style={{ marginTop: '10px' }}>Login</button>
      </form>
    </div>
  );
}

export default Login;