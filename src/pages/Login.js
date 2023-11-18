import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Formular from '../components/Formular/Formular';
import Footer from '../components/Footer/Footer';



const Login = () => {
   return (
    <div className='page_login'>
      <Navbar />
      <Formular />
      <Footer />
    </div>
  );
};


export default Login;