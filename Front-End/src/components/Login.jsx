import React, { useState } from 'react';
import './Login.css';
import login_ic from '../assets/Login.jpg';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import handleRedirect from './HandleFunction/handleRedirect';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Fetch the list of users from the API
      const response = await axios.get('https://6670fb58e083e62ee439a8f8.mockapi.io/Account');
      const users = response.data;

      // Check if the provided username and password exist in the fetched data
      const user = users.find(user => user.username === username && user.password === password);

      if (user) {
        // Login successful, redirect to dashboard page
        window.location.href = '/dashboard';
      } else {
        // Credentials are incorrect, display error message
        setErrorMessage('Invalid username or password. Please try again.');
      }
    } catch (error) {
      // API returned an error, display error message
      setErrorMessage('Error logging in. Please try again.'); 
      console.error('Error:', error);
    }
  };

  const handleReset = () => {
    setUsername('');
    setPassword('');
  };

  return (
    <div>
      <Helmet>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
          crossOrigin="anonymous"
        />
      </Helmet>
      <div className="background-image" style={{ backgroundImage: `url(${login_ic})` }}>
        <div className="login-form">
          <h1 style={{ color: '#163957' }}>
            Administrator Login
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label style={{ color: '#163957' }} htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
              />
            </div>
            <div className="form-group">
              <label style={{ color: '#163957' }} htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
            </div>
            <div className="rows">
              <div className="col-md-6">
                <button
                  style={{ width: '600px' }}
                  type="submit"
                  className="btn btn-primary"
                >
                  Login
                </button>
              </div>
              <br />
              <div className="col-md-6">
                <button
                  style={{ width: '600px' }}
                  type="reset"
                  className="btn btn-primary"
                  onClick={handleReset}
                >
                  Reset
                </button>
              </div>
              <div style={{ color: 'red' }}>{errorMessage}</div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
