import { ExtractedDocument, LLMTarget, PromptPreset } from '../types';

export const PROMPT_PRESETS: Record<PromptPreset, { label: string; systemInstruction: string }> = {
  none: {
    label: 'Standard Context Only',
    systemInstruction: '',
  },
  code_review: {
    label: 'Code Review & Security Audit',
    systemInstruction: 'Analyze the following code/documentation. Identify potential bugs, security vulnerabilities, performance bottlenecks, and propose idiomatic refactorings with clean code examples.',
  },
  summarize: {
    label: 'Executive Summary & Key Takeaways',
    systemInstruction: 'Provide a high-level executive summary of this material. Break down core takeaways into bullet points and explain the practical implications.',
  },
  architecture_analysis: {
    label: 'Technical Architecture & Deep Dive',
    systemInstruction: 'Examine the system architecture, design patterns, dependencies, and data flow described in the provided context. Critique trade-offs and suggest improvements.',
  },
  bug_investigation: {
    label: 'Root Cause & Bug Investigation',
    systemInstruction: 'Based on the attached logs, error traces, and documentation, identify the most probable root cause and outline a step-by-step fix.',
  },
  faq_generator: {
    label: 'Q&A / FAQ Generator',
    systemInstruction: 'Extract the top 8 most important questions a developer or user would have from this content, followed by concise, accurate answers.',
  },
};

/**
 * Formats one or multiple documents into model-optimized context
 */
export function formatPromptContext(
  documents: ExtractedDocument[],
  target: LLMTarget,
  preset: PromptPreset,
  customInstructions?: string
): string {
  const instruction = customInstructions?.trim() 
    ? customInstructions.trim() 
    : PROMPT_PRESETS[preset].systemInstruction;

  if (documents.length === 0) {
    return instruction ? `${instruction}\n\n[No documents attached]` : '';
  }

  // 1. Claude Style: XML document wrapper with metadata attributes
  if (target === 'claude') {
    let result = '';
    if (instruction) {
      result += `<instruction>\n${instruction}\n</instruction>\n\n`;
    }

    result += `<documents>\n`;
    documents.forEach((doc, idx) => {
      result += `  <document index="${idx + 1}">\n`;
      result += `    <source>${doc.url || doc.title}</source>\n`;
      result += `    <title>${doc.title}</title>\n`;
      result += `    <content>\n${doc.cleanedMarkdown}\n    </content>\n`;
      result += `  </document>\n`;
    });
    result += `</documents>\n\n`;

    if (instruction) {
      result += `Please process the attached documents according to the instruction above.`;
    }
    return result.trim();
  }

  // 2. Gemini Style: Structured Markdown sections with clear separators
  if (target === 'gemini') {
    let result = '';
    if (instruction) {
      result += `### Task / Instructions\n${instruction}\n\n---\n\n`;
    }

    result += `### Reference Context\n\n`;
    documents.forEach((doc, idx) => {
      result += `#### Source ${idx + 1}: ${doc.title}\n`;
      if (doc.url) result += `*URL: ${doc.url}*\n\n`;
      result += `${doc.cleanedMarkdown}\n\n`;
      if (idx < documents.length - 1) result += `---\n\n`;
    });

    return result.trim();
  }

  // 3. OpenAI / ChatGPT Style: Clear system framing with Markdown blocks
  if (target === 'openai') {
    let result = '';
    if (instruction) {
      result += `## User Request\n${instruction}\n\n`;
    }

    result += `## Context Data\n`;
    documents.forEach((doc, idx) => {
      result += `### [${idx + 1}] ${doc.title}\n`;
      if (doc.url) result += `Source: ${doc.url}\n`;
      result += `\`\`\`markdown\n${doc.cleanedMarkdown}\n\`\`\`\n\n`;
    });

    return result.trim();
  }

  // 4. Raw Cleaned Markdown (Direct)
  return documents.map(d => `# ${d.title}\n\n${d.cleanedMarkdown}`).join('\n\n---\n\n');
}
