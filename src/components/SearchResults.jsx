import React from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import "../styles/searchResults.css";

const SearchResults = ({ results, playTrack }) => {
  return (
    <div className="search-results-container">
      <h2>Search Results</h2>
      <Row>
        {results.tracks?.items.map((track) => (
          <Col key={track.id} xs={6} md={4} className="mb-4">
            <Card className="search-result-card">
              <Card.Img variant="top" src={track.album.images[0]?.url} alt={track.name} className="track-image" />
              <Card.Body>
                <Card.Title>{track.name}</Card.Title>
                <Card.Text>By {track.artists.map((artist) => artist.name).join(", ")}</Card.Text>
                <Button variant="outline-secondary" onClick={() => playTrack(track)} className="play-button">
                  Play
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default SearchResults;
