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
