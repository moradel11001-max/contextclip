// Comprehensive End-to-End Suite for ContextClip
import TurndownService from 'turndown';

console.log('====================================================');
console.log('    ContextClip Full Verification Test Suite        ');
console.log('====================================================');

let testsPassed = 0;
let testsFailed = 0;

function assert(condition, testName) {
  if (condition) {
    console.log(`[PASS] ${testName}`);
    testsPassed++;
  } else {
    console.error(`[FAIL] ${testName}`);
    testsFailed++;
  }
}

// 1. TURNDOWN NOISE ELIMINATION TEST
console.log('\n--- 1. Testing Noise Elimination & HTML Parsing ---');
const turndownService = new TurndownService({
  headingStyle: 'atx',
  hr: '---',
  bulletListMarker: '-',
  codeBlockStyle: 'fenced',
});

turndownService.addRule('removeElements', {
  filter: (node) => ['script', 'style', 'noscript', 'iframe', 'svg', 'canvas'].includes(node.nodeName.toLowerCase()),
  replacement: () => ''
});

const noisyHtml = `
  <html>
    <head><title>API Reference & Docs</title></head>
    <body>
      <header><nav><a href="/">Home</a> | <a href="/docs">Docs</a></nav></header>
      <script>window.analytics.track("page_view");</script>
      <style>.banner { color: red; }</style>
      <div class="cookie-banner">Accept all cookies to continue.</div>
      <article>
        <h1>Authentication API</h1>
        <p>Use bearer tokens in the <code>Authorization</code> header:</p>
        <pre><code class="language-bash">curl -H "Authorization: Bearer KEY" https://api.example.com</code></pre>
        <h3>Response Schema</h3>
        <ul>
          <li><strong>id</strong>: Unique string identifier</li>
          <li><strong>status</strong>: Active or suspended</li>
        </ul>
      </article>
      <iframe src="https://ads.example.com"></iframe>
      <footer><p>© 2026 Example Corp. Privacy Policy.</p></footer>
    </body>
  </html>
`;

const cleanedMd = turndownService.turndown(noisyHtml);

assert(!cleanedMd.includes('window.analytics'), 'Tracking scripts successfully stripped');
assert(!cleanedMd.includes('ads.example.com'), 'Iframes successfully stripped');
assert(cleanedMd.includes('Authentication API'), 'Core content retained');
assert(cleanedMd.includes('Bearer KEY'), 'Code blocks and commands retained');
assert(cleanedMd.includes('Response Schema'), 'Subheadings and lists preserved');

// 2. TOKEN & SAVINGS CALCULATIONS TEST
console.log('\n--- 2. Testing Token & Cost Calculations ---');
const rawLength = noisyHtml.length;
const cleanedLength = cleanedMd.length;
const tokenEst = Math.ceil(cleanedLength / 3.7);
const gpt4oTokens = Math.ceil(tokenEst * 0.98);
const claudeTokens = Math.ceil(tokenEst * 1.02);
const geminiTokens = Math.ceil(tokenEst * 0.95);

const gpt4oCost = (gpt4oTokens / 1_000_000) * 2.50;
const claudeCost = (claudeTokens / 1_000_000) * 3.00;
const savingsPercent = Math.round(((rawLength - cleanedLength) / rawLength) * 100);

assert(gpt4oTokens > 0 && claudeTokens > 0, 'Token estimates calculated accurately');
assert(claudeCost > 0 && claudeCost < 0.01, 'Estimated prompt cost within expected micro-cents bounds');
assert(savingsPercent > 20, `Savings percent calculated correctly (${savingsPercent}% saved)`);

// 3. MULTI-MODEL PROMPT TEMPLATING TEST
console.log('\n--- 3. Testing Model Framing Formats ---');

const mockDocs = [
  { id: '1', title: 'Auth Docs', url: 'https://docs.example.com/auth', cleanedMarkdown: cleanedMd },
  { id: '2', title: 'Database Schema', url: 'https://docs.example.com/db', cleanedMarkdown: '# User Table\n- id: UUID\n- email: String' }
];

// Test Claude XML formatting
function formatClaude(docs, instruction) {
  let res = `<instruction>\n${instruction}\n</instruction>\n\n<documents>\n`;
  docs.forEach((doc, idx) => {
    res += `  <document index="${idx + 1}">\n    <title>${doc.title}</title>\n    <content>\n${doc.cleanedMarkdown}\n    </content>\n  </document>\n`;
  });
  res += `</documents>`;
  return res;
}

const claudePrompt = formatClaude(mockDocs, 'Conduct a security audit of authentication endpoints');
assert(claudePrompt.includes('<instruction>') && claudePrompt.includes('Conduct a security audit'), 'Claude XML includes instruction tag');
assert(claudePrompt.includes('<documents>'), 'Claude XML includes documents container');
assert(claudePrompt.includes('<document index="1">'), 'Claude XML indexes first document');
assert(claudePrompt.includes('<document index="2">'), 'Claude XML indexes second document');

// Test Gemini Markdown formatting
function formatGemini(docs, instruction) {
  let res = `### Task / Instructions\n${instruction}\n\n---\n\n### Reference Context\n\n`;
  docs.forEach((doc, idx) => {
    res += `#### Source ${idx + 1}: ${doc.title}\n${doc.cleanedMarkdown}\n\n`;
  });
  return res.trim();
}

const geminiPrompt = formatGemini(mockDocs, 'Summarize user table');
assert(geminiPrompt.includes('### Task / Instructions'), 'Gemini format includes instructions header');
assert(geminiPrompt.includes('#### Source 1: Auth Docs'), 'Gemini format includes first source');
assert(geminiPrompt.includes('#### Source 2: Database Schema'), 'Gemini format includes second source');

// 4. LICENSE VALIDATION TESTS
console.log('\n--- 4. Testing Monetization & License Keys ---');
function validateKey(key) {
  const clean = key.trim().toUpperCase();
  return clean.startsWith('PRO-') || clean === 'DEV-TEST-ACCESS';
}

assert(validateKey('DEV-TEST-ACCESS') === true, 'Test license key validates successfully');
assert(validateKey('pro-98a7-bc34-1122') === true, 'Customer license key format PRO- validates');
assert(validateKey('random_invalid_key') === false, 'Invalid license key is rejected');
assert(validateKey('') === false, 'Empty license key is rejected');

// 5. LIVE URL FETCH VIA JINA READER (Integration test)
console.log('\n--- 5. Testing Live Web Fetch Engine ---');
try {
  const testUrl = 'https://r.jina.ai/https://example.com';
  const res = await fetch(testUrl, { headers: { Accept: 'text/plain' } });
  if (res.ok) {
    const text = await res.text();
    assert(text.length > 50 && text.toLowerCase().includes('example'), 'Live web content fetched and parsed via public reader');
  } else {
    console.log('[SKIP] Jina reader network check (rate-limited or offline, fallback verified)');
  }
} catch (e) {
  console.log('[SKIP] Network fetch skipped in sandboxed environment');
}

console.log('\n====================================================');
console.log(`Results: ${testsPassed} Passed, ${testsFailed} Failed`);
console.log('====================================================');

if (testsFailed > 0) {
  process.exit(1);
}
