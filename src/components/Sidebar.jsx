import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';
import { Link } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import '../styles/sidebar.css';

const Sidebar = () => {
  const [playlists, setPlaylists] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newPlaylistData, setNewPlaylistData] = useState({
    name: '',
    description: '',
  });

  // Funzione per aprire il modal
  const handleModalShow = () => setShowModal(true);

  // Funzione per chiudere il modal
  const handleModalClose = () => {
    setShowModal(false);
    setNewPlaylistData({ name: '', description: '' });
  };

  // Funzione per gestire il cambiamento di input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPlaylistData({ ...newPlaylistData, [name]: value });
  };

  // Funzione per recuperare le playlist dell'utente
  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await axiosInstance.get('/playlists');
        setPlaylists(response.data);
      } catch (error) {
        console.error('Errore durante il recupero delle playlist', error);
      }
    };
    fetchPlaylists();
  }, []);

  // Funzione per creare una nuova playlist
  const createNewPlaylist = async () => {
    try {
      const response = await axiosInstance.post('/playlists', newPlaylistData);
      setPlaylists([...playlists, response.data]);
      handleModalClose();
    } catch (error) {
      console.error('Errore durante la creazione della playlist', error);
    }
  };

  return (
    <div className="sidebar" style={{ overflowY: 'auto', maxHeight: '100vh', scrollbarWidth: 'thin', scrollbarColor: '#1db954 #f8f8f8' }}>
      <nav className="menu">
        <Link to="/">Home</Link>
      </nav>
      <h4 className='miniTitle mt-4'>My Collection</h4>
      <nav className="menu">
        <Link to="/albums">Albums</Link>
        <Link to="/tracks">Tracks</Link>
        <Link to="/artists">Artists</Link>
        <Link to="/podcasts">Podcasts</Link>
      </nav>
      <div className="user-playlists">
        <h4 className='miniTitle mt-4'>Your Playlists</h4>
        <button className="create-playlist" style={{ borderRadius: '5px', backgroundColor: '#d3d3d3', border: 'none', width: '130px', height: '50px', cursor: 'pointer', marginBottom:'10px' }} onClick={handleModalShow}>
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
