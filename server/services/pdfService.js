const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

async function extractFromPDF(filePath) {
  const buffer = fs.readFileSync(filePath);
  const data = await pdfParse(buffer);
  return {
    text: data.text,
    pages: data.numpages,
    info: data.info,
  };
}

async function extractFromDocx(filePath) {
  const result = await mammoth.extractRawText({ path: filePath });
  return {
    text: result.value,
    messages: result.messages,
  };
}

async function extractText(filePath) {
  const ext = path.extname(filePath).toLowerCase();

  switch (ext) {
    case '.pdf':
      return extractFromPDF(filePath);
    case '.docx':
    case '.doc':
      return extractFromDocx(filePath);
    case '.txt':
      return {
        text: fs.readFileSync(filePath, 'utf-8'),
        pages: 1,
      };
    default:
      throw new Error(`Unsupported file type: ${ext}`);
  }
}

function cleanupFile(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (error) {
    console.error('Cleanup error:', error.message);
  }
}

module.exports = { extractFromPDF, extractFromDocx, extractText, cleanupFile };
