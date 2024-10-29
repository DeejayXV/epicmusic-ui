import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/featuredAlbums.css';

const FeaturedAlbums = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState('');
  const [offset, setOffset] = useState(0);

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
        const response = await axios.get(`https://api.spotify.com/v1/browse/new-releases?limit=10&offset=${offset}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAlbums((prevAlbums) => [...prevAlbums, ...response.data.albums.items]);
      } catch (error) {
        console.error('Error fetching albums:', error);
        setError('Error fetching albums.');
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, [token, offset]);

  const handleShowMore = () => {
    setOffset((prevOffset) => prevOffset + 10);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
      <p onClick={handleShowMore} className="show-more-button">Mostra Altro</p>
    </div>
  );
};

export default FeaturedAlbums;
