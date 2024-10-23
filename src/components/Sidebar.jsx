import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import './Sidebar.css';

const Sidebar = () => {
  const [playlists, setPlaylists] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newPlaylistData, setNewPlaylistData] = useState({
    name: '',
    description: '',
  });

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3001/api/playlists', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setPlaylists(response.data);
      } catch (error) {
        console.error('Errore durante il recupero delle playlist', error);
      }
    };
    fetchPlaylists();
  }, []);

  const handleModalShow = () => setShowModal(true);
  const handleModalClose = () => {
    setShowModal(false);
    setNewPlaylistData({ name: '', description: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPlaylistData({ ...newPlaylistData, [name]: value });
  };

  const createNewPlaylist = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:3001/api/playlists',
        newPlaylistData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setPlaylists([...playlists, response.data]);
      handleModalClose();
    } catch (error) {
      console.error('Errore durante la creazione della playlist', error);
    }
  };

  return (
    <div className="sidebar">
      <nav className="menu">
        <Link to="/">Home</Link>
      </nav>
      <h4 className='miniTitle mt-4'>My Collection</h4>
      <nav className="menu">
        <Link to="/albums">Albums</Link>
        <Link to="/tracks">Tracks</Link>
        <Link to="/videos">Videos</Link>
        <Link to="/artists">Artists</Link>
        <Link to="/podcasts">Podcasts</Link>
      </nav>
      <div className="user-playlists">
        <h4 className='miniTitle mt-4'>Your Playlists</h4>
        <button className="create-playlist" onClick={handleModalShow}>
          New Playlist +
        </button>
        <ul>
          {playlists.map((playlist) => (
            <li key={playlist.id}>
              <Link to={`/playlists/${playlist.id}`}>{playlist.name}</Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal per creare la nuova playlist */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Crea una nuova Playlist</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formPlaylistName">
              <Form.Label>Nome Playlist</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newPlaylistData.name}
                onChange={handleInputChange}
                placeholder="Inserisci il nome della playlist"
              />
            </Form.Group>
            <Form.Group controlId="formPlaylistDescription" className="mt-3">
              <Form.Label>Descrizione</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={newPlaylistData.description}
                onChange={handleInputChange}
                placeholder="Inserisci una descrizione per la playlist"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Annulla
          </Button>
          <Button variant="primary" onClick={createNewPlaylist}>
            Crea Playlist
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Sidebar;
