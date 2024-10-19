import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    username: '', // Add username to state
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const register = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/users/register', user);
      console.log(response.data);
      alert('User created successfully');
      navigate('/login'); // Redirect to login page after successful registration
    } catch (error) {
      console.error('Registration error:', error);
      const message = error.response?.data?.message || 'Error creating user';
      alert(message); // Show the error message returned by the server
    }
  };

  const navigateToLogin = () => {
    navigate('/login');
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={user.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={user.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={user.password} onChange={handleChange} required />
        </div>
        <div>
          <label>Username:</label> {/* New input for username */}
          <input type="text" name="username" value={user.username} onChange={handleChange} required />
        </div>
        <button type="button" onClick={register}>Register</button>
        <button type="button" onClick={navigateToLogin}>Go to Login</button>
      </form>
    </div>
  );
};

export default Register;