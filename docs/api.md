# API Documentation

## Base URL
```
http://localhost:3000
```

## Endpoints

### System
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/status` | Check server and Ollama status |
| GET | `/api/models` | List available Ollama models |

### AI Chat
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/chat` | Send a chat message |

**Body:**
```json
{
  "prompt": "Your message here",
  "model": "llama3" // optional
}
```

### Proposal Generator
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/proposal` | Generate a freelancing proposal |

**Body:**
```json
{
  "jobTitle": "Full Stack Developer",
  "description": "Job description here...",
  "platform": "Upwork" // optional: Upwork, Fiverr, Freelancer, Cover Letter
}
```

### SEO Content Writer
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/seo` | Generate SEO content |

**Body:**
```json
{
  "topic": "Best AI Tools for Freelancers",
  "keywords": "AI, freelancing, tools" // optional
}
```

### Code Assistant
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/code` | Generate code |

**Body:**
```json
{
  "task": "Create a responsive navbar",
  "language": "React" // optional
}
```

### Translator
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/translate` | Translate text |

**Body:**
```json
{
  "text": "Hello, how are you?",
  "from": "English", // optional
  "to": "Urdu" // optional
}
```

### Summarizer
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/summarize` | Summarize text |

**Body:**
```json
{
  "text": "Long text to summarize...",
  "style": "concise" // optional: concise, detailed
}
```

### PDF Tools
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/pdf/extract` | Extract text from PDF/DOCX |
| POST | `/api/pdf/summarize` | Summarize a document |
| POST | `/api/pdf/ask` | Ask questions about a document |

**Body:** `multipart/form-data`
- `file`: PDF, DOCX, DOC, or TXT file
- `question`: (for `/ask` endpoint only) Your question

### Email Generator
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/email` | Generate an email |

**Body:**
```json
{
  "type": "professional", // optional: professional, cold outreach, complaint
  "context": "Follow up on project proposal",
  "tone": "formal" // optional: formal, friendly, urgent
}
```

### Voice AI
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/voice` | Process voice/text |

**Body:**
```json
{
  "text": "Your spoken or typed text",
  "action": "respond" // optional: respond, summarize, translate
}
```

## Response Format

All endpoints return responses in this format:
```json
{
  "status": "success",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "data": {
    // response data
  }
}
```

## Error Format
```json
{
  "status": "error",
  "message": "Error description",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```
