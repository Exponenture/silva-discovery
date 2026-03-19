# SILVA × Discovery — Commercial Modelling Site

Confidential. Exponenture (Pty) Ltd. March 2026.

## Stack
- React 18 + React Router v6
- Vite 5
- Cloudflare Pages

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Deploy to Cloudflare Pages

### Option A — Cloudflare Pages dashboard
1. Push this repo to GitHub
2. In Cloudflare Pages → Create project → Connect to Git → select this repo
3. Build settings:
   - Framework preset: Vite
   - Build command: `npm run build`
   - Build output directory: `dist`
4. Environment variables → Add:
   - `VITE_ACCESS_CODE` → your chosen password (e.g. `discovery2026`)
5. Deploy

### Option B — Wrangler CLI
```bash
npm install -g wrangler
wrangler pages deploy dist --project-name silva-discovery
```

## Changing the access code
Set `VITE_ACCESS_CODE` in Cloudflare Pages → Settings → Environment Variables.
Redeploy after changing. The default fallback is `silva2026`.

## Structure
```
src/
  App.jsx              # Router + auth gate logic
  main.jsx             # Entry point
  components/
    PasswordGate.jsx   # Full-screen password entry
    Nav.jsx            # Top navigation bar
  pages/
    ROIModel.jsx       # SILVA ROI model (iframe embed)
    AdoptionModel.jsx  # Adoption rate model (iframe embed)
```
