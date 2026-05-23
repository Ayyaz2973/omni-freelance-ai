const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const logger = require('./middleware/logger');
const { checkOllamaStatus, listModels } = require('./services/ollamaService');

const chatRoute = require('./routes/chat');
const proposalRoute = require('./routes/proposal');
const seoRoute = require('./routes/seo');
const codeRoute = require('./routes/code');
const translateRoute = require('./routes/translate');
const summarizeRoute = require('./routes/summarize');
const pdfRoute = require('./routes/pdf');
const emailRoute = require('./routes/email');
const voiceRoute = require('./routes/voice');

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/chat', chatRoute);
app.use('/api/proposal', proposalRoute);
app.use('/api/seo', seoRoute);
app.use('/api/code', codeRoute);
app.use('/api/translate', translateRoute);
app.use('/api/summarize', summarizeRoute);
app.use('/api/pdf', pdfRoute);
app.use('/api/email', emailRoute);
app.use('/api/voice', voiceRoute);

app.get('/api/status', async (req, res) => {
  const ollamaStatus = await checkOllamaStatus();
  const models = await listModels();
  res.json({
    server: 'running',
    ollama: ollamaStatus,
    models: models.map((m) => m.name),
  });
});

app.get('/api/models', async (req, res) => {
  const models = await listModels();
  res.json({ models });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Available API endpoints:');
  console.log('  POST /api/chat       - AI Chat');
  console.log('  POST /api/proposal   - Proposal Generator');
  console.log('  POST /api/seo        - SEO Content Writer');
  console.log('  POST /api/code       - Code Assistant');
  console.log('  POST /api/translate  - Translator');
  console.log('  POST /api/summarize  - Text Summarizer');
  console.log('  POST /api/pdf/*      - PDF Tools');
  console.log('  POST /api/email      - Email Generator');
  console.log('  POST /api/voice      - Voice AI');
  console.log('  GET  /api/status     - System Status');
  console.log('  GET  /api/models     - Available Models');
});
