import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./Feed.css";

const Feed = () => {
  return (
    <Container fluid className="feed-container">
      <Row>
        
        <Col xs={8} className="feed-main">
          <h2 className="feed-title">Playlist of the day</h2>
          <Card className="feed-card">
            <Card.Img
              variant="top"
              src="https://source.unsplash.com/featured/?music"
              alt="Playlist of the day"
            />
            <Card.Body>
              <Card.Title>Between Death and Dreams</Card.Title>
              <Card.Text>Discover our exclusive playlist of the day!</Card.Text>
              <Button variant="primary">Listen Now</Button>
            </Card.Body>
          </Card>

        
          <div className="feed-playlists mt-3">
            <h3>My Playlist</h3>
            <Row>
              <Col xs={6} md={4}>
                <Card className="feed-playlist-card">
                  <Card.Img
                    variant="top"
                    src="https://source.unsplash.com/featured/?guitar"
                    alt="Playlist 1"
                  />
                  <Card.Body>
                    <Card.Title>Workout Gym</Card.Title>
                    <Button variant="outline-secondary">Play</Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={6} md={4}>
                <Card className="feed-playlist-card">
                  <Card.Img
                    variant="top"
                    src="https://source.unsplash.com/featured/?concert"
                    alt="Playlist 2"
                  />
                  <Card.Body>
                    <Card.Title>Funny Stuff</Card.Title>
                    <Button variant="outline-secondary">Play</Button>
                  </Card.Body>
                </Card>
              </Col>
              {/* Aggiungi altre colonne per le playlist se necessario */}
            </Row>
          </div>
        </Col>

        {/* Sidebar destra o altre informazioni - Col 3 */}
        <Col xs={4} className="right-sidebar">
          <div className="statistics-section">
            <h3>Statistics</h3>
            <p>Favorite songs: 247</p>
            <p>Listened recently: 363</p>
            <p>Total Streams: 29</p>
          </div>
          <div className="upgrade-section">
            <Card className="upgrade-card">
              <Card.Body>
                <Card.Title>Check the power of EpicMusic</Card.Title>
                <Card.Text>
                  Enjoy uninterrupted music streaming with our premium subscription.
                </Card.Text>
                <Button variant="success">Upgrade</Button>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Feed;
