import fetch from 'node-fetch';

// Replace these values with your Google API key and Place ID
const API_KEY = process.env.API_KEY; // This pulls the API key from the environment
const PLACE_ID = process.env.PLACE_ID;

export default async (req, res) => {
    // Set CORS headers to allow your domain
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews&key=${API_KEY}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Google API returned status: ${response.status}`);
        }

        const data = await response.json();

        if (!data.result || !data.result.reviews) {
            throw new Error('No reviews found in the API response');
        }

        res.status(200).json(data.result.reviews);
    } catch (error) {
        console.error('Error fetching Google reviews:', error);
        res.status(500).json({ error: 'Failed to fetch reviews', message: error.message });
    }
};
