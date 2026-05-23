const express = require('express');
const router = express.Router();
const { askOllama } = require('../services/ollamaService');
const { formatResponse, handleError } = require('../utils/helpers');

router.post('/', async (req, res) => {
  try {
    const { prompt, model } = req.body;

    if (!prompt) {
      return res.status(400).json(formatResponse('Prompt is required', 'error'));
    }

    const result = await askOllama(prompt, model);
    res.json(formatResponse({ reply: result }));
  } catch (error) {
    handleError(res, error);
  }
});

module.exports = router;
