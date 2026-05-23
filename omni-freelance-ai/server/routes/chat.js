const express = require('express');
const router = express.Router();
const askOllama = require('../services/ollamaService');

router.post('/', async (req, res) => {
  const { prompt, model } = req.body;

  const result = await askOllama(prompt, model);

  res.json({ reply: result });
});

module.exports = router;
