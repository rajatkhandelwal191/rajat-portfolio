# Search Engine Optimization (SEO), LLM Discoverability & Google Search Console Guide

This document outlines the SEO architecture, Google Search Console verification, dynamic sitemaps, crawlers (`robots.txt`), and LLM discoverability (`llms.txt`) implemented across the **Rajat Portfolio** platform.

---

## 1. Quick Reference & Verification Assets

| Asset | Path / URL | Purpose |
| :--- | :--- | :--- |
| 🔍 **Google Verification File** | [`frontend/public/google6155fbd8ff7c1e86.html`](../frontend/public/google6155fbd8ff7c1e86.html) | Verifies site ownership on Google Search Console via HTML upload. |
| 🏷️ **Google Meta Tag** | `verification: { google: "6155fbd8ff7c1e86" }` in [`layout.tsx`](../frontend/src/app/layout.tsx) | Secondary verification method via `<meta name="google-site-verification" ... />`. |
| 🗺️ **Dynamic Sitemap** | [`frontend/src/app/sitemap.ts`](../frontend/src/app/sitemap.ts) | Next.js 15 App Router sitemap endpoint (`/sitemap.xml`). |
| 🗺️ **Static Sitemap** | [`frontend/public/sitemap.xml`](../frontend/public/sitemap.xml) | Static fallback sitemap covering all 18 portfolio routes. |
| 🤖 **Dynamic Robots** | [`frontend/src/app/robots.ts`](../frontend/src/app/robots.ts) | Next.js 15 App Router robots configuration (`/robots.txt`). |
| 🤖 **Static Robots** | [`frontend/public/robots.txt`](../frontend/public/robots.txt) | Explicit rules allowing Googlebot and AI crawlers (GPTBot, ClaudeBot, PerplexityBot). |
| 🧠 **LLMs Manifest** | [`frontend/public/llms.txt`](../frontend/public/llms.txt) | Standard `llms.txt` summary for AI agents and LLM search engines. |
| 📚 **LLMs Full Knowledge** | [`frontend/public/llms-full.txt`](../frontend/public/llms-full.txt) | Exhaustive profile knowledge base for deep AI ingestion. |

---

## 2. Google Search Console Verification Steps

1. **Deploy Site to Production:**
   - Ensure the Next.js build is deployed to Vercel at `https://rajat-portfolio-ten.vercel.app/`.
2. **Verify HTML File is Accessible:**
   - In a browser or curl, navigate to:  
     `https://rajat-portfolio-ten.vercel.app/google6155fbd8ff7c1e86.html`
   - It should return:  
     `google-site-verification: google6155fbd8ff7c1e86.html`
3. **Verify Meta Tag:**
   - Inspect the HTML head of `https://rajat-portfolio-ten.vercel.app/`. You should see:
     ```html
     <meta name="google-site-verification" content="6155fbd8ff7c1e86" />
     ```
4. **Complete Ownership in Search Console:**
   - Return to your open Google Search Console tab ("Verify ownership").
   - Click the **"VERIFY"** button under *Recommended verification method (HTML file)*.
   - Search Console will confirm ownership and begin indexing the property.
5. **Submit the Sitemap:**
   - Navigate to **Sitemaps** on the left menu in Search Console.
   - In "Add a new sitemap", enter: `sitemap.xml`
   - Click **Submit**.

---

## 3. Sitemap Configuration (`sitemap.xml`)

All 18 key pages are registered with priority scores and change frequencies:

```typescript
// frontend/src/app/sitemap.ts
const routes = [
  { path: "", priority: 1.0, changeFrequency: "weekly" }, // Home
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/projects", priority: 0.95, changeFrequency: "weekly" },
  { path: "/projects/portfolio-architecture", priority: 0.9, changeFrequency: "monthly" },
  { path: "/projects/deepdisk", priority: 0.85, changeFrequency: "monthly" }, // Play Store App
  { path: "/projects/vaulet", priority: 0.85, changeFrequency: "monthly" },   // Play Store App
  { path: "/projects/whiteframe", priority: 0.85, changeFrequency: "monthly" },// Play Store App
  { path: "/projects/rag-playground", priority: 0.8, changeFrequency: "monthly" },
  { path: "/projects/exam-parser-pipeline", priority: 0.75, changeFrequency: "monthly" },
  { path: "/projects/capstone-enterprise-assistant", priority: 0.75, changeFrequency: "monthly" },
  { path: "/projects/mobikwik-scam-tracker", priority: 0.7, changeFrequency: "monthly" },
  { path: "/experience", priority: 0.9, changeFrequency: "monthly" },
  { path: "/experience/enbridge-eol-agent", priority: 0.85, changeFrequency: "monthly" },
  { path: "/experience/tcs-agentic-ai", priority: 0.8, changeFrequency: "monthly" },
  { path: "/experience/tcs-otk-chatbot", priority: 0.75, changeFrequency: "monthly" },
  { path: "/experience/tcs-innovista-user-analysis", priority: 0.75, changeFrequency: "monthly" },
  { path: "/resume", priority: 0.9, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
];
```

---

## 4. Robots & AI Crawler Directives (`robots.txt`)

Search engines and modern LLM bots are explicitly permitted to index public routes while sensitive administrative endpoints (`/contact/admin`, `/api/`) are disallowed:

```text
User-agent: *
Allow: /
Disallow: /api/
Disallow: /contact/admin

User-agent: Googlebot
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

Sitemap: https://rajat-portfolio-ten.vercel.app/sitemap.xml
```

---

## 5. The `/llms.txt` and `/llms-full.txt` Standard

The [`llms.txt`](https://llmstxt.org) standard is an open format designed specifically for AI models, coding agents, and conversational search engines (Perplexity, ChatGPT Search, Claude, NotebookLM) to ingest structured context without web-scraping noise.

### Features of `llms.txt`:
* **Structured Markdown Header:** H1 identity and executive summary blockquote.
* **Curated Link Directory:** Each portfolio page is linked with a 1-sentence technical summary so LLMs can perform targeted citations.
* **Exhaustive Companion:** Links directly to `/llms-full.txt` for deep RAG or offline agent ingestion.

---

## 6. Metadata, Keywords & JSON-LD Structured Data

Implemented in `frontend/src/app/layout.tsx`:

### Targeted Keywords:
`Rajat Khandelwal`, `Lead AI Engineer`, `Agentic AI`, `LangGraph`, `Microsoft Agent Framework`, `Azure AI Search`, `Azure OpenAI`, `Claude Certified Architect`, `Azure AI Engineer AI-102`, `Enterprise RAG`, `Full Stack Developer`, `FastAPI`, `React`, `TypeScript`, `Next.js 15`, `DeepDisk`, `Vaulet`, `WhiteFrame`, `Mobile Architect`, `Flutter`, `Native Android Kotlin`, `Jetpack Compose`, `TCS AI Engineer`, `Enbridge EOL Agent`.

### Schema.org JSON-LD Entities:
* **`Person` Schema:** Defines Rajat Khandelwal, Job Title, Employer (TCS), `sameAs` links to LinkedIn, GitHub, Credly, and Google Play Console.
* **`WebSite` Schema:** Defines the portfolio platform and links authorship back to the `Person` entity for Google Knowledge Graph ingestion.
