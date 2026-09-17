# ContextClip ⚡

> **Zero-Noise Web & Docs to AI Context**. 
> Transform bloated web pages, documentation, and code snippets into token-optimized, structured prompts for Claude, ChatGPT, and Gemini.

---

## 🚀 Live Demo & Development

### 1. Run Locally
```bash
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 2. Build for Production
```bash
npm run build
```
Generates a static, zero-server-cost production bundle in `dist/`.

---

## 🌐 Deploy for $0 (Zero Server Costs)

Because ContextClip runs 100% client-side in the browser:

### Option A: Vercel (Recommended)
1. Push this repository to your GitHub.
2. Go to [vercel.com](https://vercel.com) (free account).
3. Click **"Add New Project"** and import this repository.
4. Framework Preset: **Vite**. Build Command: `npm run build`. Output: `dist`.
5. Click **Deploy**. Your app is live with a free SSL domain (e.g., `contextclip.vercel.app`).

### Option B: Cloudflare Pages
1. Go to Cloudflare Dashboard > **Workers & Pages** > **Create application** > **Pages**.
2. Connect your GitHub repository.
3. Build command: `npm run build`, Output directory: `dist`.
4. Deploy!

---

## 🧩 Run as a Chrome Extension

1. Run `npm run build`.
2. Open Chrome/Brave/Edge and navigate to `chrome://extensions`.
3. Enable **Developer mode** (top right toggle).
4. Click **"Load unpacked"**.
5. Select the `dist` folder inside this project.
6. Click the extension icon in your browser toolbar to use ContextClip directly on any webpage!

---

## 💰 Monetization & Getting Paid (Via Your PayPal / LemonSqueezy)

ContextClip includes a built-in **Pro Lifetime Pass ($12)** gate.

### Step 1: Create Your Product
- **Gumroad (Easiest)**:
  1. Go to [gumroad.com](https://gumroad.com) and create a free creator account.
  2. Link your PayPal in Settings > Payments.
  3. Create a Digital Product called **"ContextClip Pro - Lifetime Pass"** for **$12**.
  4. Enable "Generate license keys" in Gumroad product settings.
- **Lemon Squeezy**:
  1. Go to [lemonsqueezy.com](https://lemonsqueezy.com) and create a product.
  2. Set price to $12 (Lifetime license).

### Step 2: Update Your Payment Link
Open `src/lib/license.ts` and replace the placeholder with your store link:
```typescript
export const PAYMENT_LINKS = {
  gumroad: 'https://yourstore.gumroad.com/l/your-product',
  // ...
};
```

---

## 📢 Distribution & Launch Playbook (Copy & Paste)

### 1. Show HN (Hacker News) Post
**Title:** `Show HN: ContextClip – Clean web docs into token-optimized LLM prompts`
```text
Hey HN,

I kept running into an annoying problem: whenever I copy-paste documentation, blog posts, or GitHub issues into Claude or ChatGPT, it pulls in tons of garbage—navbars, ads, cookie banners, tracking scripts—eating up 30-50% of the token context window.

So I built ContextClip: a lightweight, 100% client-side tool that strips out all web noise and structures the content into model-specific prompts (Claude XML tags, Gemini markdown, OpenAI).

Try it out here: https://contextclip.vercel.app/
Source code: https://github.com/moradel11001-max/contextclip

Feedback and bug reports are warmly welcome!
```

### 2. Reddit Post (r/ChatGPT, r/ClaudeAI, r/PromptEngineering, r/webdev)
**Title:** `I built a zero-bloat web tool to strip ads/navbars before feeding docs into Claude & ChatGPT (saves ~40% tokens)`
```text
If you frequently paste web documentation, technical articles, or code tutorials into LLMs, you probably know how much junk gets captured (headers, footers, related links, cookie popups).

I created a tool called ContextClip to solve this:
- Extracts core article text using Mozilla Readability + Turndown.
- Shows live token counts and estimated API cost.
- Wraps context cleanly in Claude XML or markdown tags.
- Has a multi-document stacker to combine 5+ pages into one prompt.

100% free to use, runs entirely in the browser: https://contextclip.vercel.app/
```
