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
import FeaturedArtists from "./components/FeaturedArtists";
import ArtistPage from "./components/ArtistPage";
import TopBar from "./components/TopBar";
import PlayerBar from "./components/PlayerBar";
import "./App.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null); // Stato per la traccia attualmente in riproduzione
  const [trackList, setTrackList] = useState([]); // Stato per la lista delle tracce

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const playTrack = (track, tracks) => {
    setCurrentTrack(track);
    setTrackList(tracks);
  };

  const playNextTrack = () => {
    if (trackList.length > 0 && currentTrack) {
      const currentIndex = trackList.findIndex((t) => t.id === currentTrack.id);
      if (currentIndex < trackList.length - 1) {
        setCurrentTrack(trackList[currentIndex + 1]);
      }
    }
  };

  const playPreviousTrack = () => {
    if (trackList.length > 0 && currentTrack) {
      const currentIndex = trackList.findIndex((t) => t.id === currentTrack.id);
      if (currentIndex > 0) {
        setCurrentTrack(trackList[currentIndex - 1]);
      }
    }
  };

  return (
    <div className="app" style={{ margin: "0 20px" }}>
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
                  <Route path="/artists" element={<FeaturedArtists />} />
                  <Route path="/artists/:artistId" element={<ArtistPage playTrack={playTrack} />} />
                </Routes>
              </Col>
            </Row>
          </Container>
          <PlayerBar track={currentTrack} onNext={playNextTrack} onPrevious={playPreviousTrack} />
        </>
      )}
    </div>
  );
};

export default App;
