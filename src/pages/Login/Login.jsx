import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doSignInWithEmailAndPassword } from '../../firebase/auth';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await doSignInWithEmailAndPassword(email, password);
      navigate('/');
    } catch (error) {
      console.log('error', error);
      setErrorMessage(error.message);
    }
  }

  const headerContainer = {
    justifyContent: 'center',
    alignItems: 'center',
  };

  const headerText = {
    fontSize: 58,
    color: '#273757',
    fontWeight: 800,
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <div style={headerContainer} className='header-container'>
          <h2 style={headerText} className='h2-header'>LOGIN</h2>
          <p className='subHeader'>Please enter your details to proceed with the platform.</p>
        </div>
        <form onSubmit={onSubmit}>
          <div>
            <input type='email' autoComplete='email' required value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <input type='password' autoComplete='current-password' required value={password} placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
          </div>

          {errorMessage && (<div className='error-message'>{errorMessage}</div>)}
          <button type="submit" className='login-button'>Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
