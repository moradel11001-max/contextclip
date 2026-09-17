export interface ExtractedDocument {
  id: string;
  title: string;
  url?: string;
  sourceType: 'url' | 'html' | 'text' | 'file';
  rawLength: number;
  cleanedMarkdown: string;
  cleanedLength: number;
  estimatedTokens: number;
  savedPercentage: number;
  timestamp: number;
}

export type LLMTarget = 'claude' | 'gemini' | 'openai' | 'raw_markdown';

export type PromptPreset = 
  | 'none'
  | 'code_review'
  | 'summarize'
  | 'architecture_analysis'
  | 'bug_investigation'
  | 'faq_generator';

export interface TokenMetrics {
  charCount: number;
  wordCount: number;
  tokens: {
    gpt4o: number;
    claude: number;
    gemini: number;
  };
  estimatedCost: {
    gpt4o: number;
    claude: number;
    gemini: number;
  };
  savingsPercent: number;
}

export interface LicenseState {
  isPro: boolean;
  licenseKey: string | null;
  activatedAt: string | null;
}
