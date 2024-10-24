import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AlbumPage = () => {
  const { albumId } = useParams(); // L'ID dell'album viene preso dai parametri URL.
  const [album, setAlbum] = useState(null); // Stato per i dettagli dell'album.
  const [loading, setLoading] = useState(true); // Stato per il caricamento.
  const [error, setError] = useState(null); // Stato per eventuali errori.
  const [token, setToken] = useState(''); // Stato per il token di accesso Spotify.

  // Effettua una richiesta per ottenere il token di accesso dal backend.
  useEffect(() => {
    const fetchToken = async () => {
      try {
        // Richiede il token dal backend Spring Boot in esecuzione su localhost:3001
        const response = await axios.get('http://localhost:3001/api/spotify/token');
        setToken(response.data.access_token); // Salva il token di accesso.
      } catch (error) {
        console.error('Error getting token:', error);
      }
    };

    fetchToken();
  }, []);

  // Effettua una richiesta per ottenere i dettagli dell'album quando il token è stato ottenuto.
  useEffect(() => {
    const fetchAlbum = async () => {
      if (!token) return; // Assicurati che il token sia disponibile prima di procedere.

      try {
        // Richiedi i dettagli dell'album dall'API di Spotify.
        const response = await axios.get(`https://api.spotify.com/v1/albums/${albumId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Includi il token di accesso nella richiesta.
          },
        });
        setAlbum(response.data); // Salva i dati dell'album nello stato.
      } catch (error) {
        console.error('Error fetching album:', error);
        setError('Error fetching album data.'); // Salva un eventuale errore.
      } finally {
        setLoading(false); // Imposta il caricamento su falso.
      }
    };

    fetchAlbum();
  }, [token, albumId]); // Questa richiesta viene rieseguita quando il token o l'album ID cambia.

  // Mostra un messaggio di caricamento finché i dati non sono disponibili.
  if (loading) {
    return <div>Loading...</div>;
  }

  // Mostra un eventuale messaggio di errore.
  if (error) {
    return <div>{error}</div>;
  }

  // Se non ci sono dati dell'album, mostra un messaggio.
  if (!album) {
    return <div>No album found</div>;
  }

  // Ritorna il componente con i dettagli dell'album.
  return (
    <div className="album-details">
      <h2>{album.name}</h2>
      <p>Artist: {album.artists[0].name}</p>
      <img src={album.images[0].url} alt={`${album.name} cover`} style={{ width: '300px', height: '300px' }} />
      <ul>
        {album.tracks.items.map((track) => (
          <li key={track.id}>
            {track.name} - {Math.floor(track.duration_ms / 60000)}:{(Math.floor((track.duration_ms % 60000) / 1000)).toString().padStart(2, '0')}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlbumPage;
