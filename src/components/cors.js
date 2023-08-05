const axios = require('axios');

module.exports = async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ error: 'Missing "url" parameter' });
  }

  try {
    const response = await axios.get(url, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });

    return res.json(response.data);
  } catch (error) {
    return res.status(error.response?.status || 500).json({ error: 'Failed to fetch data from the requested URL' });
  }
};
