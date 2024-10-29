import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Card, Button } from "react-bootstrap";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../styles/feed.css";

const Feed = ({ setCurrentTrack }) => {
  const [suggestedAlbums, setSuggestedAlbums] = useState([]);
  const [suggestedArtists, setSuggestedArtists] = useState([]);
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
        setSuggestedAlbums(albumsResponse.data.albums.items.slice(0, 15));

        // Richiedi artisti suggeriti
        const artistsResponse = await axios.get('https://api.spotify.com/v1/browse/categories', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSuggestedArtists(artistsResponse.data.categories.items.slice(0, 8));

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
          <h2 className="feed-title">Trending</h2>
          <div className="album-scroll-container">
            <Row className="flex-nowrap">
              {suggestedAlbums.map((album) => (
                <Col key={album.id} xs={6} md={2} className="mb-4">
                  <Card className="feed-card">
                    <Card.Img variant="top" src={album.images[0]?.url} alt={album.name} />
                    <Card.Body>
                      <Card.Title className="card-title-ellipsis" style={{ fontSize: '14px' }}>{album.name}</Card.Title>
                      <Card.Text className="card-artist-ellipsis" style={{ fontSize: '12px' }}>By {album.artists.map(artist => artist.name).join(', ')}</Card.Text>
                      <Button onClick={() => navigate(`/albums/${album.id}`)}>View Album</Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>

          <h2 className="feed-title mt-4">Artists suggested for you!</h2>
          <div className="artist-scroll-container">
            <Row className="flex-nowrap">
              {suggestedArtists.map((artist) => (
                <Col key={artist.id} xs={6} md={2} className="mb-4">
                  <Card className="feed-card">
                    <Card.Img variant="top" src={artist.icons[0]?.url} alt={artist.name} />
                    <Card.Body>
                      <Card.Title className="card-title-ellipsis" style={{ fontSize: '14px' }}>{artist.name}</Card.Title>
                      <Button onClick={() => navigate(`/artists/${artist.id}`)}>View Artist</Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>

          <h2 className="feed-title mt-4">Suggested Tracks</h2>
          <Table className="suggested-tracks-table" borderless>
            <thead>
              <tr>
                <th>Title</th>
                <th>Artist</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              {suggestedTracks.map((track, index) => (
                <tr key={index} className="suggested-track-item" onClick={() => handlePlayTrack(track)}>
                  <td className="track-title-ellipsis" style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>{track.name}</td>
                  <td className="track-artist-ellipsis" style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>{track.artists.map(artist => artist.name).join(', ')}</td>
                  <td>{Math.floor(track.duration_ms / 60000)}:{(Math.floor((track.duration_ms % 60000) / 1000)).toString().padStart(2, '0')}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Feed;
