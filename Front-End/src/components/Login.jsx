import React, { useState } from 'react';
import './Login.css';
import { Helmet } from 'react-helmet';
import UserService from '../services/UserService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await UserService.login(email, password);
      if (token) {
        localStorage.setItem('token', token); // Store the token in localStorage or any other storage
        window.location.href = '/dashboard';
      }
    } catch (error) {
      setErrorMessage('Invalid email or password. Please try again.');
      console.error('Error:', error);
    }
  };

  const handleReset = () => {
    setEmail('');
    setPassword('');
  };

  return (
    <div className="login-container">
      <Helmet>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
          crossOrigin="anonymous"
        />
      </Helmet>
      <div className="login-content">
        <div className="login-form">
          <h1>Login into your account</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-group">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@gmail.com"
                />
                <span className="input-group-text">@</span>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-group">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
                <span className="input-group-text">🔒</span>
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-block">Login</button>
            <div className="error-message">{errorMessage}</div>
          </form>
        </div>
        <div className="login-image">
          <img src="https://img.freepik.com/premium-photo/diamonds-gem-black-background-jewelry-made-with-gemstones-banner-designer-jewelry-shop_726113-1813.jpg" alt="Login" />
        </div>
      </div>
    </div>
  );
};

export default Login;
