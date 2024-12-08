import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/util.css';
import '../styles/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Link } from "react-router-dom";
import axios from 'axios';

const LoginPage = () => {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost:5000/login', { email, password }).then((result) => {
      if (result.data.token) {
        localStorage.setItem('token', result.data.token);
        alert('Login successful!');
        navigate('/profile');
      } else {
        alert(result.data); // Display error message
      }
    });
  }

  return (
    <div className="limiter">
      <div
        className="container-login100"
        style={{ backgroundImage: "url('/wallpaper.jpg')" }}
      >
        <div className="wrap-login100">
          <form id="loginForm" className="login100-form validate-form" onSubmit={handleSubmit}>
            <span className="login100-form-logo">
              <img src="/logo.png" alt="logo" height="200px" />
            </span>

            <span className="login100-form-title p-b-34 p-t-27">Log in</span>

            {/* Email Field */}
            <div className="wrap-input100 validate-input" data-validate="Enter email">
              <input
                name="email"
                placeholder="Enter Email"
                className="input100"
                onChange={(event) => setEmail(event.target.value)}
                required
              />
              <span className="focus-input100"></span>
            </div>

            {/* Password Field */}
            <div className="wrap-input100 validate-input" data-validate="Enter password">
              <input
                type="password"
                placeholder="Enter Password"
                className="input100"
                id="password"
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              <span className="focus-input100"></span>
            </div>

            {/* Remember Me Checkbox */}
            <div className="contact100-form-checkbox">
              <input
                className="input-checkbox100"
                id="ckb1"
                type="checkbox"
                name="rememberMe"
                // checked={formData.rememberMe}
                // onChange={handleChange}
              />
              <label className="label-checkbox100" htmlFor="ckb1">
                Remember me
              </label>
            </div>

            {/* Login Button */}
            <div className="container-login100-form-btn">
              <button type="submit" className="login100-form-btn">
                Login
              </button>
            </div>

            {/* Links */}
            <div className="text-center p-t-90">
              <a className="txt1" onClick={() => navigate('/signup')}>
                Don't have an account? Register now!
              </a>
              <br />
              <a className="txt1" href="/forgot-password">
                Forgot Password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

