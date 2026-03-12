/**
 * B. Luxe Digital — Anthropic API Proxy
 * Cloudflare Worker
 *
 * Deploy steps:
 * 1. Go to workers.cloudflare.com → Create Worker
 * 2. Paste this entire file
 * 3. Add your Anthropic API key as a Secret (recommended) OR replace the
 *    placeholder below (less secure — never commit your real key to git)
 * 4. Click Deploy → copy the Worker URL
 * 5. In bluxe-digital/src/App.jsx, set WORKER_URL to your Worker URL
 *
 * RECOMMENDED: Use Cloudflare Secrets instead of hardcoding your key.
 *   wrangler secret put ANTHROPIC_API_KEY
 *   Then access it as: env.ANTHROPIC_API_KEY (already wired in below)
 */

const ALLOWED_ORIGIN = "*" // Restrict to your domain in production, e.g. "https://yourdomain.com"
const ANTHROPIC_VERSION = "2023-06-01"
const ANTHROPIC_API = "https://api.anthropic.com/v1/messages"

// Models we allow through this proxy (prevents misuse)
const ALLOWED_MODELS = [
  "claude-opus-4-6",
  "claude-sonnet-4-6",
  "claude-haiku-4-5-20251001",
]

function corsHeaders(origin) {
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  }
}

function jsonResponse(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders(),
      ...extraHeaders,
    },
  })
}

export default {
  async fetch(request, env) {
    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders() })
    }

    if (request.method !== "POST") {
      return jsonResponse({ error: "Method not allowed" }, 405)
    }

    // Parse and validate request body
    let body
    try {
      body = await request.json()
    } catch {
      return jsonResponse({ error: "Invalid JSON body" }, 400)
    }

    // Guard: only allow permitted models
    if (!ALLOWED_MODELS.includes(body.model)) {
      return jsonResponse(
        { error: `Model '${body.model}' is not permitted through this proxy.` },
        400
      )
    }

    // Resolve API key: prefer Cloudflare Secret (env var), fall back to placeholder
    const apiKey = env?.ANTHROPIC_API_KEY ?? "YOUR_ANTHROPIC_KEY_HERE"

    if (!apiKey || apiKey === "YOUR_ANTHROPIC_KEY_HERE") {
      return jsonResponse(
        { error: "Anthropic API key is not configured. Set the ANTHROPIC_API_KEY secret in your Cloudflare Worker." },
        500
      )
    }

    // Forward to Anthropic
    try {
      const upstream = await fetch(ANTHROPIC_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": ANTHROPIC_VERSION,
        },
        body: JSON.stringify(body),
      })

      const data = await upstream.json()
      return jsonResponse(data, upstream.status)
    } catch (err) {
      return jsonResponse({ error: "Failed to reach Anthropic API", detail: err.message }, 502)
    }
  },
}
