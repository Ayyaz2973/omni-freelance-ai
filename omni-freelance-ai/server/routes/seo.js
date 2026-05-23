const express = require('express');
const router = express.Router();
const askOllama = require('../services/ollamaService');

router.post('/', async (req, res) => {
  const { topic } = req.body;

  const prompt = `
Create SEO optimized content about:
${topic}

Include:
- SEO title
- Meta description
- Headings
- Keywords
- Blog content
`;

  const result = await askOllama(prompt);

  res.json({ seo: result });
});

module.exports = router;
