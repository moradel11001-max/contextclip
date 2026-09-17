// Verification script for ContextClip core logic
import TurndownService from 'turndown';

console.log('Testing ContextClip Core Logic...');

// 1. Test HTML Cleaning and Turndown
const turndown = new TurndownService();
turndown.addRule('removeElements', {
  filter: (node) => ['script', 'style', 'noscript', 'iframe', 'svg', 'canvas'].includes(node.nodeName.toLowerCase()),
  replacement: () => ''
});

const sampleHtml = `
  <div>
    <nav><a href="/home">Home</a><a href="/about">About</a></nav>
    <script>console.log("tracker");</script>
    <article>
      <h1>Understanding LLM Prompts</h1>
      <p>This is a guide to <strong>optimizing context</strong> for large language models.</p>
      <pre><code>console.log("clean code");</code></pre>
    </article>
    <footer><p>© 2026 Company Inc. All rights reserved.</p></footer>
  </div>
`;

const markdown = turndown.turndown(sampleHtml);
console.log('✔ Markdown Conversion Output:');
console.log(markdown);

if (!markdown.includes('Understanding LLM Prompts') || markdown.includes('console.log("tracker")')) {
  console.error('❌ Test failed: Content extraction mismatch');
  process.exit(1);
}

// 2. Test Token Estimator heuristic
const charCount = markdown.length;
const estimatedTokens = Math.ceil(charCount / 3.7);
console.log(`✔ Chars: ${charCount}, Estimated Tokens: ${estimatedTokens}`);

if (estimatedTokens <= 0) {
  console.error('❌ Test failed: Invalid token count');
  process.exit(1);
}

console.log('✔ All core tests passed successfully!');
