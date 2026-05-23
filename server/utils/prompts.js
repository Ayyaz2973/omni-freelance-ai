const prompts = {
  proposal: ({ jobTitle, description, platform }) => `
Write a professional freelancing proposal for ${platform || 'Upwork'}.

Job Title: ${jobTitle}

Description:
${description}

Include:
- Professional greeting
- Relevant experience summary
- Proposed solution approach
- Estimated timeline
- Professional closing
`,

  seo: ({ topic, keywords }) => `
Create SEO optimized content about: ${topic}
${keywords ? `Target keywords: ${keywords}` : ''}

Include:
- SEO-friendly title (H1)
- Meta description (150-160 chars)
- Structured headings (H2, H3)
- Target keywords naturally integrated
- Engaging blog content (800+ words)
- Call to action
`,

  code: ({ task, language }) => `
You are an expert developer.
${language ? `Language/Framework: ${language}` : ''}

Task:
${task}

Provide complete, clean, well-commented code with:
- Proper error handling
- Best practices
- Brief explanation of the approach
`,

  vibeCoder: ({ description, projectType, features }) => `
You are an expert full-stack developer and app builder. Your job is to generate a COMPLETE, fully working project from a single prompt.

Project Type: ${projectType || 'website'}
Description: ${description}
${features && features.length > 0 ? `Required Features: ${features.join(', ')}` : ''}

IMPORTANT RULES:
1. Generate ALL files needed for a complete, working project
2. Each file must be marked with ---FILE: filename--- at the start and ---END--- at the end
3. Include ALL HTML, CSS, and JavaScript in separate files
4. The main HTML file MUST be named "index.html"
5. CSS should be in "style.css"
6. JavaScript should be in "script.js" or "app.js"
7. Make the project visually appealing with modern UI design
8. Include responsive design (mobile-friendly)
9. Add smooth animations and transitions
10. Use professional color schemes
11. All functionality must work without any server - pure client-side
12. For games: use HTML5 Canvas or DOM manipulation
13. Include proper error handling
14. Add comments explaining key sections

${projectType === 'game' ? `
GAME-SPECIFIC REQUIREMENTS:
- Use HTML5 Canvas for rendering
- Include game loop with requestAnimationFrame
- Add score tracking and display
- Include start/restart functionality
- Add keyboard/touch controls
- Make it playable immediately
` : ''}

${projectType === 'android-app' ? `
ANDROID/MOBILE APP REQUIREMENTS:
- Generate as a Progressive Web App (PWA) that works on mobile
- Include manifest.json for installability
- Add service-worker.js for offline support
- Use mobile-first responsive design
- Include touch-friendly UI elements
- Add viewport meta tag for proper mobile scaling
` : ''}

${projectType === 'web-tool' ? `
WEB TOOL REQUIREMENTS:
- Include clear input/output sections
- Add form validation
- Include loading states
- Add copy-to-clipboard functionality where relevant
- Make it immediately usable
` : ''}

OUTPUT FORMAT - You MUST use this exact format for EACH file:

---FILE: index.html---
(complete HTML content here)
---END---

---FILE: style.css---
(complete CSS content here)
---END---

---FILE: script.js---
(complete JavaScript content here)
---END---

Generate the complete project now. Every file must be production-ready and fully functional.
`,

  translate: ({ text, from, to }) => `
Translate the following text from ${from || 'English'} to ${to || 'Urdu'}.
Maintain the original meaning, tone, and context.
If there are technical terms, keep them in English with translation in parentheses.

Text:
${text}
`,

  summarize: ({ text, style }) => `
Summarize the following text in a ${style || 'concise'} manner.
Capture all key points and main ideas.
Keep the summary clear and well-structured.

Text:
${text}
`,

  email: ({ type, context, tone }) => `
Write a ${tone || 'professional'} ${type || 'business'} email.

Context: ${context}

Include:
- Appropriate subject line
- Professional greeting
- Clear body content
- Professional closing
- Signature placeholder
`,

  pdfQuestion: ({ question, content }) => `
Based on the following document content, answer the question.
Be specific and reference relevant parts of the document.

Document Content:
${content}

Question: ${question}
`,
};

module.exports = prompts;
