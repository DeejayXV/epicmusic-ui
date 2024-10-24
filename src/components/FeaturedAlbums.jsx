import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/featuredAlbums.css';

const FeaturedAlbums = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState('');

  // Ottieni il token dal backend
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/spotify/token');
        setToken(response.data.access_token);
      } catch (error) {
        console.error('Error getting token:', error);
      }
    };

    fetchToken();
  }, []);

  // Ottieni gli album in evidenza
  useEffect(() => {
    const fetchAlbums = async () => {
      if (!token) return;

      try {
        // Otteniamo alcuni album popolari tramite l'API di Spotify
        const response = await axios.get('https://api.spotify.com/v1/browse/new-releases', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAlbums(response.data.albums.items);
      } catch (error) {
        console.error('Error fetching albums:', error);
        setError('Error fetching albums.');
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, [token]);

  // Mostra un messaggio di caricamento finché i dati non sono disponibili.
  if (loading) {
    return <div>Loading...</div>;
  }

  // Mostra un eventuale messaggio di errore.
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="featured-albums">
      <h2>Featured Albums</h2>
      <div className="albums-grid">
        {albums.map((album) => (
          <div key={album.id} className="album-card">
            <Link to={`/albums/${album.id}`}>
              <img src={album.images[0]?.url} alt={`${album.name} cover`} style={{ width: '130px', height: '130px' }} />
              <p>{album.name}</p>
              <p>Artist: {album.artists[0]?.name}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedAlbums;
