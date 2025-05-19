import fetch from 'node-fetch';

export default async function handler(req, res) {
  const SPOTIFY_TOKEN = process.env.SPOTIFY_ACCESS_TOKEN; //i will add token

  if (!SPOTIFY_TOKEN) {
    return res.status(500).json({ error: 'Missing Spotify access token' });
  }

  try {
    const response = await fetch('https://api.spotify.com/v1/me/top/artists', {
      headers: {
        Authorization: `Bearer ${SPOTIFY_TOKEN}`,
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch Spotify top artists' });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Server error fetching Spotify top artists' });
  }
}
