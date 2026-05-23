const express = require('express');
const router = express.Router();
const { generateProposal } = require('../services/proposalService');
const { formatResponse, handleError } = require('../utils/helpers');

router.post('/', async (req, res) => {
  try {
    const { jobTitle, description, platform } = req.body;

    if (!jobTitle || !description) {
      return res.status(400).json(formatResponse('Job title and description are required', 'error'));
    }

    const result = await generateProposal(jobTitle, description, platform);
    res.json(formatResponse({ proposal: result }));
  } catch (error) {
    handleError(res, error);
  }
});

module.exports = router;
