import React, { useState } from "react";
import { Container, Navbar, Form, FormControl, Button, Dropdown, Col, Row, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../styles/topbar.css";
import logoImage from "../assets/images/logo.png"; // Assumendo che il file del logo si chiami 'logo.png'

const TopBar = ({ onLogout, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileName, setProfileName] = useState("Your Name");
  const [profileImage, setProfileImage] = useState("https://source.unsplash.com/random/50x50/?profile");
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
      navigate("/search"); // Naviga alla pagina dei risultati della ricerca
    }
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handleProfileSave = () => {
    // Logica per salvare il nuovo nome e immagine (potrebbe essere una richiesta al backend)
    setShowProfileModal(false);
  };

  return (
    <>
      <Navbar fixed="top" className="top-bar">
        <Container fluid>
          <Row className="align-items-center" style={{ width: "100%" }}>
            {/* Colonna sinistra - Logo */}
            <Col xs={2} className="d-flex align-items-center" style={{ paddingLeft: '10%' }}>
              <Navbar.Brand as={Link} to="/">
                <img src={logoImage} alt="EpicMusic Logo" style={{ height: '40px' }} />
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
                <Button variant="outline-success" type="submit">
                  Search
                </Button>
              </Form>
            </Col>

            {/* Colonna destra - Profilo utente */}
            <Col xs={3} className="d-flex justify-content-end" style={{ paddingRight: '10%' }}>
              <Dropdown align="end">
                <Dropdown.Toggle variant="secondary" id="dropdown-avatar" className="avatar-dropdown">
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="rounded-circle avatar"
                    style={{ width: '40px', height: '40px' }}
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/account">Account</Dropdown.Item>
                  <Dropdown.Item onClick={() => setShowProfileModal(true)}>Edit Profile</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/settings">Settings</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={onLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
        </Container>
      </Navbar>

      {/* Modal per modificare il profilo */}
      <Modal show={showProfileModal} onHide={() => setShowProfileModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formProfileName">
              <Form.Label>Profile Name</Form.Label>
              <Form.Control
                type="text"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formProfileImage" className="mt-3">
              <Form.Label>Profile Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleProfileImageChange}
              />
              {profileImage && (
                <div className="mt-3">
                  <img
                    src={profileImage}
                    alt="New Profile"
                    className="rounded-circle"
                    style={{ width: '70px', height: '70px', objectFit: 'cover' }}
                  />
                </div>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowProfileModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleProfileSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TopBar;
