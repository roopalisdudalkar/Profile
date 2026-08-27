# Profile (Vite + React + TypeScript)

This repository was scaffolded by an automated assistant into a Vite + React + TypeScript starter.

What I changed in branch scaffold/vite-react-ts

- Added react-router with a simple two-route setup: Home and About.
- Added a typed UserContext (React Context + hook) to hold profile data and allow in-app edits.
- Moved the single-file UI into a Home page and kept a small About page.
- Updated package.json to include react-router-dom.

How to run locally

1. git fetch origin
2. git checkout -b scaffold/vite-react-ts origin/scaffold/vite-react-ts
3. npm install
4. npm run dev

Migration plan (how to migrate existing React files into this scaffold)

1. Locate your current React/JSX/TSX source files in the repository. Common locations: src/, app/, public/ or top-level files.
2. For each component/page, copy into the new src/ structure:
   - Components -> src/components
   - Pages -> src/pages
   - Hooks -> src/hooks
   - Context -> src/context
3. Update imports in moved files to use relative paths from src/ (e.g., import Header from '../components/Header').
4. If you have an existing entry file (index.tsx / index.jsx), replace its logic with src/main.tsx above or merge provider/wrapper code into UserProvider/BrowserRouter as appropriate.
5. Run the app: npm run dev and verify Home (/) and About (/about) work.

PR draft (ready-to-open)

Title: scaffold: Vite + React + TypeScript starter — add routing and UserContext

Description:
- Adds react-router routing (Home, About).
- Adds a typed UserContext to hold profile data and demonstrate simple in-app editing.
- Scaffolds a minimal Vite + React + TypeScript starter in branch scaffold/vite-react-ts.

How to review:
- Checkout the branch above and run the app locally.
- Verify Home page shows avatar/name and the Edit profile flow works.
- Navigate to /about and ensure the About page loads.

Notes about deployment:
- Vercel detects Vite apps automatically. Use build command `npm run build` and output directory `dist`.

If you want, I can open the PR for you or make further changes (add more pages, migrate files found in the repo, or add CI).