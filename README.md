# Planets Front-End

A React + TypeScript front-end for the Planets full-stack application. This UI consumes the backend API and is deployed separately.

- **Backend hosting:** Railway
- **Frontend hosting:** TBD (possibly GitHub Pages)

## Tech stack

- React
- TypeScript
- Vite

## Local development

```bash
npm install
npm run dev
```

## Deployment (GitHub Pages)

This project is configured to deploy to GitHub Pages using the `gh-pages` package.

1) Ensure the `homepage` and Vite `base` match your repo name.
2) Run the deploy script to build and publish `dist/`.

```bash
npm run deploy
```
