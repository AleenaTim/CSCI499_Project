import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Link } from "react-router-dom";
import axios from 'axios';
import '../styles/util.css';
import '../styles/main.css';
import 'font-awesome/css/font-awesome.min.css';
import 'animate.css/animate.min.css';
import 'hamburgers/dist/hamburgers.min.css';
import 'animsition/dist/css/animsition.min.css';
import 'select2/dist/css/select2.min.css';
import 'daterangepicker/daterangepicker.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUpPage = () => {
  
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://flavorflow-ovph.onrender.com' 
  : 'http://localhost:5000';

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await axios.post(`${BASE_URL}/register`, {
        username,
        firstName,
        lastName,
        email,
        password,
      });
      if (result.data === 'Already registered') {
        console.log(result.data);
        toast.error('E-mail already registered! Please login to proceed.',
          {
            autoClose: 3000,
            onOpen: () => console.log('Toast Opened'),
            onClose: () => console.log('Toast Closed'),
      });
        navigate('/login');
      } else {
        toast.success('Registered successfully! Please login to proceed.');
        navigate('/login');
      }
    } catch (error) {
      toast.error('An error occurred during registration. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="limiter">
      <div
        className="container-login100"
        style={{ backgroundImage: `url('/wallpaper.jpg')` }}
      >
        <div className="wrap-login100">
          <form onSubmit={handleSubmit} className="login100-form validate-form">
            <span className="login100-form-logo">
              <img src="/logo.png" alt="logo" height="200px" width="274px"/>
            </span>

            <span className="login100-form-title p-b-34 p-t-27">
              Create an Account
            </span>

            <div className="wrap-input100 validate-input" data-validate="Enter username">
              <input
                className="input100"
                name="username"
                placeholder="Username"
                onChange={(event) => setUsername(event.target.value)}
                required
              />
              <span className="focus-input100"></span>
            </div>

            <div className="wrap-input100 validate-input" data-validate="Enter first name">
              <input
                className="input100"
                name="firstName"
                placeholder="First Name"
                onChange={(event) => setFirstName(event.target.value)}
                required
              /><span className="focus-input100"></span>
            </div>

            <div className="wrap-input100 validate-input" data-validate="Enter last name">
              <input
                className="input100"
                name="lastName"
                placeholder="Last Name"
                onChange={(event) => setLastName(event.target.value)}
                required
              /><span className="focus-input100"></span>
            </div>

            <div className="wrap-input100 validate-input" data-validate="Enter email">
              <input
                className="input100"
                type="email"
                name="email"
                placeholder="Email"
                onChange={(event) => setEmail(event.target.value)}
                required
              />
              <span className="focus-input100"></span>
            </div>

            <div className="wrap-input100 validate-input" data-validate="Enter password">
              <input
                className="input100"
                type="password"
                name="pass"
                placeholder="Enter Password"
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              <span className="focus-input100"></span>
            </div>

            <div className="contact100-form-checkbox">
              <input
                className="input-checkbox100"
                id="ckb1"
                type="checkbox"
                name="remember-me"
              />
              <label className="label-checkbox100" htmlFor="ckb1">
                Remember me
              </label>
            </div>

            <div className="container-login100-form-btn">
              <button className="login100-form-btn">Register</button>
            </div>

            <div className="text-center p-t-90">
              <div className="txt1" onClick={() => navigate('/login')}>
                Already have an account? Login here!
              </div>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default SignUpPage;