import fetch from 'node-fetch';

export default async function handler(req, res) {
  const LASTFM_API_KEY = process.env.LASTFM_API_KEY;
  const username = req.query.username;
  if (!LASTFM_API_KEY) {
    return res.status(500).json({ error: 'Missing Last.fm API key' });
  }

  if (!username) {
    return res.status(400).json({ error: 'Missing Last.fm username in query' });
  }

  try {
    const url = `http://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=${username}&api_key=${LASTFM_API_KEY}&format=json`;

    const response = await fetch(url);

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch Last.fm user info' });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Server error fetching Last.fm user info' });
  }
}
