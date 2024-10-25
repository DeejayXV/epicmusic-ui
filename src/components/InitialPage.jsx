import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/initialPage.css';

const InitialPage = () => {
  return (
    <div className="home-container">
      <div className="overlay"></div>
      <div className="content">
        <h1 className="title">Benvenuti su EpicMusic</h1>
        <p className="subtitle">Inizia subito a esplorare la tua musica preferita</p>
        <div className="buttons-container">
          <Link to="/register" className="button register-button">Registrati</Link>
          <Link to="/login" className="button login-button">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default InitialPage;
