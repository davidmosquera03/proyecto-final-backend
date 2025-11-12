# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Provisional authentication (dev/testing)

This frontend includes a provisional, hardcoded authentication system for local testing.

- Test users (username/password):
	- student / student123
	- teacher / teacher123

How to run locally:

1. From the `judge-frontend` folder install dependencies (adds `react-router-dom`):

```powershell
npm install
```

2. Run dev server:

```powershell
npm run dev
```

3. Open the app at `http://localhost:5173` and use the login page.

Notes:
- The project adds `react-router-dom` for navigation (React Navigation is a React Native library — for web we use React Router).
- This auth is intentionally simple and hardcoded for development only. Do not use in production.
