const express = require('express');
const router = express.Router();
const { askOllama } = require('../services/ollamaService');
const prompts = require('../utils/prompts');
const { formatResponse, handleError } = require('../utils/helpers');

router.post('/', async (req, res) => {
  try {
    const { text, style } = req.body;

    if (!text) {
      return res.status(400).json(formatResponse('Text is required', 'error'));
    }

    const prompt = prompts.summarize({ text, style });
    const result = await askOllama(prompt);
    res.json(formatResponse({ summary: result }));
  } catch (error) {
    handleError(res, error);
  }
});

module.exports = router;
