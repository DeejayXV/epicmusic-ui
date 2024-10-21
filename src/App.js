import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Feed from "./pages/Feed";
import Playlists from "./pages/Playlists";
import Statistics from "./pages/Statistics";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import InitialPage from "./components/InitialPage"; // Assicurati che il percorso sia corretto
import "./App.css";

const App = () => {
  const isAuthenticated = false; // Questo dovrebbe essere dinamico, basato sullo stato di autenticazione dell'utente

  return (
    <div className="app">
      {!isAuthenticated ? (
        // Se l'utente non è autenticato, mostra la pagina iniziale
        <InitialPage />
      ) : (
        <>
          <Sidebar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Feed />} />
              <Route path="/playlists" element={<Playlists />} />
              <Route path="/statistics" element={<Statistics />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
