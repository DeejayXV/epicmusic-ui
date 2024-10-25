import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/artistPage.css';

const ArtistPage = ({ playTrack }) => {
  const { artistId } = useParams();
  const [artist, setArtist] = useState(null);
  const [topTracks, setTopTracks] = useState([]);
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
    const fetchArtist = async () => {
      if (!token) return;

      try {
        // Richiedi i dettagli dell'artista dall'API di Spotify
        const artistResponse = await axios.get(`https://api.spotify.com/v1/artists/${artistId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setArtist(artistResponse.data);

        // Richiedi le tracce più popolari dell'artista
        const topTracksResponse = await axios.get(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTopTracks(topTracksResponse.data.tracks);
      } catch (error) {
        console.error('Error fetching artist details:', error);
        setError('Error fetching artist details.');
      } finally {
        setLoading(false);
      }
    };

    fetchArtist();
  }, [token, artistId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!artist) {
    return <div>No artist found</div>;
  }

  const handleTrackClick = (track) => {
    const trackData = {
      id: track.id,
      name: track.name,
      artists: track.artists,
      album: track.album,
      uri: track.uri,
    };
    playTrack(trackData, topTracks);
  };

  return (
    <div className="artist-page">
      <h2>{artist.name}</h2>
      {artist.images && artist.images.length > 0 && (
        <img src={artist.images[0].url} alt={`${artist.name} cover`} style={{ width: '300px', height: '300px' }} />
      )}
      <h3>Top Tracks</h3>
      <ul>
        {topTracks.map((track) => (
          <li key={track.id} onClick={() => handleTrackClick(track)}>
            {track.name} - {Math.floor(track.duration_ms / 60000)}:{(Math.floor((track.duration_ms % 60000) / 1000)).toString().padStart(2, '0')}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArtistPage;
