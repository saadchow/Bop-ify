import React, { useState, useEffect } from 'react';
import { getSpotifyToken } from '../utils/spotify';
import SpotifyWebApi from 'spotify-web-api-js'; // Add this line

// A custom hook that returns a Spotify client object
export default function useSpotify() {
  const [spotify, setSpotify] = useState(null);

  useEffect(() => {
    // Get the Spotify access token from the helper function
    getSpotifyToken()
      .then(token => {
        // Create a Spotify client object with the token
        const spotify = new SpotifyWebApi();
        spotify.setAccessToken(token);
        // Set the state with the Spotify client object
        setSpotify(spotify);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return spotify;
}
