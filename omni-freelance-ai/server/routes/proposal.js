const express = require('express');
const router = express.Router();
const askOllama = require('../services/ollamaService');

router.post('/', async (req, res) => {
  const { jobTitle, description } = req.body;

  const prompt = `
Write a professional freelancing proposal.

Job Title: ${jobTitle}

Description:
${description}

Include:
- Greeting
- Experience
- Solution
- Timeline
- Closing
`;

  const result = await askOllama(prompt);

  res.json({ proposal: result });
});

module.exports = router;
