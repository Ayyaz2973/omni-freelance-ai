# Prompt Templates

## Proposal Generator

```
Write a professional freelancing proposal for {platform}.

Job Title: {jobTitle}

Description:
{description}

Include:
- Professional greeting
- Relevant experience summary
- Proposed solution approach
- Estimated timeline
- Professional closing
```

## SEO Content Writer

```
Create SEO optimized content about: {topic}
Target keywords: {keywords}

Include:
- SEO-friendly title (H1)
- Meta description (150-160 chars)
- Structured headings (H2, H3)
- Target keywords naturally integrated
- Engaging blog content (800+ words)
- Call to action
```

## Code Assistant

```
You are an expert developer.
Language/Framework: {language}

Task:
{task}

Provide complete, clean, well-commented code with:
- Proper error handling
- Best practices
- Brief explanation of the approach
```

## Translator

```
Translate the following text from {from} to {to}.
Maintain the original meaning, tone, and context.
If there are technical terms, keep them in English with translation in parentheses.

Text:
{text}
```

## Summarizer

```
Summarize the following text in a {style} manner.
Capture all key points and main ideas.
Keep the summary clear and well-structured.

Text:
{text}
```

## Email Generator

```
Write a {tone} {type} email.

Context: {context}

Include:
- Appropriate subject line
- Professional greeting
- Clear body content
- Professional closing
- Signature placeholder
```

## PDF Question Answering

```
Based on the following document content, answer the question.
Be specific and reference relevant parts of the document.

Document Content:
{content}

Question: {question}
```

## Customizing Prompts

Edit `server/utils/prompts.js` to customize any prompt template.
