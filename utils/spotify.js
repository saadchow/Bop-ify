import axios from 'axios';

// A helper function that returns a Spotify access token
export async function getSpotifyToken() {
  // Get the Spotify client ID and client secret from environment variables
  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;

  // Encode the credentials in base64 format
  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  // Make a POST request to the Spotify token endpoint with the encoded credentials and grant type
  const response = await axios.post('https://accounts.spotify.com/api/token', 'grant_type=client_credentials', {
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  // Return the access token from the response data
  return response.data.access_token;
}
