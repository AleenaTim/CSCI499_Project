import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';
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
        <div>
            <div className="d-flex justify-content-center align-items-center text-center vh-100" style= {{backgroundImage : "linear-gradient(#00d5ff,#0095ff,rgba(93,0,255,.555))"}}>
                <div className="bg-white p-3 rounded" style={{width : '40%'}}>
                    <h2 className='mb-3 text-primary'>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                <strong>Email Id</strong>
                            </label>
                            <input 
                                type="email" 
                                placeholder="Enter Email"
                                className="form-control" 
                                id="exampleInputEmail1" 
                                onChange={(event) => setEmail(event.target.value)}
                                required
                            /> 
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputPassword1" className="form-label">
                                <strong>Password</strong>
                            </label>
                            <input 
                                type="password" 
                                placeholder="Enter Password"
                                className="form-control" 
                                id="exampleInputPassword1" 
                                onChange={(event) => setPassword(event.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                    {/* TO add ' appostopee */}
                    <p>Don't have an account? <span className="signup-link" onClick={() => navigate('/signup')}>Sign Up</span></p>
                    {/* <Link to='/register' className="btn btn-secondary">Register</Link> */}
                </div>
            </div>
        </div>
        
    )
}

export default LoginPage;
