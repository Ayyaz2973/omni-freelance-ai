const express = require('express');
const router = express.Router();
const { processVoiceText } = require('../services/voiceService');
const { formatResponse, handleError } = require('../utils/helpers');

router.post('/', async (req, res) => {
  try {
    const { text, action } = req.body;

    if (!text) {
      return res.status(400).json(formatResponse('Text is required', 'error'));
    }

    const result = await processVoiceText(text, action);
    res.json(formatResponse({ response: result }));
  } catch (error) {
    handleError(res, error);
  }
});

module.exports = router;
