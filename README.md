# Netflix Clone PWA

This is a Next.js project with full PWA support using App Router.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Building for Production

To see the PWA in action, you should build and start the production server (Service Workers are disabled in development by default):

```bash
npm run build
npm start
```

## Verifying PWA Support

1.  **Manifest & Service Worker**:

    - Open Chrome DevTools (F12).
    - Go to the **Application** tab.
    - Check **Manifest** to see the App Name, Icons, and Theme Color.
    - Check **Service Workers** to see the registered worker.

2.  **Installability**:

    - In the address bar (Chrome/Edge), look for the "Install" icon.
    - Or click the three dots menu -> "Install Netflix Clone PWA".

3.  **Offline Mode**:
    - In DevTools -> Application -> Service Workers, check "Offline".
    - Refresh the page. It should still load (served from cache).

## Project Structure

- `app/layout.tsx`: Contains PWA metadata and viewport configuration.
- `app/page.tsx`: Home page with PWA status indicators.
- `public/manifest.json`: Web App Manifest.
- `next.config.mjs`: Next.js config with `@ducanh2912/next-pwa`.
