import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Feed from "./pages/Feed";
import Playlists from "./pages/Playlists";
import Statistics from "./pages/Statistics";
import "./App.css";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";

const App = () => {
  return (
    <div className="app">
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
    </div>
  );
};

export default App;
