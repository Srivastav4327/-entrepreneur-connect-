# Entrepreneur Connect — Project README

This repository contains a Next.js 15 + TypeScript application called "Entrepreneur Connect" — an influencer discovery and collaboration platform that uses Supabase for auth and data and includes AI-powered features.

If you want to create a public link (GitHub) and share this project, follow the instructions below.

---

## What the app is

- Full-stack Next.js 15 app (React 19, React Server Components) with Turbopack developer tooling.
- Uses Supabase (auth + database) for backend services.
- Tailwind CSS + Radix UI primitives for UI, Zustand for client state, Sonner for notifications.
- Features: influencer search, AI recommendations, compare/export influencers, auth (sign-up/login), dashboard.

---

## Files added for sharing
- `.gitignore` — excludes node_modules, build artifacts, and local env files.

---

## Quick steps to create a public GitHub repository and push your code

1. If you don't already have git installed, install it: https://git-scm.com/
2. (Optional but recommended) Install GitHub CLI: https://cli.github.com/ — makes creating remote repos easy.

From PowerShell in this project root (`my-app`):

```powershell
cd "e:\Ai(PROJECTS)\Entrepreneure CONNECT\my-app"
# initialize git (if not already initialized)
git init
git add .
git commit -m "Initial commit - Entrepreneur Connect"
```

If you have GitHub CLI and are logged in (`gh auth login`):

```powershell
# create a public repo and set it as origin
gh repo create your-username/entrepreneur-connect --public --source=. --remote=origin --push

# After this command completes you'll have a GitHub URL like:
# https://github.com/your-username/entrepreneur-connect
```

If you prefer the GitHub website approach:

1. Create a new repository at https://github.com/new (select Public).
2. Copy the remote URL (e.g., `https://github.com/your-username/entrepreneur-connect.git`) and run:

```powershell
git remote add origin https://github.com/your-username/entrepreneur-connect.git
git branch -M main
git push -u origin main
```

Now you have a public URL you can share.

---

## Deploying the app publicly (Vercel)

Vercel integrates seamlessly with Next.js and can deploy by connecting your GitHub repo.

Option A — Git-based (recommended):

1. Push your repo to GitHub (see steps above).
2. Log into https://vercel.com and import the GitHub repository.
3. In the Vercel project settings, add environment variables (in `Settings > Environment Variables`):
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your anon/public key
   - `SUPABASE_SERVICE_ROLE_KEY` (if required by server code, keep it secret)
4. Set the build command to `npm run build` (or use default Next.js) and the output directory is handled automatically by Vercel.
5. Deploy — Vercel will provide a publicly accessible URL (e.g., `https://entrepreneur-connect.vercel.app`).

Option B — Vercel CLI quick deploy (from local machine):

1. Install Vercel CLI: `npm i -g vercel`
2. Log in `vercel login`
3. Run `vercel` from the project root and follow prompts. You'll be able to set environment variables during setup or in the Vercel dashboard.






