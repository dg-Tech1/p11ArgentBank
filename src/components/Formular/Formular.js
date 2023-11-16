
import React, { useState } from 'react';
import './formular.css';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/store.action';
import { useNavigate } from 'react-router-dom';

const Form = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '', rememberMe: false });
  const dispatch = useDispatch();
  const loginError = useSelector((state) => state.user.loginError);
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    dispatch(loginUser(credentials.email, credentials.password, navigate, credentials.rememberMe));
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.id]: e.target.value });
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSignIn}>
          {['email', 'password'].map((field) => (
            <div className="input-wrapper" key={field}>
              <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                type={field}
                id={field}
                value={credentials[field]}
                onChange={handleChange}
                required
              />
            </div>
          ))}
          <div className="input-remember">
            <input
              type="checkbox"
              id="rememberMe"
              checked={credentials.rememberMe}
              onChange={(e) => setCredentials({ ...credentials, rememberMe: e.target.checked })}
            />
            <label htmlFor="rememberMe">Remember me</label>
          </div>
          {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
          <button className="sign-in-button" type="submit">Sign In</button>
        </form>
      </section>
    </main>
  );
};

export default Form;
