# Installation Guide

## Prerequisites

- Node.js 18+ installed
- Ollama installed ([Download Ollama](https://ollama.ai))
- 16GB RAM recommended

## Step 1: Clone the Repository

```bash
git clone https://github.com/Ayyaz2973/omni-freelance-ai.git
cd omni-freelance-ai
```

## Step 2: Install Dependencies

```bash
npm install
```

## Step 3: Install Ollama Models

```bash
ollama pull llama3
ollama pull mistral
ollama pull deepseek-coder
```

## Step 4: Configure Environment

Create a `.env` file in the root directory:

```env
PORT=3000
OLLAMA_URL=http://localhost:11434
DEFAULT_MODEL=llama3
CODE_MODEL=deepseek-coder
```

## Step 5: Start Ollama

Make sure Ollama is running:

```bash
ollama run llama3
```

## Step 6: Start the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## Step 7: Open the App

Navigate to `http://localhost:3000` in your browser.

## Recommended Models by Task

| Task | Model | Size |
|------|-------|------|
| General Chat | llama3 | ~4.7GB |
| Coding | deepseek-coder | ~776MB |
| Fast Response | mistral | ~4.4GB |
| Urdu + English | llama3 | ~4.7GB |

## Troubleshooting

### Ollama not running
Make sure Ollama is installed and running. Check with:
```bash
curl http://localhost:11434
```

### Port already in use
Change the PORT in your `.env` file:
```env
PORT=3001
```

### Model not found
Pull the required model:
```bash
ollama pull <model-name>
```
