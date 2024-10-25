import React from "react";
import { Card, Row, Col, Button } from "react-bootstrap";

const SearchResults = ({ results, playTrack }) => {
  return (
    <div>
      <h2>Search Results</h2>
      <Row>
        {results.tracks?.items.map((track) => (
          <Col key={track.id} xs={6} md={4} className="mb-4">
            <Card className="search-result-card">
              <Card.Img variant="top" src={track.album.images[0]?.url} alt={track.name} />
              <Card.Body>
                <Card.Title>{track.name}</Card.Title>
                <Card.Text>By {track.artists.map((artist) => artist.name).join(", ")}</Card.Text>
                <Button variant="outline-secondary" onClick={() => playTrack(track)}>
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
