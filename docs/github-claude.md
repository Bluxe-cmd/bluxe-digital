# Connect GitHub to Claude

Use this guide to give Claude read-only context from the `Bluxe-cmd/bluxe-digital` repository for code review, walkthroughs, or content drafting.

## Option A — Native GitHub connection (best when your Claude account supports it)
1. Sign in to [claude.ai](https://claude.ai) (or Workbench).
2. Start a new chat and click **Attach → GitHub repository**.
3. Authorize the Claude GitHub app when prompted and select **only the repositories you need** (choose `Bluxe-cmd/bluxe-digital`). Keep the default **read-only** scope.
4. Once connected, mention the repo by name (e.g., “open `src/pages/Chat.jsx` in `bluxe-digital` and summarize the request flow”) so Claude pulls the right files.

> If the GitHub attachment option is not visible, your account may not yet have this feature. Use Option B instead.

## Option B — Manual zip upload (works in every Claude account)
1. From a clean working tree, generate a lightweight archive:
   ```bash
   git -C /home/runner/work/bluxe-digital/bluxe-digital/bluxe-digital archive --format=zip HEAD -o /tmp/bluxe-digital.zip
   ```
2. Start a new Claude chat and upload `/tmp/bluxe-digital.zip` via the paperclip.
3. Tell Claude where to start, for example:
   - “Entry points: `src/pages/Chat.jsx`, `src/hooks/useAIChat.js`, and `docs/chat-feature.md`”
   - “Config lives in `src/config.js` and the Cloudflare Worker proxy is in `/cloudflare-worker`.”
4. Re-upload a fresh zip whenever the branch changes so Claude sees the latest code.

## Safety and hygiene
- **No secrets**: make sure `.env`, API keys, and private data stay out of the archive (the command above only zips tracked files).
- Use **read-only** GitHub permissions; only enable write access when explicitly needed.
- For PR reviews, you can also upload `git diff` output alongside the zip so Claude focuses on your changes.

## Quick prompts to get value fast
- “Trace how the chat message is sent from the UI to the Cloudflare Worker. Suggest guardrails.”
- “Draft release notes for the latest changes touching `src/pages/Products.jsx`.”
- “List any unhandled errors in `src/hooks/useAIChat.js` and propose fixes.”
