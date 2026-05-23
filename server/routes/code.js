const express = require('express');
const router = express.Router();
const { generateCode } = require('../services/codeService');
const { formatResponse, handleError } = require('../utils/helpers');

router.post('/', async (req, res) => {
  try {
    const { task, language } = req.body;

    if (!task) {
      return res.status(400).json(formatResponse('Task is required', 'error'));
    }

    const result = await generateCode(task, language);
    res.json(formatResponse({ code: result }));
  } catch (error) {
    handleError(res, error);
  }
});

module.exports = router;
