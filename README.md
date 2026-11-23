# KNOWVERSE Free AI Chat — deployment pack

This project is designed for Cloudflare Workers Free + Gemini API Free Tier.
It is a separate hosted chat page linked from your WordPress.com Free site; it is NOT embedded inside WordPress.

## Files
- `src/index.js` — complete chat page and server-side Gemini API proxy.
- `wrangler.toml` — Cloudflare Worker configuration.

## Deploy (one-time account setup required)
1. Create/sign in to a Cloudflare account: https://dash.cloudflare.com/
2. Open Workers & Pages → Create → Worker, then deploy a basic Worker.
3. Open the Worker → Settings → Variables and Secrets.
4. Add a secret named `GEMINI_API_KEY`. Paste your key from Google AI Studio. Never put the key in public HTML or send it in chat.
5. Replace the Worker code with `src/index.js` and deploy.
6. Open the Worker `workers.dev` URL to test the chat.
7. Add that public URL as a button/link on the KNOWVERSE WordPress page.

## Important
- Gemini API free-tier access and rate limits depend on the selected model and can change. This is not unlimited or guaranteed forever.
- Google's free-tier pricing page says free-tier prompts/responses may be used to improve Google products. Do not send private or sensitive information.
- Cloudflare Workers Free currently lists up to 100,000 requests/day, subject to platform limits.
- This pack uses `gemini-2.5-flash`; if that model is unavailable to your Google AI Studio project, select a currently free text model and update `MODEL` in `src/index.js`.
- Keep the Gemini API key only in Cloudflare's Secret setting (`GEMINI_API_KEY`).
