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

## Deploying the app publicly (recommended: Vercel)

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

---

## Deploy with Docker (alternate)

You can build a Docker image and run it locally or push to a registry:

Create a `Dockerfile` (example provided below) and then:

```powershell
# build
docker build -t entrepreneur-connect:latest .

# run locally (pass env vars)
docker run -p 3000:3000 -e NEXT_PUBLIC_SUPABASE_URL="https://..." -e NEXT_PUBLIC_SUPABASE_ANON_KEY="..." entrepreneur-connect:latest

# (optional) tag and push to Docker Hub
docker tag entrepreneur-connect:latest yourdockerhub/entrepreneur-connect:latest
docker push yourdockerhub/entrepreneur-connect:latest
```

Minimal example `Dockerfile` (for production):

```Dockerfile
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --production

FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["npm","start"]
```

---

## Notes about environment variables & secrets

- Never commit `.env.local` or secret keys into the public repository. Use Vercel environment variables or GitHub Secrets for CI.
- Required env vars (examples found in repo): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (server-side only).

---

If you want, I can:

- Create the Git repo locally and run the initial commit for you (I can prepare a script or run commands if you allow me to execute them).  
- Prepare a `Dockerfile` in the repository now.  
- Provide a short, shareable one-liner that shows the deployed URL once you push to Vercel / GitHub.

Which do you want me to do next? (`create-remote` to run commands you can copy, `add-dockerfile` to add a Dockerfile file here, or `instructions-only` to stop here.)
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!


