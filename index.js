import express from 'express';
import fetch from 'node-fetch';
const app = express();

// Replace these values with your Google API key and Place ID
const API_KEY = 'AIzaSyCdi66otUpYck1xhwNi_p1qBuQtlyT-iHw';
const PLACE_ID = 'ChIJ4RLEkhAiZ4gRJBcamCDnfM0';

app.get('/api/reviews', async (req, res) => {
    try {
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews&key=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();

        res.setHeader('Access-Control-Allow-Origin', '*'); // This allows access to any domain
        res.json(data.result.reviews); // Sends only the reviews back to your website
    } catch (error) {
        console.error('Error fetching Google reviews:', error);
        res.status(500).json({ error: 'Failed to fetch reviews' });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app;
