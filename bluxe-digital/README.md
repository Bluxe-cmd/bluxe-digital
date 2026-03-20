# B. Luxe Digital

**Faith-Fueled Planning for Purpose-Driven Women.**

A React + Vite product platform featuring an AI-powered chat assistant, 3D product displays, and scroll-reveal animations.

## Tech Stack

- React 19 + Vite
- Tailwind CSS 4
- Claude AI (via Anthropic) — chat assistant
- Cloudflare Workers — secure API proxy

## Pages

| Route | Description |
|---|---|
| `/` | Home — hero, features, CTA |
| `/products` | Product catalogue with 3D covers and modal detail view |
| `/about` | Brand story |
| `/chat` | AI assistant powered by Claude |

## Quick Start

```bash
npm install
npm run dev
```

Before deploying, set your Cloudflare Worker URL in `src/config.js`:

```js
export const WORKER_URL = "https://your-worker.workers.dev"
```

See `../cloudflare-worker/README.md` for Worker deploy instructions.

## Documentation

- **[Chat Feature — Full Documentation](../docs/chat-feature.md)** — How the AI chat works, Claude integration, architecture, security, and a non-technical walkthrough
- **[Cloudflare Worker README](../cloudflare-worker/README.md)** — How to deploy and configure the API proxy
