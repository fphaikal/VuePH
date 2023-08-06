// api/showroom.js
const axios = require('axios');

module.exports = async (req, res) => {
  try {
    const { sort, page, filter, order, perpage } = req.query;
    const apiUrl = `https://dc.crstlnz.site/api/showroom/recent?sort=${sort}&page=${page}&filter=${filter}&order=${order}&perpage=${perpage}`;
    const response = await axios.get(apiUrl);

    // Set appropriate CORS headers to allow requests from your frontend domain
    res.setHeader('Access-Control-Allow-Origin', 'https://vueph.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error while proxying API request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
