import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { auth } from '../config/firebase';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext); // To update user context

  const handleLogIn = async(e) => {
    e.preventDefault();

    try{
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user); // Update the user in context
      toast.success("User Logged in Successfully");
      navigate('/dashboard');
    }
    catch(error) {
      console.log(error);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  }

  return (
    <>
    <form className="login-form">
      <h2>Log In</h2>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="form-group remember-me">
        <input
          type="checkbox"
          id="rememberMe"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
        />
        <label htmlFor="rememberMe">Remember Me</label>
      </div>
      <button type="submit" className="login-btn" onClick={handleLogIn}>
        LOG IN
      </button>
      <p><a href="/forgot-password">Forgot password?</a></p>
      <Link to="/signup"><button type="button" className="create-account-btn">
        CREATE AN ACCOUNT
      </button></Link>
    </form>
    </>
  );
};

export default Login;
