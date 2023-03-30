const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();

const app = express();
app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/aggs/:symbol/:from/:to', async (req, res) => {
  const { symbol, from, to } = req.params;
  const apiKey = process.env.API_KEY;
  const apiUrl = `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/minute/${from}/${to}?apiKey=${apiKey}`;

  try {
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from Polygon API:', error.response.data);
    res.status(500).json({ message: 'Error fetching data from Polygon API' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
