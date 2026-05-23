const express = require('express');
const router = express.Router();
const multer = require('multer');
const pdfParse = require('pdf-parse');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

// 1. Configure Multer to temporarily cache files inside a local 'uploads' directory
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, '../uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// Guard: Filter file types to only accept PDFs and standard TXT logs
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf' || file.mimetype === 'text/plain') {
        cb(null, true);
    } else {
        cb(new Error('Unsupported file type. Please upload a PDF or TXT file.'), false);
    }
};

const upload = multer({ storage, fileFilter });

// 2. The File Analysis Route: POST /api/pdf/analyze
router.post('/analyze', upload.single('document'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded or file format invalid.' });
        }

        const filePath = req.file.path;
        const userPrompt = req.body.prompt || "Analyze this document and summarize key operational points.";
        let extractedText = "";

        // 3. Process data according to mime type
        if (req.file.mimetype === 'application/pdf') {
            const dataBuffer = fs.readFileSync(filePath);
            const parsedPdf = await pdfParse(dataBuffer);
            extractedText = parsedPdf.text;
        } else if (req.file.mimetype === 'text/plain') {
            extractedText = fs.readFileSync(filePath, 'utf-8');
        }

        // Clean Up: Safely remove the temp storage file immediately after processing data
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        if (!extractedText.trim()) {
            return res.status(400).json({ error: 'Could not extract any readable plain text from this document.' });
        }

        // 4. Connect directly to your local Ollama backbone service
        const ollamaPayload = {
            model: req.body.model || "llama3", // Dynamic model fallback to main panel setup
            prompt: `Context Document Content:\n\"\"\"\n${extractedText}\n\"\"\"\n\nUser Instruction: ${userPrompt}`,
            stream: false
        };

        const ollamaResponse = await axios.post('http://127.0.0.1:11434/api/generate', ollamaPayload);

        res.json({
            success: true,
            analysis: ollamaResponse.data.response
        });

    } catch (error) {
        console.error("Error within PDF processing route:", error.message);
        res.status(500).json({ error: "Failed to read or analyze document contents locally." });
    }
});

module.exports = router;

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
