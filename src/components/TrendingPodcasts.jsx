import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/trendingPodcasts.css';

const TrendingPodcasts = ({ playTrack }) => {
  const [podcasts, setPodcasts] = useState([]);
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
    const fetchTrendingPodcasts = async () => {
      if (!token) return;

      try {
        // Richiedi i podcast in tendenza dall'API di Spotify
        const response = await axios.get('https://api.spotify.com/v1/browse/categories/podcasts/playlists', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Estrai i podcast dai risultati
        const podcastsData = [];
        for (let playlist of response.data.playlists.items.slice(0, 3)) {
          const playlistResponse = await axios.get(`https://api.spotify.com/v1/playlists/${playlist.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          podcastsData.push(...playlistResponse.data.tracks.items.map(item => item.track));
        }

        setPodcasts(podcastsData.slice(0, 20)); // Limita a 20 podcast
      } catch (error) {
        console.error('Error fetching podcasts:', error);
        setError('Error fetching podcast data.');
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingPodcasts();
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="trending-podcasts">
      <h2>Trending Podcasts</h2>
      <div className="podcasts-list">
        {podcasts.map((podcast) => (
          <div key={podcast.id} className="podcast-card" onClick={() => playTrack(podcast, podcasts)}>
            <img src={podcast.album.images[0]?.url} alt={podcast.name} className="podcast-image" />
            <div className="podcast-info">
              <p className="podcast-name">{podcast.name}</p>
              <p className="podcast-artist">{podcast.artists.map(artist => artist.name).join(', ')}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingPodcasts;
