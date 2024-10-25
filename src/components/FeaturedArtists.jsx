import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/featuredArtists.css';

const FeaturedArtists = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState('');

  useEffect(() => {
    const fetchToken = async () => {
      try {
        // Richiedi il token dal backend Spring Boot
        const response = await axios.get('http://localhost:3001/api/spotify/token');
        setToken(response.data.access_token);
      } catch (error) {
        console.error('Error getting token:', error);
        setError('Error fetching token.');
      }
    };

    fetchToken();
  }, []);

  useEffect(() => {
    const fetchArtists = async () => {
      if (!token) return;

      try {
        // Richiedi artisti popolari dall'API di Spotify
        const response = await axios.get('https://api.spotify.com/v1/browse/featured-playlists', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Estrai gli artisti dai risultati delle playlist
        const artistsData = response.data.playlists.items.map(item => ({
          id: item.id,
          name: item.name,
          image: item.images[0]?.url,
        }));

        setArtists(artistsData);
      } catch (error) {
        console.error('Error fetching artists:', error);
        setError('Error fetching artist data.');
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="featured-artists">
      <h2>Featured Artists</h2>
      <div className="artists-grid">
        {artists.map((artist) => (
          <div key={artist.id} className="artist-card">
            <Link to={`/artists/${artist.id}`}>
              <img src={artist.image} alt={artist.name} />
              <p>{artist.name}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedArtists;
