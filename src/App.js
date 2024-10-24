import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";
import Playlists from "./pages/Playlists";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import InitialPage from "./components/InitialPage";
import PlaylistDetail from "./components/PlaylistDetail";

import TopBar from "./components/TopBar";
import "./App.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

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
          <TopBar onLogout={handleLogout} />
          <Container fluid className="content-container">
            <Row>
              <Col md={2} className="sidebar-container">
                <Sidebar />
              </Col>
              <Col md={7} className="main-content">
                <Routes>
                  <Route path="/" element={<Feed />} />
                  <Route path="/playlists" element={<Playlists />} />
                  <Route path="/playlists/:playlistId" element={<PlaylistDetail />} /> {/* Nuova route per i dettagli della playlist */}
                </Routes>
              </Col>
              <Col md={3} className="right-sidebar">
                {/* Right Sidebar content can be added here, e.g., recommendations or new releases */}
              </Col>
            </Row>
          </Container>
        </>
      )}
    </div>
  );
};

export default App;
