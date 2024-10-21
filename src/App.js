import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Feed from "./pages/Feed";
import Playlists from "./pages/Playlists";
import Statistics from "./pages/Statistics";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import InitialPage from "./components/InitialPage";
import "./App.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="app">
      {!isAuthenticated ? (
        <Routes>
          <Route path="/" element={<InitialPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
        </Routes>
      ) : (
        <>
          <Sidebar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Feed />} />
              <Route path="/playlists" element={<Playlists />} />
              <Route path="/statistics" element={<Statistics />} />
            </Routes>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
