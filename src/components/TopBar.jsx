import React from "react";
import { Container, Navbar, Form, FormControl, Button, Dropdown, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./TopBar.css";

const TopBar = ({ onLogout }) => {
  return (
    <Navbar bg="dark" variant="dark" fixed="top" className="top-bar">
      <Container fluid>
        <Row className="align-items-center" style={{ width: "100%" }}>
          {/* Colonna sinistra - Logo */}
          <Col xs={2} className="d-flex align-items-center">
            <Navbar.Brand as={Link} to="/">
              EpicMusic
            </Navbar.Brand>
          </Col>

          {/* Colonna centrale - Searchbar */}
          <Col xs={7}>
            <Form className="d-flex">
              <FormControl type="search" placeholder="Search for songs, artists or albums" className="me-2" />
              <Button variant="outline-success">Cerca</Button>
            </Form>
          </Col>

          {/* Colonna destra - Profilo utente */}
          <Col xs={3} className="d-flex justify-content-end">
            <Dropdown align="end">
              <Dropdown.Toggle variant="secondary" id="dropdown-avatar">
                <img
                  src="https://source.unsplash.com/random/50x50/?profile"
                  alt="Avatar"
                  className="rounded-circle avatar"
                />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/account">Account</Dropdown.Item>
                <Dropdown.Item as={Link} to="/profile">Profilo</Dropdown.Item>
                <Dropdown.Item as={Link} to="/settings">Impostazioni</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={onLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default TopBar;
