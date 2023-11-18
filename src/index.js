import ReactDOM from 'react-dom/client';
import React from 'react';
import App from './App';
import './styles/main.css';
//biblothèque redux
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import { configureStore } from '@reduxjs/toolkit';


const store = configureStore({
  reducer: rootReducer,
  devTools: true,
})


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
  
);
