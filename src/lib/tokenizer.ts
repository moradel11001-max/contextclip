import { TokenMetrics } from '../types';

/**
 * Heuristic token estimation for major LLMs
 * - English text averages ~4 chars / token or ~0.75 tokens / word
 * - Code & Markdown syntax averages ~3.2 chars / token
 */
export function estimateTokens(text: string): { gpt4o: number; claude: number; gemini: number } {
  if (!text || text.trim() === '') {
    return { gpt4o: 0, claude: 0, gemini: 0 };
  }

  const charCount = text.length;
  // Estimate tokens based on density
  const baseTokens = Math.ceil(charCount / 3.7);

  return {
    gpt4o: Math.ceil(baseTokens * 0.98),
    claude: Math.ceil(baseTokens * 1.02),
    gemini: Math.ceil(baseTokens * 0.95),
  };
}

/**
 * Calculates input cost per million tokens:
 * - GPT-4o: ~$2.50 / 1M input tokens
 * - Claude 3.5 Sonnet: ~$3.00 / 1M input tokens
 * - Gemini 1.5 Pro: ~$1.25 / 1M input tokens (or $0.075 for Flash)
 */
export function calculateTokenMetrics(rawText: string, cleanedText: string): TokenMetrics {
  const charCount = cleanedText.length;
  const wordCount = cleanedText.trim() === '' ? 0 : cleanedText.trim().split(/\s+/).length;
  const tokens = estimateTokens(cleanedText);

  const rawTokens = estimateTokens(rawText).gpt4o;
  const currentTokens = tokens.gpt4o;
  
  const savingsPercent = rawTokens > 0 && rawTokens > currentTokens
    ? Math.round(((rawTokens - currentTokens) / rawTokens) * 100)
    : 0;

  return {
    charCount,
    wordCount,
    tokens,
    estimatedCost: {
      gpt4o: (tokens.gpt4o / 1_000_000) * 2.50,
      claude: (tokens.claude / 1_000_000) * 3.00,
      gemini: (tokens.gemini / 1_000_000) * 1.25,
    },
    savingsPercent,
  };
}
