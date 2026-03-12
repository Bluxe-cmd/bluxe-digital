# B. Luxe Digital — Cloudflare Worker Proxy

This Worker sits between your React app and the Anthropic API so your API key is never exposed in the browser.

## Deploy (5 min)

### Option A — Cloudflare Dashboard (no CLI needed)
1. Go to [workers.cloudflare.com](https://workers.cloudflare.com) → **Create Worker**
2. Delete the default code → paste the contents of `worker.js`
3. Click **Deploy**
4. Go to your Worker → **Settings → Variables → Add Secret**
   - Name: `ANTHROPIC_API_KEY`
   - Value: your key from [console.anthropic.com](https://console.anthropic.com)
5. Copy your Worker URL (e.g. `https://bluxe-proxy.yourname.workers.dev`)
6. Paste it into `bluxe-digital/src/App.jsx` as `WORKER_URL`

### Option B — Wrangler CLI
```bash
npm install -g wrangler
wrangler login
wrangler deploy worker.js --name bluxe-proxy
wrangler secret put ANTHROPIC_API_KEY
```

## Security notes
- The worker validates the model name so only permitted Claude models can be called.
- In production, change `ALLOWED_ORIGIN` in `worker.js` from `"*"` to your actual domain.
- Never commit your real API key to git — use the Cloudflare Secret instead.
