const express = require('express');
const router = express.Router();
const { generateEmail } = require('../services/emailService');
const { formatResponse, handleError } = require('../utils/helpers');

router.post('/', async (req, res) => {
  try {
    const { type, context, tone } = req.body;

    if (!context) {
      return res.status(400).json(formatResponse('Email context is required', 'error'));
    }

    const result = await generateEmail(type, context, tone);
    res.json(formatResponse({ email: result }));
  } catch (error) {
    handleError(res, error);
  }
});

module.exports = router;
