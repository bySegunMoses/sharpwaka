<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy SharpWaka

This project is a Vite + React app. The Express server is for local development only. Production hosting on Vercel should serve the built static files from `dist`.

## Run Locally

**Prerequisites:** Node.js


1. Install dependencies:
   `npm install`
2. Copy [.env.example](.env.example) to `.env.local`
3. Set `VITE_GEMINI_API_KEY` in `.env.local`
4. Run the app:
   `npm run dev`

## Deploy to Vercel

1. Import the GitHub repository into Vercel.
2. Keep the detected framework as `Vite`.
3. Set `VITE_GEMINI_API_KEY` in the Vercel project environment variables.
4. Deploy. Vercel will run `npm run build` and publish `dist`.

The included `vercel.json` ensures the correct output directory and SPA fallback routing.
