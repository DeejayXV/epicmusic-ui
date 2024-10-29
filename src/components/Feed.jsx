import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, ListGroup } from "react-bootstrap";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../styles/feed.css";

const Feed = ({ setCurrentTrack }) => {
  const [suggestedAlbums, setSuggestedAlbums] = useState([]);
  const [tracksOfTheDay, setTracksOfTheDay] = useState([]);
  const [suggestedTracks, setSuggestedTracks] = useState([]);
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        // Richiedi il token dal backend Spring Boot
        const response = await axios.get('http://localhost:3001/api/spotify/token');
        setToken(response.data.access_token);
      } catch (error) {
        console.error('Error getting token:', error);
      }
    };

    fetchToken();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;

      try {
        // Richiedi album suggeriti
        const albumsResponse = await axios.get('https://api.spotify.com/v1/browse/new-releases', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSuggestedAlbums(albumsResponse.data.albums.items.slice(0, 8));

        // Richiedi le tracce del giorno
        const tracksResponse = await axios.get('https://api.spotify.com/v1/browse/featured-playlists', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const playlistId = tracksResponse.data.playlists.items[0].id;
        const playlistTracksResponse = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTracksOfTheDay(playlistTracksResponse.data.tracks.items.slice(0, 3).map(item => item.track));

        // Richiedi le tracce suggerite
        const suggestedTracksResponse = await axios.get('https://api.spotify.com/v1/recommendations?seed_genres=pop', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSuggestedTracks(suggestedTracksResponse.data.tracks.slice(0, 10)); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [token]);

  const handlePlayTrack = (track) => {
    setCurrentTrack(track);
  };

  return (
    <Container fluid className="feed-container">
      <Row>
        
        <Col xs={12} className="feed-main">
          <h2 className="feed-title">Suggested Albums</h2>
          <Row>
            {suggestedAlbums.map((album) => (
              <Col key={album.id} xs={6} md={3} className="mb-4">
                <Card className="feed-card">
                  <Card.Img variant="top" src={album.images[0]?.url} alt={album.name} />
                  <Card.Body>
                    <Card.Title style={{ fontSize: '14px' }}>{album.name}</Card.Title>
                    <Card.Text style={{ fontSize: '12px' }}>By {album.artists.map(artist => artist.name).join(', ')}</Card.Text>
                    <Button onClick={() => navigate(`/albums/${album.id}`)}>View Album</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <h2 className="feed-title mt-4">Tracks of the Day</h2>
          <Row>
            {tracksOfTheDay.map((track) => (
              <Col key={track.id} xs={6} md={4} className="mb-4">
                <Card className="feed-card">
                  <Card.Img variant="top" src={track.album.images[0]?.url} alt={track.name} />
                  <Card.Body>
                    <Card.Title>{track.name}</Card.Title>
                    <Card.Text>By {track.artists.map(artist => artist.name).join(', ')}</Card.Text>
                    <Button variant="outline-secondary" onClick={() => handlePlayTrack(track)}>Play</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* <h2 className="feed-title mt-4">Suggested Tracks</h2> */}
          <ListGroup className="suggested-tracks-list">
            {suggestedTracks.map((track, index) => (
              <ListGroup.Item key={index} className="suggested-track-item" action onClick={() => handlePlayTrack(track)}>
                <div>
                  <strong>{track.name}</strong> - {track.artists.map(artist => artist.name).join(', ')}
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default Feed;
