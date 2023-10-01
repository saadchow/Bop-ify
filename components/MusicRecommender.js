import React, { useState, useEffect } from 'react';
import useSpotify from '../hooks/useSpotify';
import useOpenAIAPI from '../hooks/useOpenAIAPI';
import styles from '../styles/MusicRecommender.module.css';

// A custom component that displays music recommendations
export default function MusicRecommender({ input }) {
  // Get the Spotify client and the Vercel AI client from the custom hooks
  const spotify = useSpotify();
  const vercelAI = useVercelAI();

  // Create some state variables for storing the recommendations and the error message
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Define an async function that fetches and sets the recommendations
    async function fetchRecommendations() {
      try {
        // Reset the state variables
        setRecommendations([]);
        setError(null);

        // Check if the input is not empty
        if (input) {
          // Use the Vercel AI client to get the music recommendation model
          const model = await vercelAI.getModel('music-recommendation');

          // Use the model to generate music recommendations based on the input
          const output = await model.predict(input);

          // Check if the output is not empty
          if (output) {
            // Use the Spotify client to search for tracks that match the output
            const response = await spotify.searchTracks(output);

            // Check if the response has tracks
            if (response.tracks && response.tracks.items) {
              // Set the state with the tracks as recommendations
              setRecommendations(response.tracks.items);
            } else {
              // Set the state with an error message
              setError('No tracks found');
            }
          } else {
            // Set the state with an error message
            setError('No output generated');
          }
        }
      } catch (error) {
        // Set the state with an error message
        setError(error.message);
      }
    }

    // Call the async function
    fetchRecommendations();
  }, [input, spotify, vercelAI]); // Run the effect hook whenever the input, spotify, or vercelAI changes

  return (
    <div className={styles.container}>
      {/* If there is an error, display it */}
      {error && <p className={styles.error}>{error}</p>}

      {/* If there are recommendations, map over them and display them */}
      {recommendations.length > 0 && (
        <div className={styles.grid}>
          {recommendations.map(track => (
            <div key={track.id} className={styles.card}>
              <img src={track.album.images[0].url} alt={track.name} />
              <h3>{track.name}</h3>
              <p>{track.artists.map(artist => artist.name).join(', ')}</p>
              <a href={track.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                Play on Spotify
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}