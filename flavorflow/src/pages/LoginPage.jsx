import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/util.css';
import '../styles/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Link } from "react-router-dom";
import axios from 'axios';

const LoginPage = () => {
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  // const navigate = useNavigate();

  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   // Dummy login, for demonstration purposes.
  //   if (username && password) {
  //     setIsLoggedIn(true);
  //     navigate('/');
  //   }
  // };

  // return (
  //   <div className="login-container">
  //     <h2>Login</h2>
  //     <form onSubmit={handleLogin} className="login-form">
  //       <input
  //         type="text"
  //         placeholder="Username"
  //         value={username}
  //         onChange={(e) => setUsername(e.target.value)}
  //         className="login-input"
  //       />
  //       <input
  //         type="password"
  //         placeholder="Password"
  //         value={password}
  //         onChange={(e) => setPassword(e.target.value)}
  //         className="login-input"
  //       />
  //       <button type="submit" className="login-button">Login</button>
  //     </form>
  //     <p>Don't have an account? <span className="signup-link" onClick={() => navigate('/signup')}>Sign Up</span></p>
  //   </div>
  // );
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

            {/* Username Field */}
            <div className="wrap-input100 validate-input" data-validate="Enter email">
              {/* <input
                  className="input100"
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                /> */}
              <input
                type="email"
                placeholder="Enter Email"
                className="form-control"
                id="exampleInputEmail1"
                onChange={(event) => setEmail(event.target.value)}
                required
              />
              <span className="focus-input100" data-placeholder="&#xf207;"></span>
            </div>

            {/* Password Field */}
            <div className="wrap-input100 validate-input" data-validate="Enter password">
              {/* <input
                  className="input100"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                /> */}
              <input
                type="password"
                placeholder="Enter Password"
                className="form-control"
                id="exampleInputPassword1"
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              <span className="focus-input100" data-placeholder="&#xf191;"></span>
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
  // return (
  //     <div>
  //         <div className="d-flex justify-content-center align-items-center text-center vh-100" style= {{backgroundImage : "linear-gradient(#00d5ff,#0095ff,rgba(93,0,255,.555))"}}>
  //             <div className="bg-white p-3 rounded" style={{width : '40%'}}>
  //                 <h2 className='mb-3 text-primary'>Login</h2>
  //                 <form onSubmit={handleSubmit}>
  //                     <div className="mb-3 text-start">
  //                         <label htmlFor="exampleInputEmail1" className="form-label">
  //                             <strong>Email Id</strong>
  //                         </label>
  //                         <input 
  //                             type="email" 
  //                             placeholder="Enter Email"
  //                             className="form-control" 
  //                             id="exampleInputEmail1" 
  //                             onChange={(event) => setEmail(event.target.value)}
  //                             required
  //                         /> 
  //                     </div>
  //                     <div className="mb-3 text-start">
  //                         <label htmlFor="exampleInputPassword1" className="form-label">
  //                             <strong>Password</strong>
  //                         </label>
  //                         <input 
  //                             type="password" 
  //                             placeholder="Enter Password"
  //                             className="form-control" 
  //                             id="exampleInputPassword1" 
  //                             onChange={(event) => setPassword(event.target.value)}
  //                             required
  //                         />
  //                     </div>
  //                     <button type="submit" className="btn btn-primary">Login</button>
  //                 </form>
  //                 {/* TO add ' appostopee */}
  //                 <p>Don't have an account? <span className="signup-link" onClick={() => navigate('/signup')}>Sign Up</span></p>
  //                 {/* <Link to='/register' className="btn btn-secondary">Register</Link> */}
  //             </div>
  //         </div>
  //     </div>

  // )
}

export default LoginPage;

