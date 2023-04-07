import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ClientRegistration from './pages/ClientRegistration';
import api_axios from './api'
import Catalogo from './pages/Catalog';
import {BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './pages/SignIn';
import ClientList from './pages/ClientList';
import NavBar from './navBar';
import SignUp from './pages/SignUp';
import AreaRegistration from './pages/areaRegistration';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <NavBar />
      <Routes>
        <Route path="/clientRegistration" element={<ClientRegistration api = {api_axios}/>} />
        <Route path="/areaRegistration" element={<AreaRegistration api = {api_axios}/>} />
        <Route path="/catalogo" element={<Catalogo api = {api_axios}/>} />
        <Route path="/" element={<SignIn/>} />
        <Route path="/clientList" element={<ClientList api = {api_axios}/>} />
        <Route path="/signUp" element={<SignUp api = {api_axios}/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
