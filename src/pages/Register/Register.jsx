import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doCreateUserWithEmailAndPassword } from '../../firebase/auth';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const validatePassword = (password) => {
    if (password.length < 6) {
      throw new Error('Password should be at least 6 characters long.');
    }
    if (!/(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).*$/.test(password)) {
      throw new Error('Password must contain at least one capital letter, one symbol, and one number.');
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      validatePassword(password);
      await doCreateUserWithEmailAndPassword(email, password);
      navigate('/');
    } catch (error) {
      console.log('error', error);
      setErrorMessage(error.message);
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label>Email</label>
          <input type='email' autoComplete='email' required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password</label>
          <input type='password' autoComplete='current-password' required value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        {errorMessage && (<span className='text-red-600 font-bold'>{errorMessage}</span>)}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Register;
