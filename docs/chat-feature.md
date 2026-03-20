# Chat Feature — Complete Documentation

> **Who this is for:** This document is written for everyone — from non-technical founders and stakeholders who want to understand what the chat does and why it matters, to developers who need to know exactly how it is built and maintained.

---

## Table of Contents

1. [Plain-English Overview (Non-Technical)](#1-plain-english-overview)
2. [What the User Sees](#2-what-the-user-sees)
3. [How It All Connects — The Big Picture](#3-how-it-all-connects)
4. [Component Breakdown (Technical)](#4-component-breakdown)
5. [Claude AI Integration](#5-claude-ai-integration)
6. [The Cloudflare Worker Proxy](#6-the-cloudflare-worker-proxy)
7. [Conversation Flow — Step by Step](#7-conversation-flow)
8. [Security Design](#8-security-design)
9. [Configuration & Deployment](#9-configuration--deployment)
10. [Files at a Glance](#10-files-at-a-glance)

---

## 1. Plain-English Overview

Think of the B. Luxe Digital chat feature as a **knowledgeable, faith-aligned personal guide** available 24/7 on the website.

When a visitor lands on the `/chat` page, they are greeted by an AI assistant that knows:

- The full B. Luxe Digital product catalogue (prices, purpose, who each product is for)
- The brand's faith-rooted philosophy (Excavation Method, Valley Seasons, High-Stewardship Faith)
- How to gently steer conversations toward the right product or next step — without being pushy

The assistant is powered by **Claude**, an AI made by Anthropic (a leading AI safety company). Claude is exceptionally good at warm, nuanced conversation — far more thoughtful than a typical chatbot.

**Why does this matter for the business?**

| Without Chat | With Chat |
|---|---|
| Visitors browse products alone | Visitors get personalized guidance |
| High drop-off on "which product is right for me?" | AI asks questions, recommends the right fit |
| Support questions go to email | Instant answers, day or night |
| Brand voice requires a human | AI maintains brand voice consistently |

---

## 2. What the User Sees

When a user visits `https://bluxedigital.com/chat`, they see:

```
┌──────────────────────────────────────────────┐
│          YOUR GUIDE                          │
│    Explore Your Transformation               │
│  Discover what's possible in your faith…    │
│                                              │
│  [What season am I in spiritually?]          │
│  [How do I grow my business with faith?]     │
│  [What product is right for me?]  …more     │
│                                              │
│ ┌────────────────────────────────────────┐  │
│ │ 🤖 Hey, welcome! I'm your B. Luxe     │  │
│ │    Digital guide…                     │  │
│ │                                        │  │
│ │              You: [user message] 💬   │  │
│ │                                        │  │
│ │ 🤖 Here's what I'd suggest for you…  │  │
│ └────────────────────────────────────────┘  │
│                                              │
│  [ Ask me anything…          ] [Send]        │
└──────────────────────────────────────────────┘
```

**Key UI elements:**

| Element | Purpose |
|---|---|
| **Prompt chips** (the tappable buttons) | Give visitors instant conversation starters — no blank-page anxiety |
| **Chat window** (scrollable) | Shows the full conversation history |
| **"Thinking…" indicator** | Reassures the user the AI is working while waiting for a response |
| **Text input + Send button** | How users type their own questions |
| **Auto-scroll** | Window automatically scrolls to the newest message |

**Message styling:**
- User messages appear on the **right** in purple
- AI responses appear on the **left** in white/light grey

---

## 3. How It All Connects — The Big Picture

Below is a plain-English map of how a message travels from the user to Claude and back:

```
User types a message
        │
        ▼
  Browser (React app)
  ─ Packages the message + full conversation history
  ─ Sends it to the Cloudflare Worker
        │
        ▼
  Cloudflare Worker (middleman)
  ─ Checks that the request is valid
  ─ Attaches the secret API key (which the browser never sees)
  ─ Forwards the request to Anthropic's servers
        │
        ▼
  Anthropic / Claude AI
  ─ Reads the conversation history
  ─ Follows the B. Luxe brand instructions
  ─ Generates a warm, helpful response
        │
        ▼
  Cloudflare Worker (return trip)
  ─ Passes Claude's response back to the browser
        │
        ▼
  Browser (React app)
  ─ Displays the response in the chat window
  ─ Auto-scrolls to the newest message
```

**Why is there a "middleman" (Cloudflare Worker)?**

Without it, the API key — the secret password that grants access to Claude — would have to live inside the website where any visitor could find it. The Worker keeps it hidden on a server. Think of it like a front desk: visitors talk to the front desk (Worker), not directly to the CEO (Anthropic API).

---

## 4. Component Breakdown

The chat feature is built from three pieces of code working together.

### 4.1 `bluxe-digital/src/pages/Chat.jsx` — The UI

This is the **visual layer** — everything the user sees and interacts with.

It contains two parts:

**`useAIChat()` — the logic hook**

This is an invisible helper (a React custom hook) that manages:
- The list of messages in the conversation
- Sending a new message to the Worker
- Tracking whether the AI is currently "thinking"
- Handling errors gracefully (shows a friendly message if something goes wrong)

**`Chat()` — the visual component**

This is what renders on screen:
- The page header ("Explore Your Transformation")
- The six prompt chip buttons
- The scrollable message window
- The loading indicator
- The text input form

### 4.2 `bluxe-digital/src/config.js` — The Configuration

A single-line file that stores the Worker URL:

```js
export const WORKER_URL = "https://bluxe-digital-ai.bianca-moody26.workers.dev"
```

This is the only place you need to change if the Worker is ever redeployed to a new URL.

### 4.3 `cloudflare-worker/worker.js` — The Proxy

The "front desk" server described in Section 3. It:
- Accepts requests from the browser
- Validates them (correct format, allowed AI model)
- Attaches the secret Anthropic API key
- Forwards to Claude and returns the response

---

## 5. Claude AI Integration

### Which Claude model is used?

The chat uses **`claude-opus-4-6`** — Anthropic's most capable conversational model, tuned for nuanced, warm, human-like responses. This is not a cheaper or weaker model; it is the premium choice, selected intentionally to match the brand's high-touch, mentorship-style voice.

### The System Prompt — giving Claude its personality

Every conversation begins with a hidden set of instructions called a **system prompt**. This is what tells Claude how to behave. It defines:

**1. Brand Identity**
> "You are a warm, faith-aligned guide for B. Luxe Digital — a brand built for purpose-driven women, especially women of color, who are ready to build lives and businesses rooted in faith, clarity, and action."

**2. Two domains of help**
- **Faith Transformations** — valley seasons, divine confidence, spiritual boundaries, the Excavation Method
- **Business Transformations** — going from scattered to strategic, turning experiences into marketable skills, AI as a tool for growth

**3. Product knowledge**
Claude knows every product, its price, and who it is for:
| Product | Price | Purpose |
|---|---|---|
| VITV 2026 Core Framework eBook | $297 | Foundational philosophies & Excavation Method |
| Valley Seasons Assessment | $97 | Diagnose which season they're in |
| The Daily Manna Vision Planner | $147 | Replace anxiety with authority |
| Vision Roadmap & Skill Stacker | $197 | Reframe experiences into high-paid skills |
| High-Stewardship Faith Strategy | $262 | Elite boundaries, discipline vs. punishment |
| Complete Ecosystem Bundle | $297 | All 5 products (total value $1,000) |
| The Powered Woman AI Mastery Course | — | Using AI confidently in business |
| Email Money Machine, Content Engine, etc. | — | Operational tools |

**4. Tone guidelines**
> "Warm, direct, faith-rooted, never preachy. Speak like a trusted mentor who believes in them deeply. Ask questions to understand where they are before recommending. Use 'sis,' 'friend,' or affirming language naturally but not excessively."

### Conversation memory

The entire conversation history is sent with every message. Claude sees every previous exchange, so it can give contextually aware, personalized replies — it never "forgets" what was said earlier in the same session.

> **Note:** Conversation history is held in the browser only (in memory). It is not stored in a database. When the user closes or refreshes the page, the chat history resets.

---

## 6. The Cloudflare Worker Proxy

### What it does

The Worker (`cloudflare-worker/worker.js`) acts as a secure relay between the browser and Anthropic's API.

### Security checks it performs

1. **Method guard** — only `POST` requests are accepted (and `OPTIONS` for CORS preflight)
2. **JSON validation** — rejects malformed request bodies immediately
3. **Model allowlist** — only these Claude models can be called through this proxy:
   - `claude-opus-4-6`
   - `claude-sonnet-4-6`
   - `claude-haiku-4-5-20251001`
4. **API key check** — if the key has not been configured, returns a clear error instead of silently failing

### CORS (Cross-Origin Resource Sharing)

The Worker includes CORS headers so the browser is permitted to communicate with it. In the current setup, `ALLOWED_ORIGIN` is set to `"*"` (any website). **For production**, this should be tightened to `"https://bluxedigital.com"` to prevent other websites from using the proxy.

### Where the API key lives

The Anthropic API key is stored as a **Cloudflare Secret** — an encrypted environment variable that only Cloudflare's servers can read. It is never written into the code and never sent to the browser.

```
Browser  ──────►  Worker (knows the secret key)  ──────►  Anthropic
         ◄──────                                  ◄──────
         (no key ever sent to browser)
```

---

## 7. Conversation Flow

Here is the step-by-step journey of a single message:

**Step 1 — User types or clicks a prompt**

The user either types in the text box and clicks "Send," or taps one of the six prompt chips.

**Step 2 — Message added to state**

The user's message is immediately added to the displayed conversation so the UI feels instant. The "Send" button is disabled and "Thinking…" appears.

**Step 3 — Request sent to Worker**

The app sends a `POST` request to the Cloudflare Worker URL containing:
- The AI model to use (`claude-opus-4-6`)
- The system prompt (brand/persona instructions)
- The full conversation history including the new message

**Step 4 — Worker validates and forwards**

The Worker checks the request is valid, attaches the Anthropic API key, and forwards everything to `https://api.anthropic.com/v1/messages`.

**Step 5 — Claude generates a response**

Anthropic's servers process the conversation and return a JSON response. The relevant text is at `data.content[0].text`.

**Step 6 — Response displayed**

The Worker passes the response back to the browser. The app adds it to the conversation, the "Thinking…" indicator disappears, and the window auto-scrolls to show the newest message.

**Step 7 — Error handling**

If anything fails at any step, a friendly fallback message appears:
- Network error: "Connection issue — please try again."
- Worker error: "I'm having trouble connecting right now. Please try again in a moment."

---

## 8. Security Design

| Risk | How it's mitigated |
|---|---|
| API key exposed in browser | Key lives only in Cloudflare Secrets, never in frontend code |
| Unlimited API calls from anyone | Model allowlist prevents unexpected usage; origin restriction (when tightened) limits to the official domain |
| Malformed requests crashing the worker | JSON parsing is wrapped in try/catch with a clear error response |
| Prompt injection / model switching | Worker enforces an explicit allowlist of permitted model names |
| Conversation data stored without consent | No database — conversation lives only in browser memory and is lost on page refresh |

**Recommended production hardening (not yet applied):**
- Change `ALLOWED_ORIGIN` in `worker.js` from `"*"` to `"https://bluxedigital.com"`
- Add rate limiting in the Cloudflare Worker to prevent abuse

---

## 9. Configuration & Deployment

### Updating the Worker URL

If the Cloudflare Worker is redeployed to a new URL, update this one line:

```js
// bluxe-digital/src/config.js
export const WORKER_URL = "https://your-new-worker.workers.dev"
```

### Deploying the Cloudflare Worker

**Option A — Dashboard (no coding required)**
1. Go to [workers.cloudflare.com](https://workers.cloudflare.com) → **Create Worker**
2. Paste the contents of `cloudflare-worker/worker.js`
3. Click **Deploy**
4. Go to **Settings → Variables → Add Secret**
   - Name: `ANTHROPIC_API_KEY`
   - Value: your key from [console.anthropic.com](https://console.anthropic.com)
5. Copy the Worker URL and paste it into `bluxe-digital/src/config.js`

**Option B — Wrangler CLI**
```bash
npm install -g wrangler
wrangler login
wrangler deploy cloudflare-worker/worker.js --name bluxe-proxy
wrangler secret put ANTHROPIC_API_KEY
```

### Changing the AI model

To use a different Claude model, update the `model` field in `Chat.jsx` **and** add the model name to `ALLOWED_MODELS` in `worker.js`. Both must match.

### Updating the system prompt

The AI's personality and product knowledge live in the `system` field inside `Chat.jsx` (lines 29–59). Edit that string to:
- Update product names or prices
- Adjust the tone
- Add or remove topics the AI should discuss

---

## 10. Files at a Glance

```
bluxe-digital/
├── src/
│   ├── config.js                  ← Worker URL (only config needed)
│   ├── pages/
│   │   └── Chat.jsx               ← All chat UI + AI logic
│   └── App.jsx                    ← Routing (/chat route registered here)
│
cloudflare-worker/
├── worker.js                      ← Anthropic API proxy (deployed to Cloudflare)
└── README.md                      ← Worker deploy instructions
```

**Summary of responsibilities:**

| File | What it does |
|---|---|
| `Chat.jsx` | Renders the chat page; manages conversation state; sends messages to the Worker |
| `config.js` | Holds the Worker URL so it can be updated in one place |
| `App.jsx` | Registers the `/chat` route and shows "AI Chat" in the navigation |
| `worker.js` | Secure relay; validates requests; keeps the API key secret; calls Anthropic |

---

*Last updated: March 2026 — reflects the implementation at the time of PR #2 merge.*
