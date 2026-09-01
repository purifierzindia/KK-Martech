import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized GoogleGenAI instance
let genAIClient: GoogleGenAI | null = null;

function getGenAI(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!genAIClient) {
    genAIClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return genAIClient;
}

const KAYKAY_SYSTEM_INSTRUCTION = `You are "KayKay", the official AI Digital Strategist & Concierge for KK MARTECH (an elite digital marketing, web engineering, and AI-accelerated creative agency).

YOUR PERSONALITY & TONE:
- Smart, welcoming, strategic, authoritative, concise, and results-focused.
- Never write overly verbose walls of text; keep answers crisp, structured with bullet points, and scannable.
- Provide practical recommendations, tactical marketing insights, and clear next steps.

CORE KNOWLEDGE ABOUT KK MARTECH:
1. SERVICES:
   - High-Performance Web & App Development: Bespoke React/Next.js/Tailwind websites, high-speed architectures, e-commerce, interactive UX.
   - Performance Digital Marketing & Paid Ads: Meta Ads (Facebook & Instagram), Google Search & Display Ads, LinkedIn B2B funnels, high ROAS lead gen.
   - Social Media Strategy & Organic Growth: Viral short-form video reels, content calendars, community management, brand aesthetics.
   - Search Engine Optimization (SEO): Technical SEO audits, local Google Business ranking, keyword clustering, backlinks, content optimization.
   - Brand Identity & Visual Systems: Complete branding kits, typography, color theory, logo suites, pitch decks.
   - AI Creative & Generative Visual Pipelines: Midjourney, Stable Diffusion, ComfyUI, Runway, Kling for hyper-realistic product shoots, cinematic ad reels, and automated creative asset workflows.

2. DIRECT CONTACT INFO:
   - Phone: 8005986330
   - WhatsApp: 8920880526 (+91 8920880526)
   - Email: hello@kkmartech.com / info@kkmartech.com
   - Global Reach: Serving modern businesses, startups, clinics, luxury brands, and e-commerce stores worldwide.

3. SPECIAL FEATURES ON THIS SITE:
   - "Work / Portfolio Grid" with live case studies across Websites, Digital Marketing, AI Creative, and Branding.
   - "AI Marketing Pipeline" showing our step-by-step generative media stack.
   - "Portfolio CMS Manager" in the footer allowing real-time edits to project showcases.
   - "Free Discovery Audit & Strategy Consultation" accessible via the Contact section or direct WhatsApp.

RESPONSE FORMATTING GUIDELINES:
- Use clean Markdown with bold keywords and concise lists.
- When relevant, encourage the user to explore our portfolio or get in touch for a tailored quote.
- If a user asks about prices or quotes, explain that KK MARTECH offers customized sprint-based packages depending on scope, and invite them to leave their details in the Contact form or message on WhatsApp for an immediate discovery quote.
- You can include navigation suggestions naturally at the end when appropriate.`;

// Models to attempt in order of reliability, availability, and speed
const CANDIDATE_MODELS = [
  'gemini-flash-latest',
  'gemini-3.6-flash',
  'gemini-3.5-flash-lite',
  'gemini-3.1-flash-lite',
  'gemini-3.7-flash',
];

