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
import FeaturedAlbums from "./components/FeaturedAlbums";
import AlbumPage from "./components/AlbumPage";
import TopBar from "./components/TopBar";
import PlayerBar from "./components/PlayerBar";
import "./App.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentTrackUri, setCurrentTrackUri] = useState(null); // Stato per la traccia attualmente in riproduzione

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const playTrack = (trackUri) => {
    setCurrentTrackUri(trackUri);
  };

  return (
    <div className="app" style={{ margin: "0 10%" }}>
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
              <Col
                md={3}
                className="sidebar-container"
                style={{ overflowY: "auto", maxHeight: "calc(100vh - 60px)", scrollbarWidth: "thin", scrollbarColor: "#1db954 #f8f8f8" }}
              >
                <Sidebar />
              </Col>
              <Col
                md={9}
                className="main-content"
                style={{ overflowY: "auto", maxHeight: "calc(100vh - 60px)", scrollbarWidth: "thin", scrollbarColor: "#1db954 #f8f8f8" }}
              >
                <Routes>
                  <Route path="/" element={<Feed />} />
                  <Route path="/playlists" element={<Playlists />} />
                  <Route path="/playlists/:playlistId" element={<PlaylistDetail />} />
                  <Route path="/albums" element={<FeaturedAlbums playTrack={playTrack} />} />
                  <Route path="/albums/:albumId" element={<AlbumPage playTrack={playTrack} />} />
                </Routes>
              </Col>
            </Row>
          </Container>
          <PlayerBar trackUri={currentTrackUri} />
        </>
      )}
    </div>
  );
};

export default App;
