import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const newUser = {
      username: username,
      email: email,
      password: password,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/users/register', newUser);
      
      console.log(response.data); 
      alert('Registration successful!');
      
      setUsername('');
      setEmail('');
      setPassword('');

    } catch (error) {
      // --- THIS IS THE UPDATED CATCH BLOCK ---

      // This will show the full error object in the F12 browser console
      console.error('FULL REGISTRATION ERROR:', error); 

      let errorMessage = 'Registration failed. Please try again.'; // Default message

      if (error.response) {
        // The server responded with an error (e.g., "Email exists")
        errorMessage = 'Registration failed: ' + error.response.data.message;
      } else if (error.request) {
        // The request was made, but no response was received
        errorMessage = "Error: Cannot connect to the server. Is your backend running on localhost:5000?";
      } else {
        // Something else happened
        errorMessage = error.message;
      }
      
      alert(errorMessage);
    }
  };

  return (
    <div style={{ border: '1px solid black', padding: '15px', marginTop: '20px' }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username: </label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>
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
        <button type="submit" style={{ marginTop: '10px' }}>Register</button>
      </form>
    </div>
  );
}

export default Register;