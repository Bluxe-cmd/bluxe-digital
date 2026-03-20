# B. Luxe Digital

> *Faith · Clarity · Action*

B. Luxe Digital is a faith-aligned digital platform for purpose-driven women — especially women of color — offering thoughtfully designed digital planners, journals, and resources alongside an AI-powered planning assistant.

---

## What Is This?

This is the source code for [bluxedigital.com](https://bluxedigital.com) — a React web application that includes:

- **Product Marketplace** — digital planners, journals, e-books, and frameworks to help women move from scattered to strategic
- **AI Chat Assistant** — a conversational guide powered by Claude AI that provides personalized planning support
- **About Page** — the story and mission behind B. Luxe Digital
- **Home / Landing Page** — hero, welcome section, and calls to action

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, React Router 7 |
| Build tool | Vite 8 |
| Styling | Tailwind CSS 4 |
| AI backend | Anthropic Claude (via Cloudflare Worker proxy) |
| Deployment | Vercel (frontend) · Cloudflare Workers (API proxy) |

---

## Project Structure

```
bluxe-digital/
├── src/
│   ├── main.jsx              # React entry point
│   ├── App.jsx               # Router, shared Nav & Footer
│   ├── config.js             # WORKER_URL (Cloudflare Worker endpoint)
│   ├── pages/
│   │   ├── Home.jsx          # Landing page
│   │   ├── Products.jsx      # Product listings
│   │   ├── About.jsx         # About Bianca
│   │   └── Chat.jsx          # AI chat interface
│   └── components/
│       ├── ProductModal.jsx  # Product detail modal
│       ├── ProductCoverMockup.jsx
│       └── ScrollReveal.jsx  # Scroll animation wrapper
├── public/
├── index.html
├── vite.config.js
└── vercel.json               # Vercel deploy config

cloudflare-worker/
├── worker.js                 # API proxy (protects Anthropic API key)
└── README.md                 # Worker deployment instructions
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install & Run

```bash
cd bluxe-digital
npm install
npm run dev        # http://localhost:5173
```

### Build for Production

```bash
npm run build      # outputs to dist/
npm run preview    # preview the production build locally
```

### Lint

```bash
npm run lint
```

---

## Configuration

Before deploying, set your Cloudflare Worker URL in `src/config.js`:

```js
export const WORKER_URL = "https://your-worker.your-name.workers.dev"
```

See [`cloudflare-worker/README.md`](../cloudflare-worker/README.md) for step-by-step instructions on deploying the Worker and securing your Anthropic API key.

---

## Deployment

The frontend is deployed to **Vercel**. Push to the connected GitHub branch and Vercel will build and deploy automatically using the configuration in `vercel.json`.

---

## Routes

| Path | Page |
|------|------|
| `/` | Home |
| `/products` | Products |
| `/about` | About |
| `/chat` | AI Chat Assistant |

---

© B. Luxe Digital — *Faith-Fueled Planning for Purpose-Driven Women.*
