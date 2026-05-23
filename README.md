# OmniFreelance AI

A full localhost AI freelancing assistant powered by Ollama, Node.js, and Express.

## Features

- **AI Chat** - Multi-model support, chat memory, English + Urdu, markdown, copy response
- **Proposal Generator** - Fiverr, Upwork, cover letters, client replies, templates
- **SEO Content Writer** - Blog generation, meta descriptions, titles, keywords, headings
- **Code Assistant** - HTML, CSS, JS, React, Next.js, bug fixing, API generation
- **Translator** - English, Urdu, Arabic, Roman Urdu
- **PDF Tools** - Summary, text extraction, question answering
- **Email Generator** - Professional, cold outreach, client response, complaint emails
- **Voice AI** - Speech-to-text, text-to-speech, voice assistant

## Quick Start

```bash
# Install dependencies
npm install

# Install Ollama models
ollama pull llama3
ollama pull mistral
ollama pull deepseek-coder

# Start development server
npm run dev
```

Open `http://localhost:3000` in your browser.

## Project Structure

```
omni-freelance-ai/
├── package.json
├── .env
├── README.md
├── server/
│   ├── server.js
│   ├── config/
│   │   └── ollama.js
│   ├── routes/
│   │   ├── chat.js
│   │   ├── proposal.js
│   │   ├── seo.js
│   │   ├── code.js
│   │   ├── translate.js
│   │   ├── summarize.js
│   │   ├── pdf.js
│   │   ├── email.js
│   │   └── voice.js
│   ├── services/
│   │   ├── ollamaService.js
│   │   ├── pdfService.js
│   │   ├── seoService.js
│   │   ├── proposalService.js
│   │   ├── emailService.js
│   │   ├── voiceService.js
│   │   └── codeService.js
│   ├── middleware/
│   │   ├── upload.js
│   │   └── logger.js
│   ├── uploads/
│   └── utils/
│       ├── prompts.js
│       └── helpers.js
├── public/
│   ├── index.html
│   ├── dashboard.html
│   ├── style.css
│   ├── app.js
│   ├── components/
│   │   ├── navbar.js
│   │   ├── sidebar.js
│   │   └── cards.js
│   └── pages/
│       ├── chat.html
│       ├── proposal.html
│       ├── seo.html
│       ├── code.html
│       ├── pdf.html
│       └── voice.html
└── docs/
    ├── api.md
    ├── installation.md
    └── prompts.md
```

## Recommended Models

| Task | Model |
|------|-------|
| General Chat | llama3 |
| Coding | deepseek-coder |
| Fast Response | mistral |
| Urdu + English | llama3 |

## Documentation

- [Installation Guide](docs/installation.md)
- [API Documentation](docs/api.md)
- [Prompt Templates](docs/prompts.md)

## License

MIT
