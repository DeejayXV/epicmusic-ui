import React, { useState } from "react";
import { Container, Navbar, Form, FormControl, Button, Dropdown, Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../styles/topbar.css";
import logoImage from "../assets/images/logo.png";

const TopBar = ({ onLogout, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
      navigate("/search");
    }
  };

  return (
    <Navbar fixed="top" className="top-bar">
      <Container fluid>
        <Row className="align-items-center" style={{ width: "100%" }}>
          {/* Colonna sinistra - Logo */}
          <Col xs={2} className="d-flex align-items-center" style={{ paddingLeft: '10%' }}>
            <Navbar.Brand as={Link} to="/">
              <img src={logoImage} alt="EpicMusic Logo" style={{ height: '35px', width: '150px' }} />
            </Navbar.Brand>
          </Col>

          {/* Colonna centrale - Searchbar */}
          <Col xs={7} className="d-flex justify-content-center" style={{ paddingLeft: '15%' }}>
            <Form className="d-flex w-100" onSubmit={handleSearchSubmit}>
              <FormControl
                type="search"
                placeholder="Search for songs, artists or albums"
                className="me-2 search-input"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <Button variant="outline-info" type="submit">
                Search
              </Button>
            </Form>
          </Col>

          {/* Colonna destra - Profilo utente */}
          <Col xs={3} className="d-flex justify-content-end" style={{ paddingRight: '10%' }}>
            <Dropdown align="end">
              <Dropdown.Toggle variant="secondary" id="dropdown-avatar" className="avatar-dropdown">
                <img
                  src="https://source.unsplash.com/random/50x50/?profile"
                  alt="Profile"
                  className="rounded-circle avatar"
                />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/account">Account</Dropdown.Item>
                <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
                <Dropdown.Item as={Link} to="/settings">Settings</Dropdown.Item>
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
