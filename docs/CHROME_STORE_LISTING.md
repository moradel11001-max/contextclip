# ContextClip — Store Listing & Submission Asset Pack

This document contains everything needed to list **ContextClip** on the **Google Chrome Web Store**, **Microsoft Edge Add-ons Store**, and **Firefox Add-ons**.

---

## 1. Store Metadata

### Title
`ContextClip — AI Web & Docs Optimizer`

### Subtitle / Short Description (132 characters max)
`Clean noisy web pages and documentation into token-optimized LLM context for Claude, ChatGPT, and Gemini. Save 40-70% tokens.`

### Category
- **Chrome Web Store:** Productivity / Workflow & Planning (or Developer Tools)
- **Microsoft Edge Add-ons:** Productivity / Developer Tools

### Language
English (United States)

---

## 2. Detailed Store Description (Copy & Paste)

```markdown
Turn any messy webpage, technical documentation, or article into clean, token-optimized context for Claude, ChatGPT, and Gemini in one click.

When you copy and paste text directly from websites into LLMs, you waste 40% to 70% of your prompt tokens on navigation bars, cookie banners, sidebars, tracking footers, and redundant HTML tags. 

ContextClip strips the noise client-side using Mozilla's proven Readability engine, extracts the pure content into clean Markdown, calculates token counts across major models, and formats it with structured prompt templates.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✨ KEY FEATURES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• 🧹 1-Click Distillation: Removes headers, footers, ads, cookie notices, and sidebars automatically.
• 📉 40–70% Token Savings: Cuts prompt costs and fits large technical documents cleanly within model context windows.
• 📊 Real-Time Token Estimator: Instant token estimates and dollar cost previews for GPT-4o, Claude 3.5 Sonnet, and Gemini 1.5 Pro.
• 🏷️ Structured AI Templates:
    - Raw Markdown: Clean, readable content.
    - Claude XML: Formatted in `<document>` and `<context>` tags for optimal Anthropic reasoning.
    - Gemini Context: Clear system separation blocks.
    - OpenAI Context: Formatted delimiters for strict system prompt adherence.
    - Custom Template: Define your own prompt structure with variable injection.
• ⚡ 100% Client-Side & Private: No text, URLs, or browsing data are ever sent to an external server. Everything processes locally in your browser.
• 🌓 Dark & Light Mode: Beautiful modern UI built for low eye strain.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔒 PRIVACY & SECURITY FIRST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Your data never leaves your computer:
• Zero tracking, zero analytics, zero external API calls.
• No account or login required for standard extraction.
• Operates only on the tab you explicitly activate.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 HOW TO USE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Navigate to any article, blog post, or API documentation page.
2. Click the ContextClip extension icon in your browser toolbar.
3. Review your cleaned Markdown, token savings, and estimated API cost.
4. Choose your prompt template (Claude XML, Gemini, or OpenAI).
5. Click "Copy Context" and paste directly into your AI chat or workflow!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📬 SUPPORT & FEEDBACK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Web Version: https://contextclip.vercel.app/
• Support & Feedback: moradel11001@gmail.com
```

---

## 3. Privacy Practices & Justifications (Required by Web Stores)

### Single Purpose Description
> "ContextClip extracts the core readable content from the active webpage and converts it into token-efficient Markdown formatted for AI prompts."

### Permissions Justifications

| Permission | Justification for Reviewer |
| :--- | :--- |
| `activeTab` | Required only when the user clicks the extension popup to extract readable article content from the currently open webpage without reading background tabs. |
| `clipboardWrite` | Required to allow the user to copy the cleaned Markdown and AI prompt templates directly to their clipboard with one click. |
| `storage` | Required to save the user's preferred prompt template, custom instructions, and local Pro license key in their browser storage. |

### Data Usage Declarations
- **Does this extension collect user data?** `NO`
- **Does this extension transmit user data to external servers?** `NO` (100% client-side execution)
- **Does this extension use cookies or trackers?** `NO`

---

## 4. Submission Instructions

### Option A: Microsoft Edge Add-ons (100% Free / $0 Fee)
*Recommended for immediate zero-cost distribution!*
1. Go to the [Microsoft Partner Center](https://partner.microsoft.com/dashboard/microsoftedge/overview).
2. Sign in with any free Microsoft account.
3. Registration is **$0 (completely free)**.
4. Click **Create new extension** -> Upload `dist/contextclip-v1.0.0.zip`.
5. Paste the metadata from Section 1 & 2 above.
6. Submit for review (approval typically takes 24–48 hours).

### Option B: Google Chrome Web Store ($5 USD One-Time Fee)
1. Go to the [Chrome Developer Dashboard](https://chrome.google.com/webstore/devcenter).
2. Pay Google's one-time **$5 USD** developer registration fee.
3. Click **Add new item** -> Upload `dist/contextclip-v1.0.0.zip`.
4. Upload promotional screenshots (take screenshots of the extension open).
5. Paste the metadata and privacy justifications above.
6. Submit for review (approval typically takes 1–3 business days).

### Option C: Direct Developer Mode (.zip Installation) (100% Free)
Users can install ContextClip directly without any store:
1. Download `contextclip-v1.0.0.zip` and extract it to a folder.
2. Open Chrome/Edge and navigate to `chrome://extensions` or `edge://extensions`.
3. Toggle **Developer mode** ON (top right switch).
4. Click **Load unpacked** and select the extracted folder.
5. ContextClip is instantly installed and ready to use!
