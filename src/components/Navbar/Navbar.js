// Navbar.js
import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../assets/argentBankLogo.webp';
import { logoutUser, fetchUserProfile } from '../../store/store.action';
import './navbar.css';

const Navbar = () => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  const userProfile = useSelector((state) => state.user.userProfile);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, token]);

  const handleSignOut = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
    navigate('/');
  };

  const renderNavLinks = () => {
    if (token) {
      return (
        <>
          <NavLink to='/user-profil' className='main-nav-item'>
            <i className='fa fa-user-circle'></i>
            {userProfile.userName}
          </NavLink>
          <NavLink to='/' className='main-nav-item' onClick={handleSignOut}>
            <i className='fa fa-sign-out'></i>
            Sign Out
          </NavLink>
        </>
      );
    } else {
      return (
        <NavLink to='/login' className='main-nav-item'>
          <i className='fa fa-user-circle'></i>
          Sign In
        </NavLink>
      );
    }
  };

  return (
    <nav className='main-nav'>
      <NavLink to='/' className='main-nav-logo'>
        <img src={logo} alt='Argent Bank Logo' className='main-nav-logo-image' />
        <h1 className='sr-only'>Argent Bank</h1>
      </NavLink>
      <div className='navbar_loginSuccess'>
        {renderNavLinks()}
      </div>
    </nav>
  );
};

export default Navbar;