// Helper for delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Domain-grounded intelligent fallback generator
function generateLocalKayKayResponse(userQuery: string): { reply: string; suggestedActions: Array<{ label: string; action: string }> } {
  const q = userQuery.toLowerCase();
  let reply = '';
  const suggestedActions: Array<{ label: string; action: string }> = [];

  if (q.includes('price') || q.includes('cost') || q.includes('quote') || q.includes('rate') || q.includes('budget') || q.includes('how much')) {
    reply = `### KK MARTECH Pricing & Engagement Models\n\nWe provide tailored, sprint-based solutions based on your project goals:\n\n- **Bespoke Websites & Web Apps**: Custom design, React/Next.js stack, rapid performance optimization, and mobile-first responsiveness.\n- **Performance Digital Marketing**: Meta Ads (FB/IG) and Google Search/Display funnels with continuous ROAS tracking.\n- **SEO & Growth Strategy**: Technical audit, keyword clustering, Google Business profile optimization, and backlink authority building.\n- **AI Creative Pipelines**: Midjourney/ComfyUI product photography & video reel generation.\n\n👉 *For an exact timeline and discovery quote, please share your project details in our Contact form or reach out directly on WhatsApp!*`;
    suggestedActions.push({ label: 'Get Free Audit', action: 'contact' });
    suggestedActions.push({ label: 'WhatsApp Direct', action: 'whatsapp' });
  } else if (q.includes('service') || q.includes('what do you do') || q.includes('offer') || q.includes('capabilities')) {
    reply = `### KK MARTECH Core Services\n\nWe engineer modern digital experiences and performance growth systems:\n\n1. **High-Performance Web Development**: Ultra-fast React & Next.js architectures, e-commerce, and high-conversion landing pages.\n2. **Performance Marketing**: Target audience acquisition on Meta, Google Ads, and LinkedIn with full-funnel tracking.\n3. **AI Creative Studio**: Generative visual pipelines, automated studio shoots, and cinematic short-form video reels.\n4. **SEO & Organic Authority**: Top-ranking Google strategies and technical SEO auditing.\n5. **Brand Identity**: Complete brand books, typographic systems, and high-impact visual design.`;
    suggestedActions.push({ label: 'Explore Services', action: 'services' });
    suggestedActions.push({ label: 'View Portfolio', action: 'work' });
  } else if (q.includes('ai') || q.includes('creative') || q.includes('video') || q.includes('reel') || q.includes('midjourney') || q.includes('pipeline')) {
    reply = `### AI Creative & Generative Visual Pipeline\n\nAt KK MARTECH, we bridge prompt engineering and studio-grade post-production:\n\n- **Hyper-Realistic Product Visuals**: Custom trained LoRAs and ComfyUI workflows for lifestyle and studio photography.\n- **Dynamic Video & Motion**: AI motion synthesis (Runway, Kling) paired with human visual polish.\n- **Automated Ad Creative Variations**: High-speed generation of multi-angle creative assets for A/B ad testing.\n\nCheck out our interactive visual reels section to see live examples!`;
    suggestedActions.push({ label: 'AI Creative Reel', action: 'creative' });
    suggestedActions.push({ label: 'View Work', action: 'work' });
  } else if (q.includes('seo') || q.includes('rank') || q.includes('google') || q.includes('traffic')) {
    reply = `### Search Engine Optimization (SEO)\n\nOur organic growth framework is built for sustainable first-page rankings:\n\n- **Technical Infrastructure**: Core Web Vitals optimization, clean schema markup, and speed audits.\n- **Strategic Keyword Clustering**: High-intent search queries targeting qualified buyers.\n- **Authority & Backlink Strategy**: Editorial outreach and high-trust domain mentions.\n- **Local SEO**: Google Business Profile ranking and map pack dominance.`;
    suggestedActions.push({ label: 'Request SEO Audit', action: 'contact' });
    suggestedActions.push({ label: 'Explore Services', action: 'services' });
  } else if (q.includes('contact') || q.includes('phone') || q.includes('call') || q.includes('whatsapp') || q.includes('email') || q.includes('reach') || q.includes('hire')) {
    reply = `### Connect with KK MARTECH\n\nWe are ready to partner on your next digital sprint:\n\n- **Phone Consultation**: [8005986330](tel:8005986330)\n- **WhatsApp Direct**: [8920880526](https://wa.me/918920880526)\n- **Email**: hello@kkmartech.com\n- **Discovery Form**: Fill out our brief project inquiry in the contact section below.`;
    suggestedActions.push({ label: 'Chat on WhatsApp', action: 'whatsapp' });
    suggestedActions.push({ label: 'Open Contact Form', action: 'contact' });
  } else {
    reply = `Hello! I'm **KayKay**, your KK MARTECH digital strategist.\n\nWe specialize in **High-Performance Web Engineering**, **Full-Funnel Performance Marketing (Meta & Google Ads)**, **SEO Authority**, and **AI Creative Production**.\n\nHow can we help elevate your digital presence today? Let me know your goals or feel free to reach our team directly at **8005986330** / WhatsApp **8920880526**!`;
    suggestedActions.push({ label: 'Explore Services', action: 'services' });
    suggestedActions.push({ label: 'View Portfolio', action: 'work' });
    suggestedActions.push({ label: 'Start Project', action: 'contact' });
  }

  return { reply, suggestedActions };
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// KayKay Gemini Chat Endpoint
app.post('/api/chat', async (req, res) => {
  const { message, history } = req.body;

  if (!message || typeof message !== 'string') {
    res.status(400).json({ error: 'Message is required and must be a string' });
    return;
  }

  const ai = getGenAI();

  // If no API key is available, use our domain-grounded response
  if (!ai) {
    const localResp = generateLocalKayKayResponse(message);
    res.json({
      reply: localResp.reply,
      suggestedActions: localResp.suggestedActions,
      source: 'local-knowledge',
    });
    return;
  }

  // Build chat contents from history
  const formattedContents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

  if (Array.isArray(history) && history.length > 0) {
    const recentHistory = history.slice(-8);
    for (const item of recentHistory) {
      if (item.sender === 'user' && item.text) {
        formattedContents.push({ role: 'user', parts: [{ text: item.text }] });
      } else if (item.sender === 'bot' && item.text) {
        formattedContents.push({ role: 'model', parts: [{ text: item.text }] });
      }
    }
  }

  // Append user's current prompt
  formattedContents.push({
    role: 'user',
    parts: [{ text: message }],
  });

  let replyText = '';
  let modelUsed = '';

  // Try candidate models in succession with fallback handling
  for (const modelName of CANDIDATE_MODELS) {
    try {
      const response = await ai.models.generateContent({
        model: modelName,
        contents: formattedContents,
        config: {
          systemInstruction: KAYKAY_SYSTEM_INSTRUCTION,
          temperature: 0.7,
          topP: 0.95,
        },
      });

      if (response && response.text) {
        replyText = response.text;
        modelUsed = modelName;
        break;
      }
    } catch (modelErr: any) {
      console.warn(`Model ${modelName} encountered issue:`, modelErr?.message || modelErr);
      // Small pause before trying next candidate
      await delay(200);
    }
  }

  // If all live API attempts were unavailable or rate limited, gracefully generate grounded answer
  if (!replyText) {
    console.log('Using resilient domain-grounded fallback for user query');
    const localResp = generateLocalKayKayResponse(message);
    res.json({
      reply: localResp.reply,
      suggestedActions: localResp.suggestedActions,
      source: 'fallback-knowledge',
    });
    return;
  }

  // Contextual suggested actions based on reply
  const suggestedActions: Array<{ label: string; action: string }> = [];
  const lowerMessage = (message + ' ' + replyText).toLowerCase();

  if (lowerMessage.includes('work') || lowerMessage.includes('portfolio') || lowerMessage.includes('case stud') || lowerMessage.includes('project')) {
    suggestedActions.push({ label: 'View Portfolio', action: 'work' });
  }
  if (lowerMessage.includes('service') || lowerMessage.includes('develop') || lowerMessage.includes('seo') || lowerMessage.includes('marketing') || lowerMessage.includes('ads')) {
    suggestedActions.push({ label: 'Our Services', action: 'services' });
  }
  if (lowerMessage.includes('ai') || lowerMessage.includes('midjourney') || lowerMessage.includes('creative') || lowerMessage.includes('reel')) {
    suggestedActions.push({ label: 'AI Creative Reel', action: 'creative' });
  }
  if (lowerMessage.includes('contact') || lowerMessage.includes('quote') || lowerMessage.includes('price') || lowerMessage.includes('hire') || lowerMessage.includes('start')) {
    suggestedActions.push({ label: 'Start Project', action: 'contact' });
    suggestedActions.push({ label: 'WhatsApp Us', action: 'whatsapp' });
  }

  if (suggestedActions.length === 0) {
    suggestedActions.push({ label: 'Explore Services', action: 'services' });
    suggestedActions.push({ label: 'View Our Work', action: 'work' });
    suggestedActions.push({ label: 'Get in Touch', action: 'contact' });
  }

  res.json({
    reply: replyText,
    suggestedActions: suggestedActions.slice(0, 3),
    model: modelUsed,
  });
});

// Vite middleware & Static Serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`KK MARTECH Server running on port ${PORT}`);
  });
}

startServer();
