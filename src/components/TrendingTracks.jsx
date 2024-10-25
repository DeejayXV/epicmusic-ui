import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/trendingTracks.css';

const TrendingTracks = ({ playTrack }) => {
  const [tracks, setTracks] = useState([]);
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
    const fetchTrendingTracks = async () => {
      if (!token) return;

      try {
        // Richiedi le tracce in tendenza dall'API di Spotify
        const response = await axios.get('https://api.spotify.com/v1/browse/featured-playlists', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Estrai le tracce dalle prime playlist in evidenza
        const tracksData = [];
        for (let playlist of response.data.playlists.items.slice(0, 3)) { // Limita a 3 playlist
          const playlistResponse = await axios.get(`https://api.spotify.com/v1/playlists/${playlist.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          tracksData.push(...playlistResponse.data.tracks.items.map(item => item.track));
        }

        setTracks(tracksData.slice(0, 20)); // Limita a 20 tracce
      } catch (error) {
        console.error('Error fetching tracks:', error);
        setError('Error fetching track data.');
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingTracks();
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="trending-tracks">
      <h2>Trending Tracks</h2>
      <div className="tracks-list">
        {tracks.map((track) => (
          <div key={track.id} className="track-card" onClick={() => playTrack(track, tracks)}>
            <img src={track.album.images[0]?.url} alt={track.name} className="track-image" />
            <div className="track-info">
              <p className="track-name">{track.name}</p>
              <p className="track-artist">{track.artists.map(artist => artist.name).join(', ')}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingTracks;
