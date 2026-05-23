const express = require('express');
const router = express.Router();
const { generateSEOContent } = require('../services/seoService');
const { formatResponse, handleError } = require('../utils/helpers');

router.post('/', async (req, res) => {
  try {
    const { topic, keywords } = req.body;

    if (!topic) {
      return res.status(400).json(formatResponse('Topic is required', 'error'));
    }

    const result = await generateSEOContent(topic, keywords);
    res.json(formatResponse({ seo: result }));
  } catch (error) {
    handleError(res, error);
  }
});

module.exports = router;
