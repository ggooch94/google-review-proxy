import express from 'express';
import fetch from 'node-fetch';

const app = express();

const API_KEY = process.env.API_KEY;
const PLACE_ID = process.env.PLACE_ID;

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://www.creamcitycookeville.com'); // Allow your specific domain
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/api/reviews', async (req, res) => {
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

        res.json(data.result.reviews);
    } catch (error) {
        console.error('Error fetching Google reviews:', error);
        res.status(500).json({ error: 'Failed to fetch reviews', message: error.message });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app;
