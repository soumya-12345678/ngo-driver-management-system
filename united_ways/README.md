
# Auto Driver Aid

A small driver dashboard and backend for managing driver location, earnings, and stats. This README helps new users install and run the project locally (frontend + backend).

## Quick Overview

- **Frontend**: React + Vite app in `frontend/` (TypeScript, Tailwind, Leaflet maps).
- **Backend**: Node/Express app in `backend/` (APIs + Socket.io). The backend currently lists its dependencies — add your server entry file (for example `index.js`) if missing.

## Requirements

- Node.js 18+ (recommended)
- npm (comes with Node) or Yarn
- Optional: Bun (project has `bun.lockb`) — you can use Bun instead of npm if you prefer.

## Install (both services)

1. Clone the repo and open a terminal in the project root.

2. Install frontend dependencies and start the dev server:

```
cd frontend
npm install
npm run dev
```

This starts the Vite dev server. Open the URL printed by Vite (usually http://localhost:5173).

If you use Bun:

```
cd frontend
bun install
bun run dev
```

3. Install backend dependencies and start the backend:

```
cd ../backend
npm install
# If you have a server file, run it. Example (if your entry is index.js):
npx nodemon index.js   # development (auto-restarts)
# or
node index.js
```

Notes:
- The `backend` folder currently has dependencies in `package.json` and `package-lock.json`. If there is no server file yet, add your Express server file (for example `index.js`) and then run the commands above.
- Create a `.env` file in `backend/` to store secrets (MongoDB URI, JWT secret, etc.). Example:

```
PORT=4000
MONGO_URI=mongodb://localhost:27017/auto-driver-aid
JWT_SECRET=your_jwt_secret
```

## Directory layout

- `frontend/` — React + Vite application
- `backend/` — Node + Express API and Socket.io server

## Development tips

- Run the frontend dev server (`npm run dev`) while running the backend server (nodemon). The frontend expects the backend APIs to be available — check `src/lib/utils.ts` or API calls in `src/pages` for the base URL.
- If the frontend needs to talk to a local API on a different port, enable CORS in the backend (package `cors` is listed in `backend/package.json`).

## Building for production

1. Build the frontend:

```
cd frontend
npm run build
```

2. Serve the built files from a static server or integrate them into the backend as static assets.

## Troubleshooting

- If you see missing package errors, run `npm install` in the folder producing the error.
- If Leaflet map tiles or markers do not load, check the browser console for CORS or resource path issues.

## Contributing

- Open an issue or create a PR. Keep changes focused and provide a short description of what you changed.

## License

This project does not include a license file. Add a `LICENSE` file if you want to set one.

---

If you'd like, I can also:

- Add a `start`/`dev` script to the backend `package.json`.
- Create a minimal `backend/index.js` example server so the backend can be started immediately.

Tell me which option you'd prefer.
