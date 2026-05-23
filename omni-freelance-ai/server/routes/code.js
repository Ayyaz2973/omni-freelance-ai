const express = require('express');
const router = express.Router();
const askOllama = require('../services/ollamaService');

router.post('/', async (req, res) => {
  const { task } = req.body;

  const prompt = `
You are an expert developer.

Task:
${task}

Provide complete clean code.
`;

  const result = await askOllama(prompt, 'deepseek-coder');

  res.json({ code: result });
});

module.exports = router;
