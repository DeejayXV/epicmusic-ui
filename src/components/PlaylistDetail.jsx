import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import '../styles/PlaylistDetail.css';

const PlaylistDetail = () => {
  const { playlistId } = useParams();
  const navigate = useNavigate();
  const [playlist, setPlaylist] = useState(null);

  // Recupera i dettagli della playlist quando il componente viene caricato
  useEffect(() => {
    const fetchPlaylistDetails = async () => {
      try {
        const response = await axiosInstance.get(`/playlists/${playlistId}`);
        setPlaylist(response.data);
      } catch (error) {
        console.error('Errore durante il recupero dei dettagli della playlist', error);
      }
    };

    fetchPlaylistDetails();
  }, [playlistId]);

  // Funzione per eliminare la playlist
  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/playlists/${playlistId}`);
      alert('Playlist eliminata con successo');
      navigate('/'); // Reindirizza alla pagina principale dopo l'eliminazione
    } catch (error) {
      console.error('Errore durante l\'eliminazione della playlist', error);
    }
  };

  // Funzione per modificare la playlist
  const handleEdit = () => {
    
    alert('Funzionalità di modifica in sviluppo...');
  };

  if (!playlist) {
    return <div>Caricamento...</div>;
  }

  return (
    <div className="playlist-detail">
      <h2>{playlist.name}</h2>
      <p>{playlist.description}</p>
      <DropdownButton id="dropdown-basic-button" title="Azioni">
        <Dropdown.Item onClick={handleEdit}>Modifica Playlist</Dropdown.Item>
        <Dropdown.Item onClick={handleDelete}>Elimina Playlist</Dropdown.Item>
      </DropdownButton>
      <div className="playlist-tracks">
        <h4>Tracks</h4>
        {playlist.tracks && playlist.tracks.length > 0 ? (
          <ul>
            {playlist.tracks.map((track) => (
              <li key={track.id}>{track.title} - {track.artist}</li>
            ))}
          </ul>
        ) : (
          <p>Non ci sono tracce in questa playlist.</p>
        )}
      </div>
    </div>
  );
};

export default PlaylistDetail;
