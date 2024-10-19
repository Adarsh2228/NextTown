// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [user, setUser] = useState({
//     email: '',
//     password: '',
//   });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUser({ ...user, [name]: value });
//   };

//   const login = async () => {
//     try {
//       const response = await axios.post('http://localhost:4000/api/users/login', user);
//       console.log(response.data);
//       alert('Logged in successfully');
//       // Redirect to business registration page
//       navigate('/business/register');
//     } catch (error) {
//       console.error(error);
//       alert('Error logging in');
//     }
//   };

//   const navigateToRegister = () => {
//     navigate('/register');
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <form>
//         <div>
//           <label>Email:</label>
//           <input type="email" name="email" value={user.email} onChange={handleChange} />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input type="password" name="password" value={user.password} onChange={handleChange} />
//         </div>
//         <button type="button" onClick={login}>Login</button>
//         <button type="button" onClick={navigateToRegister}>Go to Register</button>
//       </form>
//     </div>
//   );
// };

// export default Login;



import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => { // Accepting onLogin as a prop
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const login = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/users/login', user);
      
      console.log(response.data); // Log the response data to check the structure

      if (response.data && response.data.token) {
        alert('Logged in successfully');
        
        // Store token in local storage
        localStorage.setItem('token', response.data.token);

        // Store user ID or other info if returned by your API.
        localStorage.setItem('userId', response.data.user.id); // Now this should work

        onLogin(response.data.user.id); // Call onLogin function passed as prop

        navigate('/business/search'); 
      } else {
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Error logging in');
    }
  };

  const navigateToRegister = () => {
    navigate('/register');
  };

  return (
    <div>
      <h2>Login</h2>
      <form>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={user.email} onChange={handleChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={user.password} onChange={handleChange} />
        </div>
        <button type="button" onClick={login}>Login</button>
        <button type="button" onClick={navigateToRegister}>Go to Register</button>
      </form>
    </div>
  );
};

export default Login;