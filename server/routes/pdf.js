const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { extractText, cleanupFile } = require('../services/pdfService');
const { askOllama } = require('../services/ollamaService');
const prompts = require('../utils/prompts');
const { formatResponse, handleError, truncateText } = require('../utils/helpers');

router.post('/extract', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json(formatResponse('File is required', 'error'));
    }

    const result = await extractText(req.file.path);
    cleanupFile(req.file.path);

    res.json(formatResponse({
      text: result.text,
      pages: result.pages,
    }));
  } catch (error) {
    if (req.file) cleanupFile(req.file.path);
    handleError(res, error);
  }
});

router.post('/summarize', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json(formatResponse('File is required', 'error'));
    }

    const result = await extractText(req.file.path);
    cleanupFile(req.file.path);

    const truncated = truncateText(result.text);
    const prompt = prompts.summarize({ text: truncated, style: 'detailed' });
    const summary = await askOllama(prompt);

    res.json(formatResponse({ summary, pages: result.pages }));
  } catch (error) {
    if (req.file) cleanupFile(req.file.path);
    handleError(res, error);
  }
});

router.post('/ask', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json(formatResponse('File is required', 'error'));
    }

    const { question } = req.body;
    if (!question) {
      cleanupFile(req.file.path);
      return res.status(400).json(formatResponse('Question is required', 'error'));
    }

    const result = await extractText(req.file.path);
    cleanupFile(req.file.path);

    const truncated = truncateText(result.text);
    const prompt = prompts.pdfQuestion({ question, content: truncated });
    const answer = await askOllama(prompt);

    res.json(formatResponse({ answer }));
  } catch (error) {
    if (req.file) cleanupFile(req.file.path);
    handleError(res, error);
  }
});

module.exports = router;
