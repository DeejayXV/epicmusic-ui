import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
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
import TrendingTracks from "./components/TrendingTracks";
import TrendingPodcasts from "./components/TrendingPodcasts";
import TopBar from "./components/TopBar";
import PlayerBar from "./components/PlayerBar";
import SearchResults from "./components/SearchResults";
import "./App.css";
import axios from "axios";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [trackList, setTrackList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/");
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

  const handleSearch = async (searchTerm) => {
    if (!token) {
      try {
        const response = await axios.get("http://localhost:3001/api/spotify/token");
        setToken(response.data.access_token);
      } catch (error) {
        console.error("Error getting token:", error);
        return;
      }
    }

    try {
      const encodedSearchTerm = encodeURIComponent(searchTerm);

      const response = await axios.get(`https://api.spotify.com/v1/search?q=${encodedSearchTerm}&type=album,artist,track`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error.response ? error.response.data : error.message);
    }
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
          <TopBar onLogout={handleLogout} onSearch={handleSearch} />
          <Container fluid className="content-container">
            <Row>
              <Col
                md={9}
                className="main-content"
                style={{ overflowY: "auto", maxHeight: "calc(100vh - 60px)", scrollbarWidth: "thin", scrollbarColor: "#8b8a8a" }}
              >
                <Routes>
                  <Route path="/" element={<Feed setCurrentTrack={playTrack} />} />
                  <Route path="/playlists" element={<Playlists />} />
                  <Route path="/playlists/:playlistId" element={<PlaylistDetail />} />
                  <Route path="/albums" element={<FeaturedAlbums playTrack={playTrack} />} />
                  <Route path="/albums/:albumId" element={<AlbumPage playTrack={playTrack} />} />
                  <Route path="/artists" element={<FeaturedArtists />} />
                  <Route path="/artists/:artistId" element={<ArtistPage playTrack={playTrack} />} />
                  <Route path="/tracks" element={<TrendingTracks playTrack={playTrack} />} />
                  <Route path="/podcasts" element={<TrendingPodcasts playTrack={playTrack} />} />
                  <Route path="/search" element={<SearchResults results={searchResults} playTrack={playTrack} />} />
                </Routes>
              </Col>
              <Col
                md={2}
                className="sidebar-container"
                style={{ overflowY: "auto", maxHeight: "calc(100vh - 60px)", scrollbarWidth: "thin", scrollbarColor: "#8b8a8a" }}
              >
                <Sidebar />
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
