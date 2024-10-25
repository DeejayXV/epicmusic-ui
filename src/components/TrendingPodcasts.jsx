import React from 'react';
import '../styles/trendingPodcasts.css';
import dailyPodcastImage from '../assets/images/daily-podcast.jpg';
import scienceVsImage from '../assets/images/science-vs-podcast.jpg';
import crimeJunkieImage from '../assets/images/crime-junkie-podcast.jpg';
import stuffYouShouldKnowImage from '../assets/images/stuff-you-should-know.jpg';
import tedTalksImage from '../assets/images/ted-talks.jpg';

const TrendingPodcasts = ({ playTrack }) => {
  // Dati statici dei podcast, impossibile rendere dinamico con Spotify API
  const podcasts = [
    {
      id: '1',
      name: 'The Daily',
      publisher: 'The New York Times',
      description: 'A daily news podcast with the most important stories of the day.',
      image: dailyPodcastImage 
    },
    {
      id: '2',
      name: 'Science Vs',
      publisher: 'Gimlet',
      description: 'A show that pits facts against popular myths and misconceptions.',
      image: scienceVsImage
    },
    {
      id: '3',
      name: 'Crime Junkie',
      publisher: 'Audiochuck',
      description: 'A podcast covering crime stories in a gripping way.',
      image: crimeJunkieImage
    },
    {
      id: '4',
      name: 'Stuff You Should Know',
      publisher: 'iHeartRadio',
      description: 'Learn about a wide variety of topics in a fun and informative way.',
      image: stuffYouShouldKnowImage
    },
    {
      id: '5',
      name: 'TED Talks Daily',
      publisher: 'TED',
      description: 'Bringing you the latest talks from TED events.',
      image: tedTalksImage
    }
  ];
  

  return (
    <div className="trending-podcasts">
      <h2>Trending Podcasts</h2>
      <div className="podcasts-list">
        {podcasts.map((podcast) => (
          <div key={podcast.id} className="podcast-card" onClick={() => playTrack(podcast, podcasts)}>
            <img src={podcast.image} alt={podcast.name} className="podcast-image" />
            <div className="podcast-info">
              <p className="podcast-name">{podcast.name}</p>
              <p className="podcast-publisher">{podcast.publisher}</p>
              <p className="podcast-description">{podcast.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingPodcasts;
